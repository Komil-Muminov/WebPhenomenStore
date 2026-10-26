import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo, type TapInfo } from "framer-motion";
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
  const stageRef = useRef<HTMLDivElement>(null);
  const dragDistanceRef = useRef<number>(0);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsDescriptionOpen(false);
  }, [current.id]);

  const handlePanStart = () => {
    dragDistanceRef.current = 0;
  };

  const handlePan = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dragDistanceRef.current = Math.abs(info.offset.x) + Math.abs(info.offset.y);
  };

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

  const handleStageTap = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: TapInfo,
  ) => {
    if (dragDistanceRef.current > 15) return;
    const rect = stageRef.current?.getBoundingClientRect();
    const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const distFromCenter = Math.hypot(
      info.point.x - centerX,
      info.point.y - centerY,
    );
    if (distFromCenter < 240) {
      setIsDescriptionOpen((prev) => !prev);
    } else if (isDescriptionOpen) {
      setIsDescriptionOpen(false);
    }
  };

  return (
    <motion.div
      ref={stageRef}
      className="slider__stage"
      onPanStart={handlePanStart}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      onTap={handleStageTap}
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
        >
          <SmoothieBowl smoothie={current} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <If condition={isDescriptionOpen}>
          <DishPopup
            smoothie={current}
            open={isDescriptionOpen}
            onClose={() => setIsDescriptionOpen(false)}
            onOpenDetails={onOpenNutrition}
            onAddToCart={onAddToCart}
            price={price}
          />
        </If>
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
