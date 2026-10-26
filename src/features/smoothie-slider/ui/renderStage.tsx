import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SmoothieBowl } from "@/entities";
import { bowlVariants, decorVariants, wordVariants } from "../lib";
import type { IRenderStageProps } from "../model";

export const RenderStage: React.FC<IRenderStageProps> = ({
  current,
  dir,
  onAnimationEnd,
}) => {
  return (
    <div className="slider__stage">
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.h1
          key={`word-${current.id}`}
          className="slider__word"
          custom={dir}
          variants={wordVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {current.word}
        </motion.h1>
      </AnimatePresence>

      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={`bowl-${current.id}`}
          className="slider__stage-bowl"
          custom={dir}
          variants={bowlVariants}
          initial="enter"
          animate="center"
          exit="exit"
          onAnimationComplete={onAnimationEnd}
        >
          <SmoothieBowl smoothie={current} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false} custom={{ dir, i: 0 }}>
        {current.decor.map((decorItem, index) => (
          <motion.span
            key={`decor-${current.id}-${index}`}
            className={`slider__decor slider__decor-pos-${index % 3}`}
            custom={{ dir, i: index }}
            variants={decorVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {decorItem}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};
