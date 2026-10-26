import React from "react";
import { Modal, Tag, Button } from "antd";
import { ShoppingCartOutlined, FireOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { If } from "@/shared";
import type { IRenderNutritionModalProps } from "../model";

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
      width={520}
      className="smoothie-modal"
    >
      <div className="pt-2!">
        <div className="flex! items-center! gap-5! mb-5!">
          <If condition={Boolean(smoothie.image)}>
            <img
              src={smoothie.image}
              alt={smoothie.title}
              className="w-24! h-24! rounded-full! object-cover! border-2! border-white/20! shadow-2xl! shrink-0!"
            />
          </If>
          <div>
            <div className="inline-block! text-xs! font-bold! tracking-wider! uppercase! text-purple-400! bg-purple-950/60! px-2.5! py-1! rounded-full! mb-1.5!">
              100% Organic • 450 мл
            </div>
            <h2 className="text-2xl! font-black! text-white! m-0! tracking-tight!">
              {smoothie.title}
            </h2>
            <p className="text-xs! text-neutral-300! mt-1! mb-0! leading-relaxed!">
              {smoothie.description}
            </p>
          </div>
        </div>

        <If condition={hasNutrition}>
          <div className="bg-white/5! border! border-white/10! p-4! rounded-2xl! mb-4!">
            <div className="flex! items-center! justify-between! mb-3!">
              <div className="flex! items-center! gap-2! text-amber-400! font-bold! text-sm!">
                <FireOutlined /> Энергетическая ценность
              </div>
              <span className="text-sm! font-extrabold! text-white! bg-amber-500/20! text-amber-300! px-3! py-0.5! rounded-full!">
                {nutrition?.calories} ккал
              </span>
            </div>

            <div className="grid! grid-cols-3! gap-2.5!">
              <div className="bg-black/30! border! border-white/5! p-3! rounded-xl! text-center!">
                <div className="text-[11px]! text-neutral-400! uppercase! tracking-wider! mb-0.5!">Белки</div>
                <div className="text-base! font-black! text-purple-300!">{nutrition?.proteins} г</div>
              </div>
              <div className="bg-black/30! border! border-white/5! p-3! rounded-xl! text-center!">
                <div className="text-[11px]! text-neutral-400! uppercase! tracking-wider! mb-0.5!">Жиры</div>
                <div className="text-base! font-black! text-sky-300!">{nutrition?.fats} г</div>
              </div>
              <div className="bg-black/30! border! border-white/5! p-3! rounded-xl! text-center!">
                <div className="text-[11px]! text-neutral-400! uppercase! tracking-wider! mb-0.5!">Углеводы</div>
                <div className="text-base! font-black! text-emerald-300!">{nutrition?.carbs} г</div>
              </div>
            </div>
          </div>

          <div className="mb-4!">
            <div className="text-xs! font-bold! uppercase! tracking-wider! text-neutral-400! mb-2!">
              Ингредиенты рецепта
            </div>
            <div className="flex! flex-wrap! gap-1.5!">
              {nutrition?.ingredients.map((ing) => (
                <Tag
                  key={ing}
                  className="bg-white/8! border-white/10! text-neutral-200! px-3! py-1! rounded-full! text-xs! m-0!"
                >
                  {ing}
                </Tag>
              ))}
            </div>
          </div>

          <div className="mb-6!">
            <div className="text-xs! font-bold! uppercase! tracking-wider! text-neutral-400! mb-2!">
              Польза и суперфуды
            </div>
            <div className="flex! flex-wrap! gap-1.5!">
              {nutrition?.vitamins.map((vit) => (
                <Tag
                  key={vit}
                  icon={<CheckCircleOutlined className="text-emerald-400!" />}
                  className="bg-emerald-950/40! border-emerald-500/30! text-emerald-200! px-3! py-1! rounded-full! text-xs! m-0!"
                >
                  {vit}
                </Tag>
              ))}
            </div>
          </div>
        </If>

        <div className="flex! gap-3! pt-2! border-t! border-white/10!">
          <Button
            size="large"
            className="rounded-full! border-white/20! text-neutral-300! px-6!"
            onClick={onClose}
          >
            Закрыть
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<ShoppingCartOutlined />}
            onClick={() => {
              onAddToCart();
              onClose();
            }}
            className="rounded-full! flex-1! h-11! text-sm! font-bold!"
          >
            Добавить в заказ • {price} ₽
          </Button>
        </div>
      </div>
    </Modal>
  );
};
