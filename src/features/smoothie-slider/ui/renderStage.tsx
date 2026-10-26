import React, { useRef } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { SmoothieBowl } from "@/entities";
import { bowlVariants, checkSwipeDirection, decorVariants, wordVariants } from "../lib";
import type { IRenderStageProps } from "../model";

export const RenderStage: React.FC<IRenderStageProps> = ({
  current,
  dir,
  onAnimationEnd,
  onPrev,
  onNext,
  onOpenNutrition,
}) => {
  const dragDistanceRef = useRef<number>(0);

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dragDistanceRef.current = Math.abs(info.offset.x) + Math.abs(info.offset.y);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeDir = checkSwipeDirection(info.offset.x, info.velocity.x);
    if (swipeDir === 1) {
      onNext();
    } else if (swipeDir === -1) {
      onPrev();
    }
  };

  const handleBowlClick = () => {
    if (dragDistanceRef.current < 10) {
      onOpenNutrition();
    }
  };

  return (
    <motion.div
      className="slider__stage"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.25}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
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
          onClick={handleBowlClick}
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
    </motion.div>
  );
};
