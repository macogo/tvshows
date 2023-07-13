export interface ImageBySize {
  medium?: string;
  original?: string;
}

export interface Rating {
  average?: number | null;
}

export interface Cast {
  character: {
    name: string;
  };
  person: {
    id: number;
    image: ImageBySize;
    name: string;
  };
}

export interface PageData<T> {
  data: T[];
  nextPage?: number;
}

