import React, { useCallback, useState } from "react";
import { CartDrawer, SmoothieSlider, VerticalSmoothieSlider } from "@/features";
import { SMOOTHIES_DATA, SUPERFOOD_BOWLS_DATA, type ISmoothie } from "@/entities";
import { ApiRoutes, ErrorBoundary, If, QUERY_KEYS, Spinner, useGetQuery } from "@/shared";
import { filterActiveSmoothies } from "./lib";
import type { ISmoothieShowcaseProps } from "./model";
import "./style.css";

export const SmoothieShowcase: React.FC<ISmoothieShowcaseProps> = ({
  className = "",
}) => {
  const [activeSection, setActiveSection] = useState<number>(0);

  const { data, isLoading } = useGetQuery<ISmoothie[]>({
    key: QUERY_KEYS.SMOOTHIES,
    url: ApiRoutes.SMOOTHIES_SEARCH,
    initialData: SMOOTHIES_DATA,
  });

  const smoothies = filterActiveSmoothies(data ?? SMOOTHIES_DATA);
  const wrapperClass = `smoothie-showcase ${className}`.trim();
  const trackClass = `smoothie-showcase__track smoothie-showcase__track-section-${activeSection}`;

  const handleScrollToNext = useCallback(() => {
    setActiveSection(1);
  }, []);

  const handleScrollToTop = useCallback(() => {
    setActiveSection(0);
  }, []);

  return (
    <ErrorBoundary>
      <div className={wrapperClass}>
        <If condition={isLoading}>
          <div className="smoothie-showcase__loading flex! h-screen! w-full! items-center! justify-center!">
            <Spinner />
          </div>
        </If>
        <If condition={!isLoading}>
          <div className={trackClass}>
            <div className="smoothie-showcase__section">
              <SmoothieSlider
                smoothies={smoothies}
                onScrollToNext={handleScrollToNext}
              />
            </div>
            <div className="smoothie-showcase__section">
              <VerticalSmoothieSlider
                smoothies={SUPERFOOD_BOWLS_DATA}
                onScrollToTop={handleScrollToTop}
              />
            </div>
          </div>
          <CartDrawer />
        </If>
      </div>
    </ErrorBoundary>
  );
};
