import type { ISmoothie } from "@/entities";

export interface IVerticalSmoothieSliderProps {
  smoothies: ISmoothie[];
  onScrollToTop?: () => void;
}

export interface IDecorCustom {
  dir: number;
  i: number;
}

export interface IVerticalHeaderProps {
  onScrollToTop?: () => void;
}

export interface IVerticalStageProps {
  current: ISmoothie;
  currentIndex: number;
  dir: number;
  onAnimationEnd: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenNutrition?: () => void;
  onAddToCart?: () => void;
  price?: number;
}

export interface IVerticalFooterProps {
  current: ISmoothie;
  currentIndex: number;
  totalCount: number;
  onSelectIndex: (index: number) => void;
  onOpenNutrition: () => void;
  onAddToCart: () => void;
}
