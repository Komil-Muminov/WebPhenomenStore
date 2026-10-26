import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LeftOutlined, RightOutlined, InfoCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Tooltip } from "@/shared";
import { textVariants } from "../lib";
import type { IRenderFooterProps } from "../model";

export const RenderFooter: React.FC<IRenderFooterProps> = ({
  current,
  currentIndex,
  totalCount,
  onPrev,
  onNext,
  onSelectIndex,
  onOpenNutrition,
  onAddToCart,
}) => {
  const currentFormatted = String(currentIndex + 1).padStart(2, "0");
  const totalFormatted = String(totalCount).padStart(2, "0");

  return (
    <footer className="slider__footer">
      <div>
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

        <div className="slider__footer-actions">
          <Tooltip title="Посмотреть состав и КБЖУ">
            <Button
              icon={<InfoCircleOutlined />}
              onClick={onOpenNutrition}
              className="rounded-full! border-white/30! text-white! hover:border-white!"
            >
              Состав и польза
            </Button>
          </Tooltip>
          <Tooltip title="Добавить в корзину">
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={onAddToCart}
              className="rounded-full!"
            >
              Заказать
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="flex! flex-col! items-end! gap-4!">
        <div className="slider__pagination">
          <span className="slider__pagination-counter">
            {currentFormatted} / {totalFormatted}
          </span>
          <div className="slider__pagination-bars">
            {Array.from({ length: totalCount }).map((_, i) => {
              const isActive = i === currentIndex;
              const barClass = `slider__pagination-bar ${
                isActive ? "slider__pagination-bar-active" : ""
              }`;
              return (
                <button
                  key={i}
                  type="button"
                  className={barClass}
                  onClick={() => onSelectIndex(i)}
                  aria-label={`Перейти к слайду ${i + 1}`}
                />
              );
            })}
          </div>
        </div>

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
      </div>
    </footer>
  );
};
