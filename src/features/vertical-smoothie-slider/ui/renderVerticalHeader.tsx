import React from "react";
import { ArrowUpOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { CartButton } from "@/features/cart-drawer";
import { If } from "@/shared";
import type { IVerticalHeaderProps } from "../model";

export const RenderVerticalHeader: React.FC<IVerticalHeaderProps> = ({
  onScrollToTop,
}) => {
  const hasScrollToTop = Boolean(onScrollToTop);

  return (
    <header className="vslider__nav">
      <If condition={hasScrollToTop}>
        <button
          type="button"
          className="vslider__nav-back"
          onClick={onScrollToTop}
          aria-label="Вернуться к классическому меню"
        >
          <ArrowUpOutlined />
          <span>Smoothie Bar</span>
        </button>
      </If>
      <If condition={!hasScrollToTop}>
        <div className="slider__logo">PHENOMEN</div>
      </If>

      <div className="flex! items-center! gap-3!">
        <div className="vslider__badge">
          <ThunderboltOutlined />
          <span>Superfood Bowls</span>
        </div>
        <CartButton />
      </div>
    </header>
  );
};
