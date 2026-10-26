import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { SMOOTHIES_DATA, type ISmoothie } from "@/entities";
import { AppRoutes, ApiRoutes, ErrorBoundary, If, QUERY_KEYS, Spinner, Tooltip, useGetQuery } from "@/shared";
import { MENU_ITEMS_META } from "./lib";
import type { IMenuListProps } from "./model";
import "./style.css";

export const MenuList: React.FC<IMenuListProps> = ({ className = "" }) => {
  const { data, isLoading } = useGetQuery<ISmoothie[]>({
    key: QUERY_KEYS.SMOOTHIES,
    url: ApiRoutes.SMOOTHIES_SEARCH,
    initialData: SMOOTHIES_DATA,
  });

  const smoothies = data ?? SMOOTHIES_DATA;
  const containerClass = `menu-list ${className}`.trim();

  return (
    <ErrorBoundary>
      <div className={containerClass}>
        <div className="menu-list__header">
          <Link to={AppRoutes.HOME}>
            <Tooltip title="На главную">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                className="mb-4! text-white! hover:bg-white/10!"
              />
            </Tooltip>
          </Link>
          <h1 className="menu-list__title">Наше Меню</h1>
          <p className="menu-list__subtitle">
            Натуральные смузи из свежих ингредиентов без добавления сахара
          </p>
        </div>

        <If condition={isLoading}>
          <div className="flex! h-64! w-full! items-center! justify-center!">
            <Spinner />
          </div>
        </If>

        <If condition={!isLoading}>
          <div className="menu-list__grid">
            {smoothies.map((smoothie) => {
              const meta = MENU_ITEMS_META[smoothie.id] ?? { calories: 200, volume: "400 мл" };
              return (
                <article key={smoothie.id} className="menu-list__card">
                  <div className="menu-list__card-header">
                    <h2 className="menu-list__card-name">{smoothie.title}</h2>
                    <span className="menu-list__card-badge">{meta.volume}</span>
                  </div>
                  <p className="menu-list__card-desc">{smoothie.description}</p>
                  <div className="menu-list__card-tags">
                    {smoothie.toppings.map((topping, idx) => (
                      <span
                        key={`topping-${smoothie.id}-${idx}`}
                        className="menu-list__card-tag"
                      >
                        {topping}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </If>
      </div>
    </ErrorBoundary>
  );
};
