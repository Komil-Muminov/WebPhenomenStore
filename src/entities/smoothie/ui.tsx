import React from "react";
import { If } from "@/shared";
import type { ISmoothieBowlProps } from "./model";
import "./style.css";

export const SmoothieBowl: React.FC<ISmoothieBowlProps> = ({
  smoothie,
  onClick,
  onPointerDown,
  isActive = false,
}) => {
  const hasImage = Boolean(smoothie.image);
  const fillClassName = `bowl__fill bowl__fill-${smoothie.id}`;
  const bowlClass = `bowl ${isActive ? "bowl-active" : ""}`.trim();

  return (
    <div
      className={bowlClass}
      onClick={onClick}
      onPointerDown={onPointerDown}
    >
      <If condition={hasImage}>
        <img
          className="bowl__img"
          src={smoothie.image}
          alt={smoothie.title}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </If>
      <If condition={!hasImage}>
        <div className="bowl__plate">
          <div className={fillClassName}>
            {smoothie.toppings.map((topping, index) => (
              <span
                key={`topping-${smoothie.id}-${index}`}
                className={`bowl__topping bowl__topping-pos-${index % 6}`}
              >
                {topping}
              </span>
            ))}
            <span className="bowl__topping bowl__topping-center">
              {smoothie.toppings[0]}
            </span>
          </div>
        </div>
      </If>
    </div>
  );
};
