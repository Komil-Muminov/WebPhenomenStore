import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { DishPopup, SmoothieBowl } from "@/entities";
import { If } from "@/shared";
import {
  checkVerticalSwipeDirection,
  verticalBowlVariants,
  verticalDecorVariants,
} from "../lib";
import type { IVerticalStageProps } from "../model";

const PHENOMEN_LETTERS = ["Ф", "Е", "Н", "О", "М", "Е", "Н"];

export const RenderVerticalStage: React.FC<IVerticalStageProps> = ({
  current,
  currentIndex,
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
    const swipeDir = checkVerticalSwipeDirection(info.offset.y, info.velocity.y);
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
      className="vslider__stage"
      onPanEnd={handlePanEnd}
      onClick={handleStageClick}
    >
      <div className="vslider__horizon-wordmark">
        {PHENOMEN_LETTERS.map((letter, i) => {
          const isActive = i === (currentIndex % PHENOMEN_LETTERS.length);
          const letterClass = `vslider__horizon-letter ${isActive ? "vslider__horizon-letter-active" : ""}`;
          return (
            <span key={`${letter}-${i}`} className={letterClass}>
              {letter}
            </span>
          );
        })}
      </div>

      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={`vbowl-${current.id}`}
          className="vslider__stage-bowl"
          custom={dir}
          variants={verticalBowlVariants}
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
            key={`vdecor-${current.id}-${index}`}
            className={`vslider__decor vslider__decor-pos-${index % 3}`}
            custom={{ dir, i: index }}
            variants={verticalDecorVariants}
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
