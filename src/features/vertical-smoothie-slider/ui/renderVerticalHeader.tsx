import React from "react";
import { useNavigate } from "react-router-dom";
import { CartButton } from "@/features/cart-drawer";
import { AppRoutes, Logo } from "@/shared";
import type { IVerticalHeaderProps } from "../model";

const NAV_ITEMS = [
  { label: "Меню", route: AppRoutes.MENU },
  { label: "Магазин", route: AppRoutes.SHOP },
  { label: "Контакты", route: AppRoutes.CONTACT },
];

export const RenderVerticalHeader: React.FC<IVerticalHeaderProps> = ({
  onScrollToTop,
}) => {
  const navigate = useNavigate();

  const handleNavClick = (route: string) => {
    navigate(route);
  };

  return (
    <header className="vslider__nav">
      <Logo onClick={onScrollToTop} />
      <nav className="slider__nav-list">
        <button
          type="button"
          className="slider__nav-link"
          onClick={onScrollToTop}
        >
          Смузи
        </button>
        <button
          type="button"
          className="slider__nav-link slider__nav-link-active"
        >
          Суперфуд боулы
        </button>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            className="slider__nav-link"
            onClick={() => handleNavClick(item.route)}
          >
            {item.label}
          </button>
        ))}
        <CartButton />
      </nav>
    </header>
  );
};

