export interface ISmoothie {
  id: string;
  word: string;
  title: string;
  description: string;
  bg: string;
  bowl: string;
  image?: string;
  toppings: string[];
  decor: string[];
}

export interface ISmoothieBowlProps {
  smoothie: ISmoothie;
}
