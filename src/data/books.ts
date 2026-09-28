export type BibleBook = {
  id: string;
  name: string;
  testament: 'Antiguo' | 'Nuevo';
  chapters: number;
};

export const bibleBooks: BibleBook[] = [
  { id: 'genesis', name: 'Génesis', testament: 'Antiguo', chapters: 50 },
  { id: 'exodo', name: 'Éxodo', testament: 'Antiguo', chapters: 40 },
  { id: 'levitico', name: 'Levítico', testament: 'Antiguo', chapters: 27 },
  { id: 'numeros', name: 'Números', testament: 'Antiguo', chapters: 36 },
  { id: 'deuteronomio', name: 'Deuteronomio', testament: 'Antiguo', chapters: 34 },
  { id: 'mateo', name: 'Mateo', testament: 'Nuevo', chapters: 28 },
  { id: 'marcos', name: 'Marcos', testament: 'Nuevo', chapters: 16 },
  { id: 'lucas', name: 'Lucas', testament: 'Nuevo', chapters: 24 },
  { id: 'juan', name: 'Juan', testament: 'Nuevo', chapters: 21 },
  { id: 'hechos', name: 'Hechos', testament: 'Nuevo', chapters: 28 },
  { id: 'romanos', name: 'Romanos', testament: 'Nuevo', chapters: 16 },
  { id: 'apocalipsis', name: 'Apocalipsis', testament: 'Nuevo', chapters: 22 },
];

export function getBook(id: string) {
  return bibleBooks.find((book) => book.id === id);
}
