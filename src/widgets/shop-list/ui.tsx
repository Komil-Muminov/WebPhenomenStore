import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined, ShoppingCartOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { SMOOTHIES_DATA, type ISmoothie } from "@/entities";
import { CartDrawer } from "@/features";
import { AppRoutes, ApiRoutes, ErrorBoundary, If, QUERY_KEYS, Spinner, Tooltip, useCart, useGetQuery } from "@/shared";
import { SMOOTHIE_PRICES } from "./lib";
import type { IShopListProps } from "./model";
import "./style.css";

export const ShopList: React.FC<IShopListProps> = ({ className = "" }) => {
  const { addItem, items } = useCart();
  const { data, isLoading } = useGetQuery<ISmoothie[]>({
    key: QUERY_KEYS.SMOOTHIES,
    url: ApiRoutes.SMOOTHIES_SEARCH,
    initialData: SMOOTHIES_DATA,
  });

  const smoothies = data ?? SMOOTHIES_DATA;
  const containerClass = `shop-list ${className}`.trim();

  const handleAddToCart = (smoothie: ISmoothie, price: number) => {
    addItem({
      id: smoothie.id,
      title: smoothie.title,
      price,
      image: smoothie.image,
    });
    message.success(`${smoothie.title} добавлен в корзину`);
  };

  return (
    <ErrorBoundary>
      <div className={containerClass}>
        <div className="shop-list__header">
          <Link to={AppRoutes.HOME}>
            <Tooltip title="На главную">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                className="mb-4! text-white! hover:bg-white/10!"
              />
            </Tooltip>
          </Link>
          <h1 className="shop-list__title">Магазин Смузи</h1>
          <p className="shop-list__subtitle">
            Закажите свежеприготовленный смузи с быстрой доставкой
          </p>
        </div>

        <If condition={isLoading}>
          <div className="flex! h-64! w-full! items-center! justify-center!">
            <Spinner />
          </div>
        </If>

        <If condition={!isLoading}>
          <div className="shop-list__grid">
            {smoothies.map((smoothie) => {
              const price = SMOOTHIE_PRICES[smoothie.id] ?? 350;
              const cartItem = items.find((it) => it.id === smoothie.id);
              const countInCart = cartItem?.count ?? 0;
              const isInCart = countInCart > 0;

              return (
                <article key={smoothie.id} className="shop-list__item">
                  <div>
                    <If condition={Boolean(smoothie.image)}>
                      <img
                        src={smoothie.image}
                        alt={smoothie.title}
                        className="w-full! h-48! object-cover! rounded-xl! mb-3!"
                      />
                    </If>
                    <div className="shop-list__item-header">
                      <h2 className="shop-list__item-title">{smoothie.title}</h2>
                      <span className="shop-list__item-price">{price} ₽</span>
                    </div>
                    <p className="shop-list__item-desc">{smoothie.description}</p>
                  </div>
                  <div className="shop-list__item-actions">
                    <Tooltip title={isInCart ? `В корзине: ${countInCart} шт.` : "Добавить в заказ"}>
                      <Button
                        type={isInCart ? "primary" : "default"}
                        icon={isInCart ? <CheckOutlined /> : <ShoppingCartOutlined />}
                        onClick={() => handleAddToCart(smoothie, price)}
                        className="rounded-full!"
                      >
                        {isInCart ? `В корзине (${countInCart})` : "В корзину"}
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
