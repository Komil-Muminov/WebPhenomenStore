import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { Tooltip, useCart } from "@/shared";
import type { ICartButtonProps } from "../model";

export const CartButton: React.FC<ICartButtonProps> = ({ className = "" }) => {
  const { totalCount, totalPrice, openDrawer } = useCart();
  const btnClass = `cart-button ${className}`.trim();
  const title =
    totalCount > 0 ? `Корзина: ${totalCount} шт. (${totalPrice} ₽)` : "Корзина";

  return (
    <Tooltip title={title}>
      <button
        type="button"
        className={btnClass}
        onClick={openDrawer}
        aria-label="Корзина"
      >
        <Badge count={totalCount} size="small" offset={[2, -2]}>
          <ShoppingCartOutlined className="text-white! text-base!" />
        </Badge>
      </button>
    </Tooltip>
  );
};
