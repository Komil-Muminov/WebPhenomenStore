import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Tooltip } from "@/shared";
import { textVariants } from "../lib";
import type { IRenderFooterProps } from "../model";

export const RenderFooter: React.FC<IRenderFooterProps> = ({
  current,
  onPrev,
  onNext,
}) => {
  return (
    <footer className="slider__footer">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`text-${current.id}`}
          variants={textVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <h2 className="slider__footer-title">{current.title}</h2>
          <p className="slider__footer-desc">{current.description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="slider__controls">
        <Tooltip title="Предыдущий смузи">
          <button
            type="button"
            className="slider__controls-btn"
            onClick={onPrev}
            aria-label="Предыдущий смузи"
          >
            <LeftOutlined />
          </button>
        </Tooltip>
        <Tooltip title="Следующий смузи">
          <button
            type="button"
            className="slider__controls-btn"
            onClick={onNext}
            aria-label="Следующий смузи"
          >
            <RightOutlined />
          </button>
        </Tooltip>
      </div>
    </footer>
  );
};
