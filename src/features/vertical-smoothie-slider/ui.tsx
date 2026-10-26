import React, { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { useCart } from "@/shared";
import { RenderNutritionModal } from "@/features/smoothie-slider/ui/renderNutritionModal";
import { RenderVerticalFooter } from "./ui/renderVerticalFooter";
import { RenderVerticalHeader } from "./ui/renderVerticalHeader";
import { RenderVerticalStage } from "./ui/renderVerticalStage";
import type { IVerticalSmoothieSliderProps } from "./model";
import "./style.css";

const SUPERFOOD_PRICES: Record<string, number> = {
  matcha: 450,
  mango: 430,
  pitaya: 460,
  acai: 480,
};

export const VerticalSmoothieSlider: React.FC<IVerticalSmoothieSliderProps> = ({
  smoothies,
  onScrollToTop,
}) => {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [busy, setBusy] = useState<boolean>(false);
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

  const handleAddToCart = useCallback(() => {
    const price = SUPERFOOD_PRICES[current.id] ?? 450;
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
      if (e.key === "ArrowDown") handleNext();
      if (e.key === "ArrowUp") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    let lastWheelTime = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < 700) return;

      if (Math.abs(e.deltaY) > 25) {
        if (e.deltaY > 25) {
          handleNext();
          lastWheelTime = now;
        } else if (e.deltaY < -25) {
          if (index === 0 && onScrollToTop) {
            onScrollToTop();
            lastWheelTime = now;
          } else {
            handlePrev();
            lastWheelTime = now;
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleNext, handlePrev, index, onScrollToTop]);

  const containerClass = `vslider vslider-bg-${current?.id ?? "matcha"}`;

  return (
    <section className={containerClass}>
      <RenderVerticalHeader onScrollToTop={onScrollToTop} />
      <RenderVerticalStage
        current={current}
        dir={dir}
        onAnimationEnd={handleAnimationEnd}
        onPrev={handlePrev}
        onNext={handleNext}
        onOpenNutrition={() => setIsNutritionOpen(true)}
      />
      <RenderVerticalFooter
        current={current}
        currentIndex={index}
        totalCount={smoothies.length}
        onSelectIndex={paginateToIndex}
        onOpenNutrition={() => setIsNutritionOpen(true)}
        onAddToCart={handleAddToCart}
      />
      <RenderNutritionModal
        smoothie={current}
        open={isNutritionOpen}
        onClose={() => setIsNutritionOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
};
