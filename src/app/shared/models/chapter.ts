export interface Book {
  book: number;
  chapters: Chapter[];
}

export interface Chapter {
  title: string;
  number: number;
  date: string;
  id: string;
  reader?: boolean;
  special?: boolean;
  featured?: boolean;
  next?: boolean;
}
