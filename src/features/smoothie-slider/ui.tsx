import React, { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { If, useCart } from "@/shared";
import { RenderFooter } from "./ui/renderFooter";
import { RenderHeader } from "./ui/renderHeader";
import { RenderNutritionModal } from "./ui/renderNutritionModal";
import { RenderStage } from "./ui/renderStage";
import type { ISmoothieSliderProps } from "./model";
import "./style.css";

const SMOOTHIE_PRICES_MAP: Record<string, number> = {
  blueberry: 390,
  strawberry: 350,
  chocolate: 420,
  blackberry: 410,
};

export const SmoothieSlider: React.FC<ISmoothieSliderProps> = ({
  smoothies,
  onScrollToNext,
}) => {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [busy, setBusy] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("Home");
  const [isNutritionOpen, setIsNutritionOpen] = useState<boolean>(false);

  const { addItem } = useCart();
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

  const paginateToIndex = useCallback(
    (targetIndex: number) => {
      if (busy || targetIndex === index || smoothies.length === 0) return;
      const nextDir = targetIndex > index ? 1 : -1;
      setBusy(true);
      setState([targetIndex, nextDir]);
    },
    [busy, index, smoothies.length],
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

  const handleAddToCart = useCallback(() => {
    const price = SMOOTHIE_PRICES_MAP[current.id] ?? 350;
    addItem({
      id: current.id,
      title: current.title,
      price,
      image: current.image,
    });
    message.success(`${current.title} добавлен в корзину`);
  }, [addItem, current]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    let lastWheelTime = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < 700) return;

      if (Math.abs(e.deltaX) > 20) {
        if (e.deltaX > 20) {
          handleNext();
          lastWheelTime = now;
        } else if (e.deltaX < -20) {
          handlePrev();
          lastWheelTime = now;
        }
      } else if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 30) {
          if (onScrollToNext) {
            onScrollToNext();
            lastWheelTime = now;
          } else {
            handleNext();
            lastWheelTime = now;
          }
        } else if (e.deltaY < -30) {
          handlePrev();
          lastWheelTime = now;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleNext, handlePrev, onScrollToNext]);

  const containerClass = `slider slider-bg-${current?.id ?? "blueberry"}`;

  return (
    <section className={containerClass}>
      <RenderHeader currentTab={currentTab} onSelectTab={handleSelectTab} />
      <RenderStage
        current={current}
        dir={dir}
        onAnimationEnd={handleAnimationEnd}
        onPrev={handlePrev}
        onNext={handleNext}
        onOpenNutrition={() => setIsNutritionOpen(true)}
      />
      <RenderFooter
        current={current}
        currentIndex={index}
        totalCount={smoothies.length}
        onSelectIndex={paginateToIndex}
        onOpenNutrition={() => setIsNutritionOpen(true)}
        onAddToCart={handleAddToCart}
      />
      <If condition={Boolean(onScrollToNext)}>
        <button
          type="button"
          className="slider__scroll-cue"
          onClick={onScrollToNext}
          aria-label="Листать вниз"
        >
          <span className="slider__scroll-cue-dot" />
        </button>
      </If>
      <RenderNutritionModal
        smoothie={current}
        open={isNutritionOpen}
        onClose={() => setIsNutritionOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
};
