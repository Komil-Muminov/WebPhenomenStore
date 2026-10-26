import React from "react";
import { CartDrawer, SmoothieSlider } from "@/features";
import { SMOOTHIES_DATA, type ISmoothie } from "@/entities";
import { ApiRoutes, ErrorBoundary, If, QUERY_KEYS, Spinner, useGetQuery } from "@/shared";
import { filterActiveSmoothies } from "./lib";
import type { ISmoothieShowcaseProps } from "./model";
import "./style.css";

export const SmoothieShowcase: React.FC<ISmoothieShowcaseProps> = ({
  className = "",
}) => {
  const { data, isLoading } = useGetQuery<ISmoothie[]>({
    key: QUERY_KEYS.SMOOTHIES,
    url: ApiRoutes.SMOOTHIES_SEARCH,
    initialData: SMOOTHIES_DATA,
  });

  const smoothies = filterActiveSmoothies(data ?? SMOOTHIES_DATA);
  const wrapperClass = `smoothie-showcase ${className}`.trim();

  return (
    <ErrorBoundary>
      <div className={wrapperClass}>
        <If condition={isLoading}>
          <div className="smoothie-showcase__loading flex! h-screen! w-full! items-center! justify-center!">
            <Spinner />
          </div>
        </If>
        <If condition={!isLoading}>
          <SmoothieSlider smoothies={smoothies} />
          <CartDrawer />
        </If>
      </div>
    </ErrorBoundary>
  );
};
