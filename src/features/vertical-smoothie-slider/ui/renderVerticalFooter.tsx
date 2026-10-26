import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { InfoCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Tooltip } from "@/shared";
import { verticalTextVariants } from "../lib";
import type { IVerticalFooterProps } from "../model";

export const RenderVerticalFooter: React.FC<IVerticalFooterProps> = ({
  current,
  currentIndex,
  totalCount,
  onSelectIndex,
  onOpenNutrition,
  onAddToCart,
}) => {
  const currentFormatted = String(currentIndex + 1).padStart(2, "0");
  const totalFormatted = String(totalCount).padStart(2, "0");

  return (
    <>
      <div className="vslider__side-pagination">
        <span className="vslider__side-counter">
          {currentFormatted} / {totalFormatted}
        </span>
        <div className="vslider__side-bars">
          {Array.from({ length: totalCount }).map((_, i) => {
            const isActive = i === currentIndex;
            const barClass = `vslider__side-bar ${
              isActive ? "vslider__side-bar-active" : ""
            }`;
            return (
              <button
                key={i}
                type="button"
                className={barClass}
                onClick={() => onSelectIndex(i)}
                aria-label={`Перейти к боулу ${i + 1}`}
              />
            );
          })}
        </div>
      </div>

      <footer className="vslider__footer">
        <div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`vtext-${current.id}`}
              variants={verticalTextVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <h2 className="vslider__footer-title">{current.title}</h2>
              <p className="vslider__footer-desc">{current.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="vslider__footer-actions">
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
      </footer>
    </>
  );
};
