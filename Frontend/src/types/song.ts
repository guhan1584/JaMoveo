export interface WordToken {
  lyrics: string;
  chords?: string;
}

export type SongLine = WordToken[];

export interface Song {
  title: string;
  author?: string;
  content: SongLine[];
  language: "en" | "he";
}
