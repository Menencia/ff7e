export interface Chapter {
  infos: {
    title: string;
    folder: string;
  };
  parts: Part[];
}

export interface Part {
  content: string;
  music: string;
  images: string[];
  highlights: Highlight[];
}

export interface Highlight {
  word: string;
  type: string;
}

export interface ReaderState {
  url: string;
  index: number;
}
