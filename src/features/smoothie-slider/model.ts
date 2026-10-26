import type { ISmoothie } from "@/entities";

export interface ISmoothieSliderProps {
  smoothies: ISmoothie[];
}

export interface IDecorCustom {
  dir: number;
  i: number;
}

export interface IRenderHeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export interface IRenderStageProps {
  current: ISmoothie;
  dir: number;
  onAnimationEnd: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenNutrition: () => void;
}

export interface IRenderFooterProps {
  current: ISmoothie;
  currentIndex: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
  onOpenNutrition: () => void;
  onAddToCart: () => void;
}

export interface IRenderNutritionModalProps {
  smoothie: ISmoothie;
  open: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}
