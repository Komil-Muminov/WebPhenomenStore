import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo, type TapInfo } from "framer-motion";
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
    const swipeDir = checkVerticalSwipeDirection(info.offset.y, info.velocity.y);
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
      className="vslider__stage"
      onPanStart={handlePanStart}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      onTap={handleStageTap}
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
