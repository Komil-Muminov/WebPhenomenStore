import type { ISmoothie } from "@/entities";

export interface ISmoothieMenuItem extends ISmoothie {
  calories: number;
  volume: string;
}

export const MENU_ITEMS_META: Record<string, { calories: number; volume: string }> = {
  blueberry: { calories: 240, volume: "450 мл" },
  strawberry: { calories: 210, volume: "450 мл" },
  chocolate: { calories: 320, volume: "450 мл" },
  blackberry: { calories: 220, volume: "450 мл" },
};
