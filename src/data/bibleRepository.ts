import { Verse } from '../domain/bible';
import { getDemoChapter } from './demoBible';
import { rv1909Chapters } from './rv1909.generated';

export function getChapter(bookId: string, chapter: number): Verse[] {
  const texts = rv1909Chapters[`${bookId}.${chapter}`];
  if (!texts?.length) return getDemoChapter(bookId, chapter);
  return texts.map((text, index) => ({ bookId, chapter, verse: index + 1, text }));
}

export function searchBible(query: string, limit = 100): Verse[] {
  const q = query.trim().toLocaleLowerCase('es');
  if (!q) return [];
  const results: Verse[] = [];
  for (const [key, texts] of Object.entries(rv1909Chapters)) {
    const [bookId, chapterText] = key.split('.');
    texts.forEach((text, index) => {
      if (results.length < limit && text.toLocaleLowerCase('es').includes(q)) {
        results.push({ bookId, chapter: Number(chapterText), verse: index + 1, text });
      }
    });
    if (results.length >= limit) break;
  }
  return results;
}

export const hasFullBibleData = Object.keys(rv1909Chapters).length > 1000;
