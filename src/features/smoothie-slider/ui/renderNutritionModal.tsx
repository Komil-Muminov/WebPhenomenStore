import React from "react";
import { Modal, Tag, Button } from "antd";
import { ShoppingCartOutlined, FireOutlined } from "@ant-design/icons";
import { If } from "@/shared";
import type { IRenderNutritionModalProps } from "../model";

export const RenderNutritionModal: React.FC<IRenderNutritionModalProps> = ({
  smoothie,
  open,
  onClose,
  onAddToCart,
}) => {
  const nutrition = smoothie.nutrition;
  const hasNutrition = Boolean(nutrition);

  return (
    <Modal
      title={smoothie.title}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Закрыть
        </Button>,
        <Button
          key="add"
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={() => {
            onAddToCart();
            onClose();
          }}
          className="rounded-full!"
        >
          Заказать смузи
        </Button>,
      ]}
      className="smoothie-modal"
    >
      <div className="py-2!">
        <If condition={Boolean(smoothie.image)}>
          <img
            src={smoothie.image}
            alt={smoothie.title}
            className="w-full! h-48! object-cover! rounded-xl! mb-4!"
          />
        </If>

        <p className="text-sm! text-neutral-300! mb-4!">{smoothie.description}</p>

        <If condition={hasNutrition}>
          <div className="bg-white/5! p-3! rounded-xl! mb-4!">
            <div className="flex! items-center! gap-2! text-amber-400! font-semibold! text-sm! mb-2!">
              <FireOutlined /> Энергетическая ценность: {nutrition?.calories} ккал
            </div>
            <div className="grid! grid-cols-3! gap-2! text-center!">
              <div className="bg-white/5! p-2! rounded-lg!">
                <div className="text-xs! text-neutral-400!">Белки</div>
                <div className="font-bold! text-white!">{nutrition?.proteins} г</div>
              </div>
              <div className="bg-white/5! p-2! rounded-lg!">
                <div className="text-xs! text-neutral-400!">Жиры</div>
                <div className="font-bold! text-white!">{nutrition?.fats} г</div>
              </div>
              <div className="bg-white/5! p-2! rounded-lg!">
                <div className="text-xs! text-neutral-400!">Углеводы</div>
                <div className="font-bold! text-white!">{nutrition?.carbs} г</div>
              </div>
            </div>
          </div>

          <div className="mb-3!">
            <div className="text-xs! font-semibold! text-neutral-400! mb-2!">Ингредиенты:</div>
            <div className="flex! flex-wrap! gap-1.5!">
              {nutrition?.ingredients.map((ing) => (
                <Tag key={ing} color="default" className="text-xs! rounded-full!">
                  {ing}
                </Tag>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs! font-semibold! text-neutral-400! mb-2!">Полезные свойства:</div>
            <div className="flex! flex-wrap! gap-1.5!">
              {nutrition?.vitamins.map((vit) => (
                <Tag key={vit} color="purple" className="text-xs! rounded-full!">
                  {vit}
                </Tag>
              ))}
            </div>
          </div>
        </If>
      </div>
    </Modal>
  );
};
