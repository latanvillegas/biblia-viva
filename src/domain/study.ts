export type VerseReference = { bookId: string; chapter: number; verse: number };
export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink';
export type Favorite = VerseReference & { id: string; createdAt: string };
export type Highlight = VerseReference & { id: string; color: HighlightColor; createdAt: string };
export type Note = VerseReference & { id: string; text: string; createdAt: string; updatedAt: string };

export type StudyState = {
  favorites: Favorite[];
  highlights: Highlight[];
  notes: Note[];
};

export const emptyStudyState: StudyState = { favorites: [], highlights: [], notes: [] };
