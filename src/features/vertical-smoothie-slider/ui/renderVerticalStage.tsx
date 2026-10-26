import React, { useRef } from "react";
import { AnimatePresence, motion, type PanInfo, type TapInfo } from "framer-motion";
import { SmoothieBowl } from "@/entities";
import {
  checkVerticalSwipeDirection,
  verticalBowlVariants,
  verticalDecorVariants,
  verticalWordVariants,
} from "../lib";
import type { IVerticalStageProps } from "../model";

export const RenderVerticalStage: React.FC<IVerticalStageProps> = ({
  current,
  dir,
  onAnimationEnd,
  onPrev,
  onNext,
  onOpenNutrition,
}) => {
  const dragDistanceRef = useRef<number>(0);

  const handleDragStart = () => {
    dragDistanceRef.current = 0;
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dragDistanceRef.current = Math.abs(info.offset.x) + Math.abs(info.offset.y);
  };

  const handleDragEnd = (
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
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const distFromCenter = Math.hypot(
      info.point.x - centerX,
      info.point.y - centerY,
    );
    if (distFromCenter < 240) {
      onOpenNutrition();
    }
  };

  return (
    <motion.div
      className="vslider__stage"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.25}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onTap={handleStageTap}
    >
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.h1
          key={`vword-${current.id}`}
          className="vslider__word"
          custom={dir}
          variants={verticalWordVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {current.word}
        </motion.h1>
      </AnimatePresence>

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
