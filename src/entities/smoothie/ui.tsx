import React from "react";
import { If } from "@/shared";
import type { ISmoothieBowlProps } from "./model";
import "./style.css";

export const SmoothieBowl: React.FC<ISmoothieBowlProps> = ({ smoothie }) => {
  const hasImage = Boolean(smoothie.image);
  const fillClassName = `bowl__fill bowl__fill-${smoothie.id}`;

  return (
    <div className="bowl">
      <If condition={hasImage}>
        <img className="bowl__img" src={smoothie.image} alt={smoothie.title} />
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
