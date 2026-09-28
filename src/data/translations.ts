import { BibleTranslation } from '../domain/bible';

export const translations: BibleTranslation[] = [
  {
    id: 'rv1909',
    name: 'Reina-Valera 1909',
    abbreviation: 'RV1909',
    language: 'es',
    license: 'Dominio público',
    source: 'https://ebible.org/details.php?id=spaRV1909',
  },
];

export const DEFAULT_TRANSLATION_ID = 'rv1909';
