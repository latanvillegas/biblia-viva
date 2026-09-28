export type Verse = { bookId: string; chapter: number; verse: number; text: string };
export type TranslationAvailability = 'bundled' | 'licensed-provider-required';
export type BibleTranslation = {
  id: string;
  name: string;
  abbreviation: string;
  language: string;
  license: string;
  source?: string;
  availability?: TranslationAvailability;
  enabled?: boolean;
};

export interface BibleRepository {
  getChapter(bookId: string, chapter: number, translationId: string): Promise<Verse[]>;
  search(query: string, translationId: string): Promise<Verse[]>;
}

export const DEMO_TRANSLATION: BibleTranslation = {
  id: 'demo',
  name: 'Contenido de demostración',
  abbreviation: 'DEMO',
  language: 'es',
  license: 'No es una traducción bíblica. Solo se usa para desarrollo de interfaz.',
  availability: 'bundled',
  enabled: true,
};
