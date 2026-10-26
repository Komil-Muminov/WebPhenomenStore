import React from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { SmoothieBowl } from "@/entities";
import { bowlVariants, decorVariants, swipeConfidenceThreshold, swipePower, wordVariants } from "../lib";
import type { IRenderStageProps } from "../model";

export const RenderStage: React.FC<IRenderStageProps> = ({
  current,
  dir,
  onAnimationEnd,
  onPrev,
  onNext,
  onOpenNutrition,
}) => {
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      onNext();
    } else if (swipe > swipeConfidenceThreshold) {
      onPrev();
    }
  };

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
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          onAnimationComplete={onAnimationEnd}
          onClick={onOpenNutrition}
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
