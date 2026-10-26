import React from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { SmoothieBowl } from "@/entities";
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
}) => {
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

  return (
    <motion.div
      className="vslider__stage"
      onPanEnd={handlePanEnd}
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
