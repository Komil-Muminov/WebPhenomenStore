import type { ISmoothie } from "@/entities";

export interface ISmoothieSliderProps {
  smoothies: ISmoothie[];
  onScrollToNext?: () => void;
  isActive?: boolean;
}

export interface IDecorCustom {
  dir: number;
  i: number;
}

export interface IRenderHeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onScrollToSuperfood?: () => void;
}

export interface IRenderStageProps {
  current: ISmoothie;
  dir: number;
  onAnimationEnd: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenNutrition: () => void;
  onAddToCart?: () => void;
  price?: number;
}

export interface IRenderFooterProps {
  current: ISmoothie;
  currentIndex: number;
  totalCount: number;
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
