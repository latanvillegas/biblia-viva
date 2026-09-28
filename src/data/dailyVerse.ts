import { Verse } from '../domain/bible';
import { getBook } from './books';
import { rv1909Chapters } from './rv1909.generated';

const chapterKeys = Object.keys(rv1909Chapters).sort();

function dayNumber(date: Date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.floor((today - start) / 86400000);
}

export function getDailyVerse(date = new Date()): Verse | null {
  if (!chapterKeys.length) return null;
  const seed = date.getUTCFullYear() * 367 + dayNumber(date);
  const key = chapterKeys[seed % chapterKeys.length];
  const texts = rv1909Chapters[key];
  if (!texts?.length) return null;
  const verseIndex = (seed * 31) % texts.length;
  const [bookId, chapterText] = key.split('.');
  return { bookId, chapter: Number(chapterText), verse: verseIndex + 1, text: texts[verseIndex] };
}

export function formatVerseReference(verse: Verse) {
  return `${getBook(verse.bookId)?.name ?? verse.bookId} ${verse.chapter}:${verse.verse}`;
}
