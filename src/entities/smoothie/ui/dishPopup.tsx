import React from "react";
import { motion } from "framer-motion";
import {
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
    <motion.aside
      className="dish-text-panel"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="dish-text__badge-row">
        <span className="dish-text__badge">
          <FireOutlined className="mr-1.5!" />
          {caloriesText}
        </span>
        <If condition={Boolean(price)}>
          <span className="dish-text__price">{price} ₽</span>
        </If>
      </div>

      <div className="dish-text__body">
        <h2 className="dish-text__title">{smoothie.title}</h2>
        <p className="dish-text__desc">{smoothie.description}</p>
      </div>

      <If condition={hasNutrition}>
        <div className="dish-text__macros">
          <div className="dish-text__macro">
            <span className="dish-text__macro-label">Белки</span>
            <span className="dish-text__macro-val text-purple-300!">
              {nutrition?.proteins}г
            </span>
          </div>
          <div className="dish-text__macro">
            <span className="dish-text__macro-label">Жиры</span>
            <span className="dish-text__macro-val text-sky-300!">
              {nutrition?.fats}г
            </span>
          </div>
          <div className="dish-text__macro">
            <span className="dish-text__macro-label">Углеводы</span>
            <span className="dish-text__macro-val text-emerald-300!">
              {nutrition?.carbs}г
            </span>
          </div>
        </div>
      </If>

      <If condition={hasIngredients}>
        <div className="dish-text__ingredients">
          {previewIngredients.map((item) => (
            <span key={item} className="dish-text__tag">
              {item}
            </span>
          ))}
        </div>
      </If>

      <div className="dish-text__actions">
        <If condition={Boolean(onAddToCart)}>
          <Tooltip title="Добавить в корзину">
            <button
              type="button"
              className="dish-text__btn-cart"
              onClick={() => onAddToCart?.()}
            >
              <ShoppingCartOutlined className="mr-1.5!" />
              Заказать
            </button>
          </Tooltip>
        </If>

        <If condition={Boolean(onOpenDetails)}>
          <Tooltip title="Полный состав и витамины">
            <button
              type="button"
              className="dish-text__btn-details"
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
      </div>
    </motion.aside>
  );
};
