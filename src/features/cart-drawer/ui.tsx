import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, PlusOutlined, MinusOutlined, DeleteOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Drawer, message } from "antd";
import { AppRoutes, If, Tooltip, useCart } from "@/shared";
import { CartButton } from "./ui/cartButton";
import type { ICartDrawerProps } from "./model";
import "./style.css";

export const CartDrawer: React.FC<ICartDrawerProps> = ({
  showTrigger = false,
}) => {
  const {
    items,
    totalPrice,
    isOpen,
    closeDrawer,
    addItem,
    decrementItem,
    removeItem,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    message.success("Заказ успешно оформлен! Приготовим и доставим за 30 минут.");
    clearCart();
    closeDrawer();
  };

  const hasItems = items.length > 0;

  return (
    <>
      <If condition={showTrigger}>
        <CartButton className="cart-drawer__trigger" />
      </If>

      <Drawer
        title="Ваш заказ"
        placement="right"
        onClose={closeDrawer}
        open={isOpen}
        width={420}
        className="cart-drawer__panel"
      >
        <If condition={!hasItems}>
          <div className="flex! flex-col! h-full! items-center! justify-center! text-center! py-12!">
            <div className="w-20! h-20! rounded-full! bg-white/5! border! border-white/10! flex! items-center! justify-center! mb-4! text-3xl! text-neutral-400!">
              <ShoppingCartOutlined />
            </div>
            <h3 className="text-lg! font-bold! text-white! mb-1!">Корзина пуста</h3>
            <p className="text-sm! text-neutral-400! max-w-xs! mb-6!">
              Выберите смузи из нашего свежего меню, чтобы оформить заказ
            </p>
            <Link to={AppRoutes.MENU} onClick={closeDrawer}>
              <Button type="primary" className="rounded-full! px-6!">
                Смотреть меню
              </Button>
            </Link>
          </div>
        </If>

        <If condition={hasItems}>
          <div className="flex! flex-col! h-full! justify-between!">
            <div className="overflow-y-auto! max-h-[58vh]! pr-1!">
              {items.map((item) => (
                <div key={item.id} className="cart-drawer__card">
                  <div className="cart-drawer__card-info">
                    <If condition={Boolean(item.image)}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="cart-drawer__card-img"
                      />
                    </If>
                    <div>
                      <h4 className="cart-drawer__card-name">{item.title}</h4>
                      <div className="cart-drawer__card-price">{item.price} ₽</div>
                    </div>
                  </div>

                  <div className="flex! items-center! gap-2!">
                    <div className="cart-drawer__stepper">
                      <button
                        type="button"
                        className="cart-drawer__stepper-btn"
                        onClick={() => decrementItem(item.id)}
                        aria-label="Уменьшить количество"
                      >
                        <MinusOutlined />
                      </button>
                      <span className="cart-drawer__stepper-count">{item.count}</span>
                      <button
                        type="button"
                        className="cart-drawer__stepper-btn"
                        onClick={() => addItem(item)}
                        aria-label="Увеличить количество"
                      >
                        <PlusOutlined />
                      </button>
                    </div>
                    <Tooltip title="Удалить">
                      <button
                        type="button"
                        className="cart-drawer__stepper-btn text-rose-400! hover:text-rose-300!"
                        onClick={() => removeItem(item.id)}
                        aria-label="Удалить товар"
                      >
                        <DeleteOutlined />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2!">
              <div className="cart-drawer__summary">
                <div className="cart-drawer__summary-row">
                  <span>Сумма блюд:</span>
                  <span className="text-white! font-medium!">{totalPrice} ₽</span>
                </div>
                <div className="cart-drawer__summary-row">
                  <span>Эко-упаковка:</span>
                  <span className="text-emerald-400!">Бесплатно</span>
                </div>
                <div className="cart-drawer__summary-row">
                  <span>Доставка:</span>
                  <span className="text-emerald-400!">0 ₽</span>
                </div>
                <div className="cart-drawer__summary-total">
                  <span>Итого:</span>
                  <span className="text-emerald-400! text-xl!">{totalPrice} ₽</span>
                </div>
              </div>

              <Button
                type="primary"
                block
                size="large"
                className="rounded-full! mt-4! h-12! text-base! font-bold! flex! items-center! justify-center! gap-2!"
                onClick={handleCheckout}
              >
                Оформить заказ <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        </If>
      </Drawer>
    </>
  );
};
