import type { ISmoothie } from "@/entities";

export const filterActiveSmoothies = (smoothies: ISmoothie[]): ISmoothie[] => {
  return smoothies.filter((item) => Boolean(item.id && item.title));
};
