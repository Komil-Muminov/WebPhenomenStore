import type { Variants } from "framer-motion";
import type { IDecorCustom } from "./model";

export const EASE = [0.76, 0, 0.24, 1] as const;
export const DURATION = 1;

export const bowlVariants: Variants = {
  enter: (dir: number) => ({ x: `${dir * 100}vw`, rotate: dir * 200 }),
  center: { x: 0, rotate: 0, transition: { duration: DURATION, ease: EASE } },
  exit: (dir: number) => ({
    x: `${-dir * 100}vw`,
    rotate: -dir * 200,
    transition: { duration: DURATION, ease: EASE },
  }),
};

export const wordVariants: Variants = {
  enter: (dir: number) => ({ x: `${dir * 60}vw`, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: DURATION, ease: EASE } },
  exit: (dir: number) => ({
    x: `${-dir * 60}vw`,
    opacity: 0,
    transition: { duration: DURATION * 0.9, ease: EASE },
  }),
};

export const textVariants: Variants = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
  exit: { y: -20, opacity: 0, transition: { duration: 0.3 } },
};

export const decorVariants: Variants = {
  enter: ({ dir }: IDecorCustom) => ({ x: `${dir * 50}vw`, y: -80, scale: 0.4, rotate: dir * 90 }),
  center: ({ i }: IDecorCustom) => ({
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { delay: 0.15 + i * 0.1, duration: DURATION, ease: EASE },
  }),
  exit: ({ dir }: IDecorCustom) => ({
    x: `${-dir * 50}vw`,
    y: 80,
    scale: 0.4,
    transition: { duration: DURATION * 0.8, ease: EASE },
  }),
};
