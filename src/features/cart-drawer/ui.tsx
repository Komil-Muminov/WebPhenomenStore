import React from "react";
import { ShoppingCartOutlined, PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, Empty, message } from "antd";
import { If, Tooltip, useCart } from "@/shared";
import type { ICartDrawerProps } from "./model";
import "./style.css";

export const CartDrawer: React.FC<ICartDrawerProps> = () => {
  const {
    items,
    totalCount,
    totalPrice,
    isOpen,
    openDrawer,
    closeDrawer,
    addItem,
    decrementItem,
    removeItem,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    message.success("Заказ успешно оформлен! Наш менеджер свяжется с вами.");
    clearCart();
    closeDrawer();
  };

  const hasItems = items.length > 0;

  return (
    <>
      <Tooltip title="Открыть корзину">
        <button
          type="button"
          className="cart-drawer__trigger"
          onClick={openDrawer}
          aria-label="Корзина"
        >
          <Badge count={totalCount} size="small" offset={[2, -2]}>
            <ShoppingCartOutlined className="text-white!" />
          </Badge>
        </button>
      </Tooltip>

      <Drawer
        title="Ваш заказ"
        placement="right"
        onClose={closeDrawer}
        open={isOpen}
        width={380}
      >
        <If condition={!hasItems}>
          <div className="flex! h-64! items-center! justify-center!">
            <Empty description="В корзине пока пусто" />
          </div>
        </If>

        <If condition={hasItems}>
          <div className="flex! flex-col! h-full! justify-between!">
            <div className="overflow-y-auto! max-h-[60vh]!">
              {items.map((item) => (
                <div key={item.id} className="cart-drawer__item">
                  <div className="cart-drawer__item-info">
                    <If condition={Boolean(item.image)}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="cart-drawer__item-img"
                      />
                    </If>
                    <div>
                      <div className="cart-drawer__item-title">{item.title}</div>
                      <div className="cart-drawer__item-price">
                        {item.price} ₽ × {item.count} = {item.price * item.count} ₽
                      </div>
                    </div>
                  </div>

                  <div className="cart-drawer__item-controls">
                    <Tooltip title="Уменьшить">
                      <Button
                        type="text"
                        size="small"
                        icon={<MinusOutlined />}
                        onClick={() => decrementItem(item.id)}
                      />
                    </Tooltip>
                    <span className="font-semibold! text-sm! px-1!">{item.count}</span>
                    <Tooltip title="Увеличить">
                      <Button
                        type="text"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => addItem(item)}
                      />
                    </Tooltip>
                    <Tooltip title="Удалить">
                      <Button
                        type="text"
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => removeItem(item.id)}
                      />
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-drawer__footer border-t! border-white/10!">
              <div className="cart-drawer__total">
                <span>Итого к оплате:</span>
                <span className="text-emerald-400!">{totalPrice} ₽</span>
              </div>
              <Button
                type="primary"
                block
                size="large"
                className="rounded-full!"
                onClick={handleCheckout}
              >
                Оформить заказ
              </Button>
            </div>
          </div>
        </If>
      </Drawer>
    </>
  );
};
