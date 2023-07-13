import { ImageBySize, Rating, Cast } from "./Common";

export interface Show {
  id: number;
  url: string;
  name: string;
  image: ImageBySize | null;
  rating?: Rating;
  type: string;
  status: string;
  ended: string;
  summary: string;
  language: string;
  premiered: string;
  _embedded: {
    cast: Cast[];
  };
}

export interface SearchShowResult {
  show: Show;
}
