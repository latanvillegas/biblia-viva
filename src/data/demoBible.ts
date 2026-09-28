import { Verse } from '../domain/bible';

// Contenido breve de desarrollo. No pretende sustituir una traducción bíblica licenciada.
const chapters: Record<string, string[]> = {
  'genesis.1': [
    'En el principio creó Dios los cielos y la tierra.',
    'La tierra estaba desordenada y vacía; y las tinieblas estaban sobre la faz del abismo.',
    'Y dijo Dios: Sea la luz; y fue la luz.'
  ],
  'salmos.23': [
    'El Señor es mi pastor; nada me faltará.',
    'En lugares de delicados pastos me hará descansar.',
    'Confortará mi alma y me guiará por sendas de justicia.'
  ],
  'juan.1': [
    'En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.',
    'Este era en el principio con Dios.',
    'Todas las cosas por él fueron hechas.'
  ]
};

export function getDemoChapter(bookId: string, chapter: number): Verse[] {
  return (chapters[`${bookId}.${chapter}`] ?? [
    'Contenido bíblico pendiente de integrar para este capítulo.',
    'La interfaz y las herramientas de estudio ya están disponibles.',
    'Seleccionaremos una fuente de dominio público o con licencia antes de publicar el texto completo.'
  ]).map((text, index) => ({ bookId, chapter, verse: index + 1, text }));
}

export function searchDemoBible(query: string): Verse[] {
  const q = query.trim().toLocaleLowerCase('es');
  if (!q) return [];
  return Object.entries(chapters).flatMap(([key, texts]) => {
    const [bookId, chapter] = key.split('.');
    return texts.map((text, index) => ({ bookId, chapter: Number(chapter), verse: index + 1, text }));
  }).filter(v => v.text.toLocaleLowerCase('es').includes(q));
}
