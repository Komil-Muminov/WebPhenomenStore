import React from "react";
import type { IRenderHeaderProps } from "../model";

const NAV_ITEMS = ["Home", "Menu", "Shop", "Contact"];

export const RenderHeader: React.FC<IRenderHeaderProps> = ({
  currentTab,
  onSelectTab,
}) => {
  return (
    <header className="slider__nav">
      <span className="slider__logo">Freshify</span>
      <nav className="slider__nav-list">
        {NAV_ITEMS.map((item) => {
          const isActive = currentTab === item;
          const linkClass = `slider__nav-link ${isActive ? "slider__nav-link-active" : ""}`;
          return (
            <button
              key={item}
              type="button"
              className={linkClass}
              onClick={() => onSelectTab(item)}
            >
              {item}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
