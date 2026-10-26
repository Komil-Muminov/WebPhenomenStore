import React from "react";
import { useNavigate } from "react-router-dom";
import { CartButton } from "@/features/cart-drawer";
import { AppRoutes } from "@/shared";
import type { IRenderHeaderProps } from "../model";

const NAV_ITEMS = [
  { label: "Home", route: AppRoutes.HOME },
  { label: "Menu", route: AppRoutes.MENU },
  { label: "Shop", route: AppRoutes.SHOP },
  { label: "Contact", route: AppRoutes.CONTACT },
];

export const RenderHeader: React.FC<IRenderHeaderProps> = ({
  currentTab,
  onSelectTab,
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
      <span className="slider__logo">PHENOMEN</span>
      <nav className="slider__nav-list">
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
