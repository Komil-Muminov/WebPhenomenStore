import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { SMOOTHIES_DATA, type ISmoothie } from "@/entities";
import { CartButton, CartDrawer } from "@/features";
import { AppRoutes, ApiRoutes, ErrorBoundary, If, QUERY_KEYS, Spinner, Tooltip, useCart, useGetQuery } from "@/shared";
import { MENU_ITEMS_META } from "./lib";
import type { IMenuListProps } from "./model";
import "./style.css";

const MENU_PRICES_MAP: Record<string, number> = {
  blueberry: 390,
  strawberry: 350,
  chocolate: 420,
  blackberry: 410,
};

export const MenuList: React.FC<IMenuListProps> = ({ className = "" }) => {
  const { addItem } = useCart();
  const { data, isLoading } = useGetQuery<ISmoothie[]>({
    key: QUERY_KEYS.SMOOTHIES,
    url: ApiRoutes.SMOOTHIES_SEARCH,
    initialData: SMOOTHIES_DATA,
  });

  const smoothies = data ?? SMOOTHIES_DATA;
  const containerClass = `menu-list ${className}`.trim();

  const handleAddToCart = (smoothie: ISmoothie) => {
    const price = MENU_PRICES_MAP[smoothie.id] ?? 350;
    addItem({
      id: smoothie.id,
      title: smoothie.title,
      price,
      image: smoothie.image,
    });
    message.success(`${smoothie.title} добавлен в заказ`);
  };

  return (
    <ErrorBoundary>
      <div className={containerClass}>
        <div className="menu-list__header">
          <div className="flex! items-center! justify-between! mb-4!">
            <Link to={AppRoutes.HOME}>
              <Tooltip title="На главную">
                <Button
                  type="text"
                  icon={<ArrowLeftOutlined />}
                  className="text-white! hover:bg-white/10!"
                />
              </Tooltip>
            </Link>
            <CartButton />
          </div>
          <h1 className="menu-list__title">Наше Меню</h1>
          <p className="menu-list__subtitle">
            Натуральные смузи из свежих ингредиентов без добавления сахара
          </p>
        </div>

        <If condition={isLoading}>
          <div className="flex! h-64! w-full! items-center! justify-center!">
            <Spinner />
          </div>
        </If>

        <If condition={!isLoading}>
          <div className="menu-list__grid">
            {smoothies.map((smoothie) => {
              const meta = MENU_ITEMS_META[smoothie.id] ?? { calories: 200, volume: "400 мл" };
              return (
                <article key={smoothie.id} className="menu-list__card flex! flex-col! justify-between!">
                  <div>
                    <If condition={Boolean(smoothie.image)}>
                      <img
                        src={smoothie.image}
                        alt={smoothie.title}
                        className="w-full! h-40! object-cover! rounded-xl! mb-3!"
                      />
                    </If>
                    <div className="menu-list__card-header">
                      <h2 className="menu-list__card-name">{smoothie.title}</h2>
                      <span className="menu-list__card-badge">{meta.volume}</span>
                    </div>
                    <p className="menu-list__card-desc">{smoothie.description}</p>
                    <div className="menu-list__card-tags mb-4!">
                      {smoothie.toppings.map((topping, idx) => (
                        <span
                          key={`topping-${smoothie.id}-${idx}`}
                          className="menu-list__card-tag"
                        >
                          {topping}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex! items-center! justify-between! pt-2! border-t! border-white/10!">
                    <span className="text-xs! text-neutral-400!">{meta.calories} ккал</span>
                    <Tooltip title="Заказать этот смузи">
                      <Button
                        type="primary"
                        size="small"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => handleAddToCart(smoothie)}
                        className="rounded-full!"
                      >
                        В заказ
                      </Button>
                    </Tooltip>
                  </div>
                </article>
              );
            })}
          </div>
        </If>
        <CartDrawer />
      </div>
    </ErrorBoundary>
  );
};
