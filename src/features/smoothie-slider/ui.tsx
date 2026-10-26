import React, { useCallback, useEffect, useState } from "react";
import { RenderFooter } from "./ui/renderFooter";
import { RenderHeader } from "./ui/renderHeader";
import { RenderStage } from "./ui/renderStage";
import type { ISmoothieSliderProps } from "./model";
import "./style.css";

export const SmoothieSlider: React.FC<ISmoothieSliderProps> = ({ smoothies }) => {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [busy, setBusy] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("Home");

  const current = smoothies[index] ?? smoothies[0];

  const paginate = useCallback(
    (nextDir: number) => {
      if (busy || smoothies.length === 0) return;
      setBusy(true);
      setState(([prevIndex]) => [
        (prevIndex + nextDir + smoothies.length) % smoothies.length,
        nextDir,
      ]);
    },
    [busy, smoothies.length],
  );

  const handlePrev = useCallback(() => {
    paginate(-1);
  }, [paginate]);

  const handleNext = useCallback(() => {
    paginate(1);
  }, [paginate]);

  const handleAnimationEnd = useCallback(() => {
    setBusy(false);
  }, []);

  const handleSelectTab = useCallback((tab: string) => {
    setCurrentTab(tab);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const containerClass = `slider slider-bg-${current?.id ?? "blueberry"}`;

  return (
    <section className={containerClass}>
      <RenderHeader currentTab={currentTab} onSelectTab={handleSelectTab} />
      <RenderStage
        current={current}
        dir={dir}
        onAnimationEnd={handleAnimationEnd}
      />
      <RenderFooter
        current={current}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};
