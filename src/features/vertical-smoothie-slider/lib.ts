import type { Variants } from "framer-motion";
import type { IDecorCustom } from "./model";

export const EASE = [0.76, 0, 0.24, 1] as const;
export const DURATION = 1;

export const checkVerticalSwipeDirection = (offsetY: number, velocityY: number): number => {
  const isSwipe = Math.abs(offsetY) > 35 || Math.abs(velocityY) > 200;
  if (!isSwipe) return 0;
  return offsetY < 0 || velocityY < -200 ? 1 : -1;
};

export const verticalBowlVariants: Variants = {
  enter: (dir: number) => ({ y: `${dir * 100}vh`, rotate: dir * 180, scale: 0.85 }),
  center: { y: 0, rotate: 0, scale: 1, transition: { duration: DURATION, ease: EASE } },
  exit: (dir: number) => ({
    y: `${-dir * 100}vh`,
    rotate: -dir * 180,
    scale: 0.85,
    transition: { duration: DURATION, ease: EASE },
  }),
};

export const verticalWordVariants: Variants = {
  enter: (dir: number) => ({ y: `${dir * 60}vh`, opacity: 0 }),
  center: { y: 0, opacity: 1, transition: { duration: DURATION, ease: EASE } },
  exit: (dir: number) => ({
    y: `${-dir * 60}vh`,
    opacity: 0,
    transition: { duration: DURATION * 0.9, ease: EASE },
  }),
};

export const verticalBgLetterVariants: Variants = {
  enter: (dir: number) => ({ y: `${dir * 45}vh`, opacity: 0, scale: 0.9 }),
  center: { y: 0, opacity: 1, scale: 1, transition: { duration: DURATION, ease: EASE } },
  exit: (dir: number) => ({
    y: `${-dir * 45}vh`,
    opacity: 0,
    scale: 1.08,
    transition: { duration: DURATION * 0.8, ease: EASE },
  }),
};

export const verticalTextVariants: Variants = {
  enter: { x: -20, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { delay: 0.4, duration: 0.5 } },
  exit: { x: 20, opacity: 0, transition: { duration: 0.3 } },
};

export const verticalDecorVariants: Variants = {
  enter: ({ dir }: IDecorCustom) => ({ y: `${dir * 50}vh`, x: -40, scale: 0.4, rotate: dir * 90 }),
  center: ({ i }: IDecorCustom) => ({
    y: 0,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: { delay: 0.15 + i * 0.1, duration: DURATION, ease: EASE },
  }),
  exit: ({ dir }: IDecorCustom) => ({
    y: `${-dir * 50}vh`,
    x: 40,
    scale: 0.4,
    transition: { duration: DURATION * 0.8, ease: EASE },
  }),
};
