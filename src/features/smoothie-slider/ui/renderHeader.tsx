import React from "react";
import { useNavigate } from "react-router-dom";
import { CartButton } from "@/features/cart-drawer";
import { AppRoutes, Logo } from "@/shared";
import type { IRenderHeaderProps } from "../model";

const NAV_ITEMS = [
  { label: "Menu", route: AppRoutes.MENU },
  { label: "Shop", route: AppRoutes.SHOP },
  { label: "Contact", route: AppRoutes.CONTACT },
];

export const RenderHeader: React.FC<IRenderHeaderProps> = ({
  currentTab,
  onSelectTab,
  onScrollToSuperfood,
}) => {
  const navigate = useNavigate();

  const handleNavClick = (label: string, route: string) => {
    onSelectTab(label);
    if (route !== AppRoutes.HOME) {
      navigate(route);
    }
  };

  return (
    <header className="slider__nav">
      <Logo />
      <nav className="slider__nav-list">
        <button
          type="button"
          className="slider__nav-link slider__nav-link-active"
          onClick={() => handleNavClick("Smoothies", AppRoutes.HOME)}
        >
          Smoothies
        </button>
        <button
          type="button"
          className="slider__nav-link"
          onClick={onScrollToSuperfood}
        >
          Superfood Bowls
        </button>
        {NAV_ITEMS.map((item) => {
          const isActive = currentTab === item.label;
          const linkClass = `slider__nav-link ${isActive ? "slider__nav-link-active" : ""}`;
          return (
            <button
              key={item.label}
              type="button"
              className={linkClass}
              onClick={() => handleNavClick(item.label, item.route)}
            >
              {item.label}
            </button>
          );
        })}
        <CartButton />
      </nav>
    </header>
  );
};

