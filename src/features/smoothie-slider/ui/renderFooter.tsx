import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownOutlined, InfoCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { If, Tooltip } from "@/shared";
import { textVariants } from "../lib";
import type { IRenderFooterProps } from "../model";

export const RenderFooter: React.FC<IRenderFooterProps> = ({
  current,
  currentIndex,
  totalCount,
  onSelectIndex,
  onOpenNutrition,
  onAddToCart,
  onScrollToNext,
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
            <button
              type="button"
              className="slider__btn-secondary"
              onClick={onOpenNutrition}
            >
              <InfoCircleOutlined />
              <span>Состав и польза</span>
            </button>
          </Tooltip>
          <Tooltip title="Добавить в корзину">
            <button
              type="button"
              className="slider__btn-primary"
              onClick={onAddToCart}
            >
              <ShoppingCartOutlined />
              <span>Заказать</span>
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="flex! flex-col! items-end! gap-3!">
        <If condition={Boolean(onScrollToNext)}>
          <button
            type="button"
            className="slider__scroll-down"
            onClick={onScrollToNext}
          >
            <span>Superfood Bowls</span>
            <ArrowDownOutlined />
          </button>
        </If>
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
      </div>
    </footer>
  );
};
