#!/usr/bin/env python3
import json, re, urllib.request, zipfile
from pathlib import Path

URL='https://ebible.org/Scriptures/spaRV1909_vpl.zip'
OUT=Path('src/data/rv1909.generated.ts')
BOOKS=['genesis','exodo','levitico','numeros','deuteronomio','josue','jueces','rut','1-samuel','2-samuel','1-reyes','2-reyes','1-cronicas','2-cronicas','esdras','nehemias','ester','job','salmos','proverbios','eclesiastes','cantares','isaias','jeremias','lamentaciones','ezequiel','daniel','oseas','joel','amos','abdias','jonas','miqueas','nahum','habacuc','sofonias','hageo','zacarias','malaquias','mateo','marcos','lucas','juan','hechos','romanos','1-corintios','2-corintios','galatas','efesios','filipenses','colosenses','1-tesalonicenses','2-tesalonicenses','1-timoteo','2-timoteo','tito','filemon','hebreos','santiago','1-pedro','2-pedro','1-juan','2-juan','3-juan','judas','apocalipsis']
# eBible RV1909 uses several legacy/non-USFM abbreviations. Keep both variants.
CODE_MAP={
'GEN':'genesis','EXO':'exodo','LEV':'levitico','NUM':'numeros','DEU':'deuteronomio','JOS':'josue','JDG':'jueces','RUT':'rut','1SA':'1-samuel','2SA':'2-samuel','1KI':'1-reyes','2KI':'2-reyes','1CH':'1-cronicas','2CH':'2-cronicas','EZR':'esdras','NEH':'nehemias','EST':'ester','JOB':'job','PSA':'salmos','PRO':'proverbios','ECC':'eclesiastes','SNG':'cantares','SOL':'cantares','ISA':'isaias','JER':'jeremias','LAM':'lamentaciones','EZK':'ezequiel','EZE':'ezequiel','DAN':'daniel','HOS':'oseas','JOL':'joel','JOE':'joel','AMO':'amos','OBA':'abdias','JON':'jonas','MIC':'miqueas','NAM':'nahum','NAH':'nahum','HAB':'habacuc','ZEP':'sofonias','HAG':'hageo','ZEC':'zacarias','MAL':'malaquias','MAT':'mateo','MRK':'marcos','MAR':'marcos','LUK':'lucas','JHN':'juan','JOH':'juan','ACT':'hechos','ROM':'romanos','1CO':'1-corintios','2CO':'2-corintios','GAL':'galatas','EPH':'efesios','PHP':'filipenses','PHI':'filipenses','COL':'colosenses','1TH':'1-tesalonicenses','2TH':'2-tesalonicenses','1TI':'1-timoteo','2TI':'2-timoteo','TIT':'tito','PHM':'filemon','HEB':'hebreos','JAS':'santiago','JAM':'santiago','1PE':'1-pedro','2PE':'2-pedro','1JN':'1-juan','1JO':'1-juan','2JN':'2-juan','2JO':'2-juan','3JN':'3-juan','3JO':'3-juan','JUD':'judas','REV':'apocalipsis'}
NUMBER_MAP={str(i+1):book for i,book in enumerate(BOOKS)}

def decode(data):
    for enc in ('utf-8-sig','utf-8','cp1252','latin-1'):
        try:return data.decode(enc)
        except UnicodeDecodeError:pass
    raise RuntimeError('No se pudo decodificar el archivo VPL')

def normalize_code(value):
    value=value.strip().upper().replace(' ','')
    return CODE_MAP.get(value) or NUMBER_MAP.get(value)

def parse_line(line):
    raw=line.strip().lstrip('\ufeff')
    if not raw:return None
    m=re.match(r'^([1-3]?[A-Za-z]{2,}|\d{1,2})\s+(\d+):(\d+)(?:[-–]\d+)?[\t ]+(.+)$',raw)
    if not m:return None
    book=normalize_code(m.group(1))
    if not book:return None
    return book,int(m.group(2)),int(m.group(3)),re.sub(r'\s+',' ',m.group(4)).strip()

def main():
    zip_path=Path('/tmp/spaRV1909_vpl.zip')
    print('Descargando RV1909 desde eBible.org…')
    req=urllib.request.Request(URL,headers={'User-Agent':'BibliaViva/0.1 (+https://github.com/latanvillegas/biblia-viva)','Accept':'application/zip,*/*'})
    with urllib.request.urlopen(req,timeout=60) as response:zip_path.write_bytes(response.read())
    chapters={};seen=set();unknown=set()
    with zipfile.ZipFile(zip_path) as z:
        name='spaRV1909_vpl.txt'
        if name not in z.namelist():raise RuntimeError('El ZIP de eBible no contiene spaRV1909_vpl.txt')
        text=decode(z.read(name))
        for line in text.splitlines():
            raw=line.strip()
            if not raw:continue
            item=parse_line(raw)
            if not item:
                m=re.match(r'^([1-3]?[A-Za-z]{2,})\s+\d+:\d+',raw)
                if m and not normalize_code(m.group(1)):unknown.add(m.group(1).upper())
                continue
            book,chapter,verse,verse_text=item
            key_id=(book,chapter,verse)
            if key_id in seen:continue
            seen.add(key_id);key=f'{book}.{chapter}';arr=chapters.setdefault(key,[])
            while len(arr)<verse:arr.append('')
            arr[verse-1]=verse_text
    parsed=len(seen);present_books={k.split('.')[0] for k in chapters};missing=[b for b in BOOKS if b not in present_books]
    print(f'Detectados: {parsed} versículos, {len(chapters)} capítulos, {len(present_books)} libros')
    if unknown:print('Códigos desconocidos:', ', '.join(sorted(unknown)))
    if missing:print('Libros faltantes:', ', '.join(missing))
    if len(present_books)!=66 or len(chapters)!=1189 or parsed<30000 or unknown:
        raise RuntimeError(f'Importación incompleta: {parsed} versículos, {len(chapters)} capítulos, {len(present_books)} libros')
    payload=json.dumps(chapters,ensure_ascii=False,separators=(',',':'))
    OUT.write_text('// Generado desde eBible.org · RV1909 · Dominio público\nexport const rv1909Chapters: Record<string, string[]> = '+payload+';\n',encoding='utf-8')
    print(f'OK: {parsed} versículos en {len(chapters)} capítulos y {len(present_books)} libros')

if __name__=='__main__':main()
