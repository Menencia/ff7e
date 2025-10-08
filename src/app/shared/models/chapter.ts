export interface Book {
  book: number;
  chapters: Chapter[];
}

export interface Chapter {
  title: string;
  number: number;
  date: string;
  id: string;
  special?: boolean;
  featured?: boolean;
  next?: boolean;
}
