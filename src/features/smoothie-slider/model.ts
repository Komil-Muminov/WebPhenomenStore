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
}

export interface IRenderFooterProps {
  current: ISmoothie;
  onPrev: () => void;
  onNext: () => void;
}
