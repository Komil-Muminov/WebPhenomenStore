import React from "react";
import { motion } from "framer-motion";
import {
  CloseOutlined,
  FireOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { If, Tooltip } from "@/shared";
import type { IDishPopupProps } from "../model";
import "./dishPopup.css";

export const DishPopup: React.FC<IDishPopupProps> = ({
  smoothie,
  onClose,
  onOpenDetails,
  onAddToCart,
  price,
}) => {
  const nutrition = smoothie.nutrition;
  const hasNutrition = Boolean(nutrition);
  const caloriesText = nutrition?.calories ? `${nutrition.calories} ккал` : "100% Organic";
  const ingredients = nutrition?.ingredients ?? [];
  const previewIngredients = ingredients.slice(0, 4);
  const hasIngredients = previewIngredients.length > 0;

  return (
    <div className="dish-popup-layer">
      <motion.div
        className="dish-popup"
        initial={{ opacity: 0, scale: 0.88, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 14 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dish-popup__header">
          <span className="dish-popup__badge">
            <FireOutlined className="mr-1!" />
            {caloriesText}
          </span>
          <Tooltip title="Закрыть">
            <button
              type="button"
              className="dish-popup__close"
              onClick={onClose}
              aria-label="Закрыть описание"
            >
              <CloseOutlined />
            </button>
          </Tooltip>
        </div>

        <h3 className="dish-popup__title">{smoothie.title}</h3>
        <p className="dish-popup__desc">{smoothie.description}</p>

        <If condition={hasNutrition}>
          <div className="dish-popup__macros">
            <div className="dish-popup__macro">
              <span className="dish-popup__macro-label">Белки</span>
              <span className="dish-popup__macro-val text-purple-300!">
                {nutrition?.proteins} г
              </span>
            </div>
            <div className="dish-popup__macro">
              <span className="dish-popup__macro-label">Жиры</span>
              <span className="dish-popup__macro-val text-sky-300!">
                {nutrition?.fats} г
              </span>
            </div>
            <div className="dish-popup__macro">
              <span className="dish-popup__macro-label">Углеводы</span>
              <span className="dish-popup__macro-val text-emerald-300!">
                {nutrition?.carbs} г
              </span>
            </div>
          </div>

          <If condition={hasIngredients}>
            <div className="dish-popup__ingredients">
              {previewIngredients.map((item) => (
                <span key={item} className="dish-popup__tag">
                  {item}
                </span>
              ))}
            </div>
          </If>
        </If>

        <div className="dish-popup__actions">
          <If condition={Boolean(onOpenDetails)}>
            <Tooltip title="Подробный состав и КБЖУ">
              <button
                type="button"
                className="dish-popup__btn-details"
                onClick={() => {
                  onClose();
                  onOpenDetails?.();
                }}
              >
                <InfoCircleOutlined className="mr-1!" />
                КБЖУ
              </button>
            </Tooltip>
          </If>
          <If condition={Boolean(onAddToCart)}>
            <Tooltip title="Добавить в корзину">
              <button
                type="button"
                className="dish-popup__btn-cart"
                onClick={() => {
                  onAddToCart?.();
                }}
              >
                <ShoppingCartOutlined className="mr-1!" />
                Заказать
                <If condition={Boolean(price)}>
                  <span className="ml-1!">• {price} ₽</span>
                </If>
              </button>
            </Tooltip>
          </If>
        </div>
      </motion.div>
    </div>
  );
};
