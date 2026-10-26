import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { DishPopup, SmoothieBowl } from "@/entities";
import { If } from "@/shared";
import { bowlVariants, checkSwipeDirection, decorVariants, wordVariants } from "../lib";
import type { IRenderStageProps } from "../model";

export const RenderStage: React.FC<IRenderStageProps> = ({
  current,
  dir,
  onAnimationEnd,
  onPrev,
  onNext,
  onOpenNutrition,
  onAddToCart,
  price,
}) => {
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsDescriptionOpen(false);
  }, [current.id]);

  const handlePanEnd = (
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

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleBowlClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pointerStartRef.current) {
      const moved = Math.hypot(
        e.clientX - pointerStartRef.current.x,
        e.clientY - pointerStartRef.current.y,
      );
      if (moved > 12) return;
    }
    setIsDescriptionOpen((prev) => !prev);
  };

  const handleStageClick = () => {
    if (isDescriptionOpen) {
      setIsDescriptionOpen(false);
    }
  };

  return (
    <motion.div
      className="slider__stage"
      onPanEnd={handlePanEnd}
      onClick={handleStageClick}
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
          onPointerDown={handlePointerDown}
          onClick={handleBowlClick}
        >
          <SmoothieBowl
            smoothie={current}
            onPointerDown={handlePointerDown}
            onClick={handleBowlClick}
            isActive={isDescriptionOpen}
          />
        </motion.div>
      </AnimatePresence>

      <If condition={isDescriptionOpen}>
        <DishPopup
          smoothie={current}
          onClose={() => setIsDescriptionOpen(false)}
          onOpenDetails={onOpenNutrition}
          onAddToCart={onAddToCart}
          price={price}
        />
      </If>

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
