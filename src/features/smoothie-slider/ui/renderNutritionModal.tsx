import React from "react";
import { Modal } from "antd";
import { ShoppingCartOutlined, FireOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { If } from "@/shared";
import type { IRenderNutritionModalProps } from "../model";
import "./nutritionModal.css";

const MODAL_PRICES: Record<string, number> = {
  blueberry: 390,
  strawberry: 350,
  chocolate: 420,
  blackberry: 410,
};

export const RenderNutritionModal: React.FC<IRenderNutritionModalProps> = ({
  smoothie,
  open,
  onClose,
  onAddToCart,
}) => {
  const nutrition = smoothie.nutrition;
  const hasNutrition = Boolean(nutrition);
  const price = MODAL_PRICES[smoothie.id] ?? 350;

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      footer={null}
      width={480}
      className="modal-nutrition"
      centered
    >
      <div>
        <div className="modal-nutrition__hero">
          <div className="modal-nutrition__dish">
            <If condition={Boolean(smoothie.image)}>
              <img
                src={smoothie.image}
                alt={smoothie.title}
                className="modal-nutrition__dish-img"
              />
            </If>
          </div>
          <span className="modal-nutrition__badge">
            100% Organic • 450 мл • Свежие ягоды
          </span>
          <h2 className="modal-nutrition__title">{smoothie.title}</h2>
          <p className="modal-nutrition__desc">{smoothie.description}</p>
        </div>

        <If condition={hasNutrition}>
          <div className="modal-nutrition__calories">
            <div className="modal-nutrition__calories-label">
              <FireOutlined /> Энергетическая ценность
            </div>
            <span className="modal-nutrition__calories-value">
              {nutrition?.calories} ккал
            </span>
          </div>

          <div className="modal-nutrition__grid">
            <div className="modal-nutrition__tile">
              <div className="modal-nutrition__tile-name">Белки</div>
              <div className="modal-nutrition__tile-value text-purple-300!">
                {nutrition?.proteins} г
              </div>
            </div>
            <div className="modal-nutrition__tile">
              <div className="modal-nutrition__tile-name">Жиры</div>
              <div className="modal-nutrition__tile-value text-sky-300!">
                {nutrition?.fats} г
              </div>
            </div>
            <div className="modal-nutrition__tile">
              <div className="modal-nutrition__tile-name">Углеводы</div>
              <div className="modal-nutrition__tile-value text-emerald-300!">
                {nutrition?.carbs} г
              </div>
            </div>
          </div>

          <div>
            <div className="modal-nutrition__section-title">Ингредиенты рецепта</div>
            <div className="modal-nutrition__tags">
              {nutrition?.ingredients.map((ing) => (
                <span key={ing} className="modal-nutrition__tag">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="modal-nutrition__section-title">Польза и суперфуды</div>
            <div className="modal-nutrition__tags">
              {nutrition?.vitamins.map((vit) => (
                <span key={vit} className="modal-nutrition__tag modal-nutrition__tag-benefit">
                  <CheckCircleOutlined className="mr-1!" />
                  {vit}
                </span>
              ))}
            </div>
          </div>
        </If>

        <div className="modal-nutrition__footer">
          <button
            type="button"
            className="modal-nutrition__btn-close"
            onClick={onClose}
          >
            Закрыть
          </button>
          <button
            type="button"
            className="modal-nutrition__btn-order"
            onClick={() => {
              onAddToCart();
              onClose();
            }}
          >
            <ShoppingCartOutlined /> Добавить в заказ • {price} ₽
          </button>
        </div>
      </div>
    </Modal>
  );
};
