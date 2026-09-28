import { BibleTranslation } from '../domain/bible';

export const translations: BibleTranslation[] = [
  {
    id: 'rv1909',
    name: 'Reina-Valera 1909',
    abbreviation: 'RV1909',
    language: 'es',
    license: 'Dominio público',
    source: 'https://ebible.org/details.php?id=spaRV1909',
    availability: 'bundled',
    enabled: true,
  },
  {
    id: 'rvr1960',
    name: 'Reina-Valera 1960',
    abbreviation: 'RVR1960',
    language: 'es',
    license: 'Traducción protegida por derechos de autor. Requiere licencia y proveedor autorizado antes de distribuir el texto.',
    availability: 'licensed-provider-required',
    enabled: false,
  },
];

export const DEFAULT_TRANSLATION_ID = 'rv1909';

export function getTranslation(id: string) {
  return translations.find((translation) => translation.id === id);
}

export function getEnabledTranslations() {
  return translations.filter((translation) => translation.enabled);
}
