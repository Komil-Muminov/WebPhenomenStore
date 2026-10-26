export interface INutritionInfo {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  vitamins: string[];
  ingredients: string[];
}

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
  bgLetter?: string;
  nutrition?: INutritionInfo;
}

export interface ISmoothieBowlProps {
  smoothie: ISmoothie;
}

export interface IDishPopupProps {
  smoothie: ISmoothie;
  open: boolean;
  onClose: () => void;
  onOpenDetails?: () => void;
  onAddToCart?: () => void;
  price?: number;
}
