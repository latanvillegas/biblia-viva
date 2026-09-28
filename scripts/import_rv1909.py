#!/usr/bin/env python3
import json, re, sys, urllib.request, zipfile
from pathlib import Path

URL='https://ebible.org/Scriptures/spaRV1909_vpl.zip'
OUT=Path('src/data/rv1909.generated.ts')
BOOKS=['genesis','exodo','levitico','numeros','deuteronomio','josue','jueces','rut','1-samuel','2-samuel','1-reyes','2-reyes','1-cronicas','2-cronicas','esdras','nehemias','ester','job','salmos','proverbios','eclesiastes','cantares','isaias','jeremias','lamentaciones','ezequiel','daniel','oseas','joel','amos','abdias','jonas','miqueas','nahum','habacuc','sofonias','hageo','zacarias','malaquias','mateo','marcos','lucas','juan','hechos','romanos','1-corintios','2-corintios','galatas','efesios','filipenses','colosenses','1-tesalonicenses','2-tesalonicenses','1-timoteo','2-timoteo','tito','filemon','hebreos','santiago','1-pedro','2-pedro','1-juan','2-juan','3-juan','judas','apocalipsis']
CODES=['GEN','EXO','LEV','NUM','DEU','JOS','JDG','RUT','1SA','2SA','1KI','2KI','1CH','2CH','EZR','NEH','EST','JOB','PSA','PRO','ECC','SNG','ISA','JER','LAM','EZK','DAN','HOS','JOL','AMO','OBA','JON','MIC','NAM','HAB','ZEP','HAG','ZEC','MAL','MAT','MRK','LUK','JHN','ACT','ROM','1CO','2CO','GAL','EPH','PHP','COL','1TH','2TH','1TI','2TI','TIT','PHM','HEB','JAS','1PE','2PE','1JN','2JN','3JN','JUD','REV']
CODE_MAP=dict(zip(CODES,BOOKS))

def decode(data):
    for enc in ('utf-8-sig','utf-8','cp1252','latin-1'):
        try:return data.decode(enc)
        except UnicodeDecodeError:pass
    raise RuntimeError('No se pudo decodificar el archivo VPL')

def parse_line(line):
    line=line.strip()
    patterns=[
      r'^([1-3]?[A-Za-z]{2,})\s+(\d+):(\d+)\s+(.+)$',
      r'^([1-3]?[A-Za-z]{2,})\s+(\d+)\s+(\d+)\s+(.+)$',
    ]
    for pattern in patterns:
        m=re.match(pattern,line)
        if m:
            code=m.group(1).upper(); book=CODE_MAP.get(code)
            if book:return book,int(m.group(2)),int(m.group(3)),m.group(4).strip()
    return None

def main():
    zip_path=Path('/tmp/spaRV1909_vpl.zip')
    print('Descargando RV1909 desde eBible.org…')
    urllib.request.urlretrieve(URL,zip_path)
    chapters={}
    parsed=0
    with zipfile.ZipFile(zip_path) as z:
        candidates=[n for n in z.namelist() if n.lower().endswith(('.txt','.vpl'))]
        if not candidates: candidates=z.namelist()
        for name in candidates:
            if name.endswith('/'): continue
            try:text=decode(z.read(name))
            except Exception:continue
            for line in text.splitlines():
                item=parse_line(line)
                if not item:continue
                book,chapter,verse,verse_text=item
                key=f'{book}.{chapter}'
                arr=chapters.setdefault(key,[])
                while len(arr)<verse:arr.append('')
                arr[verse-1]=verse_text
                parsed+=1
    chapters={k:v for k,v in chapters.items() if any(v)}
    if parsed<30000 or len(chapters)<1100:
        raise RuntimeError(f'Importación incompleta: {parsed} versículos, {len(chapters)} capítulos')
    payload=json.dumps(chapters,ensure_ascii=False,separators=(',',':'))
    OUT.write_text('// Generado desde eBible.org · RV1909 · Dominio público\nexport const rv1909Chapters: Record<string, string[]> = '+payload+';\n',encoding='utf-8')
    print(f'OK: {parsed} versículos en {len(chapters)} capítulos')

if __name__=='__main__':
    main()
