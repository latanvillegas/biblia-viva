#!/usr/bin/env python3
import csv, io, json, re, urllib.request, zipfile
from pathlib import Path

URL='https://ebible.org/Scriptures/spaRV1909_vpl.zip'
OUT=Path('src/data/rv1909.generated.ts')
BOOKS=['genesis','exodo','levitico','numeros','deuteronomio','josue','jueces','rut','1-samuel','2-samuel','1-reyes','2-reyes','1-cronicas','2-cronicas','esdras','nehemias','ester','job','salmos','proverbios','eclesiastes','cantares','isaias','jeremias','lamentaciones','ezequiel','daniel','oseas','joel','amos','abdias','jonas','miqueas','nahum','habacuc','sofonias','hageo','zacarias','malaquias','mateo','marcos','lucas','juan','hechos','romanos','1-corintios','2-corintios','galatas','efesios','filipenses','colosenses','1-tesalonicenses','2-tesalonicenses','1-timoteo','2-timoteo','tito','filemon','hebreos','santiago','1-pedro','2-pedro','1-juan','2-juan','3-juan','judas','apocalipsis']
CODES=['GEN','EXO','LEV','NUM','DEU','JOS','JDG','RUT','1SA','2SA','1KI','2KI','1CH','2CH','EZR','NEH','EST','JOB','PSA','PRO','ECC','SNG','ISA','JER','LAM','EZK','DAN','HOS','JOL','AMO','OBA','JON','MIC','NAM','HAB','ZEP','HAG','ZEC','MAL','MAT','MRK','LUK','JHN','ACT','ROM','1CO','2CO','GAL','EPH','PHP','COL','1TH','2TH','1TI','2TI','TIT','PHM','HEB','JAS','1PE','2PE','1JN','2JN','3JN','JUD','REV']
CODE_MAP=dict(zip(CODES,BOOKS))
# BibleWorks/eBible VPL commonly uses numeric book ids (1..66) rather than USFM codes.
NUMBER_MAP={str(i+1):book for i,book in enumerate(BOOKS)}


def decode(data):
    for enc in ('utf-8-sig','utf-8','cp1252','latin-1'):
        try:return data.decode(enc)
        except UnicodeDecodeError:pass
    raise RuntimeError('No se pudo decodificar el archivo VPL')


def normalize_code(value):
    value=value.strip().upper().replace(' ','')
    return CODE_MAP.get(value) or NUMBER_MAP.get(value)


def parse_reference(ref):
    ref=ref.strip().replace('.',':')
    m=re.match(r'^([1-3]?[A-Za-z]{2,}|\d{1,2})\s+(\d+):(\d+)(?:[-–]\d+)?$',ref)
    if not m:return None
    book=normalize_code(m.group(1))
    if not book:return None
    return book,int(m.group(2)),int(m.group(3))


def parse_line(line):
    raw=line.strip().lstrip('\ufeff')
    if not raw:return None
    # Standard VPL: GEN 1:1 text / 1 1:1 text
    m=re.match(r'^([1-3]?[A-Za-z]{2,}|\d{1,2})\s+(\d+):(\d+)(?:[-–]\d+)?[\t ]+(.+)$',raw)
    if m:
        book=normalize_code(m.group(1))
        if book:return book,int(m.group(2)),int(m.group(3)),m.group(4).strip()
    # Alternate four-column form: GEN 1 1 text
    m=re.match(r'^([1-3]?[A-Za-z]{2,}|\d{1,2})[\t ]+(\d+)[\t ]+(\d+)[\t ]+(.+)$',raw)
    if m:
        book=normalize_code(m.group(1))
        if book:return book,int(m.group(2)),int(m.group(3)),m.group(4).strip()
    # BibleWorks exports may put the whole reference in the first tab-delimited column.
    parts=raw.split('\t',1)
    if len(parts)==2:
        ref=parse_reference(parts[0])
        if ref:return (*ref,parts[1].strip())
    return None


def parse_sql_or_csv(text):
    """Extract rows from the companion CSV/SQL when present in the eBible VPL archive."""
    results=[]
    for line in text.splitlines():
        item=parse_line(line)
        if item:results.append(item);continue
        # SQL tuples such as ('GEN',1,1,'text') or (1,1,1,'text').
        m=re.search(r"\(\s*['\"]?([1-3]?[A-Za-z]{2,}|\d{1,2})['\"]?\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*['\"](.*?)['\"]\s*\)",line)
        if m:
            book=normalize_code(m.group(1))
            if book:results.append((book,int(m.group(2)),int(m.group(3)),m.group(4).replace("''", "'").strip()))
    return results


def main():
    zip_path=Path('/tmp/spaRV1909_vpl.zip')
    print('Descargando RV1909 desde eBible.org…')
    req=urllib.request.Request(URL,headers={'User-Agent':'BibliaViva/0.1 (+https://github.com/latanvillegas/biblia-viva)','Accept':'application/zip,*/*'})
    with urllib.request.urlopen(req,timeout=60) as response:zip_path.write_bytes(response.read())
    chapters={};seen=set();unparsed=[]
    with zipfile.ZipFile(zip_path) as z:
        names=[n for n in z.namelist() if not n.endswith('/')]
        print('Archivos:', ', '.join(names))
        candidates=[n for n in names if n.lower().endswith(('.txt','.vpl','.csv','.sql'))]
        for name in candidates:
            try:text=decode(z.read(name))
            except Exception:continue
            items=parse_sql_or_csv(text)
            if not items:
                continue
            for book,chapter,verse,verse_text in items:
                if not verse_text:continue
                key_id=(book,chapter,verse)
                if key_id in seen:continue
                seen.add(key_id);key=f'{book}.{chapter}';arr=chapters.setdefault(key,[])
                while len(arr)<verse:arr.append('')
                arr[verse-1]=verse_text
    chapters={k:v for k,v in chapters.items() if any(v)}
    parsed=len(seen)
    present_books={k.split('.')[0] for k in chapters}
    missing_books=[b for b in BOOKS if b not in present_books]
    print(f'Detectados: {parsed} versículos, {len(chapters)} capítulos, {len(present_books)} libros')
    if missing_books:print('Libros faltantes:', ', '.join(missing_books))
    # Protestant canon has 66 books / 1189 chapters. Verse totals can differ by versification,
    # so completeness is validated primarily by book/chapter coverage plus a conservative verse floor.
    if len(present_books)!=66 or len(chapters)<1189 or parsed<30000:
        raise RuntimeError(f'Importación incompleta: {parsed} versículos, {len(chapters)} capítulos, {len(present_books)} libros')
    payload=json.dumps(chapters,ensure_ascii=False,separators=(',',':'))
    OUT.write_text('// Generado desde eBible.org · RV1909 · Dominio público\nexport const rv1909Chapters: Record<string, string[]> = '+payload+';\n',encoding='utf-8')
    print(f'OK: {parsed} versículos en {len(chapters)} capítulos y {len(present_books)} libros')

if __name__=='__main__':main()
