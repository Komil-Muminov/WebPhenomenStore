import React, { useCallback, useEffect, useRef, useState } from "react";
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
  blackberry_bowl: 440,
  mango: 430,
  pitaya: 460,
  chocolate_bowl: 470,
  acai: 480,
  blueberry_bowl: 450,
};

export const VerticalSmoothieSlider: React.FC<IVerticalSmoothieSliderProps> = ({
  smoothies,
  onScrollToTop,
  isActive = true,
}) => {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const lastPaginateTimeRef = useRef<number>(0);
  const activateTimeRef = useRef<number>(Date.now());
  const [isNutritionOpen, setIsNutritionOpen] = useState<boolean>(false);

  const { addItem } = useCart();
  const current = smoothies[index] ?? smoothies[0];

  useEffect(() => {
    if (isActive) {
      activateTimeRef.current = Date.now();
      setState([0, 1]);
    }
  }, [isActive]);

  const paginate = useCallback(
    (nextDir: number) => {
      const now = Date.now();
      if (now - lastPaginateTimeRef.current < 550 || smoothies.length === 0) return;
      lastPaginateTimeRef.current = now;
      setState(([prevIndex]) => [
        (prevIndex + nextDir + smoothies.length) % smoothies.length,
        nextDir,
      ]);
    },
    [smoothies.length],
  );

  const paginateToIndex = useCallback(
    (targetIndex: number) => {
      const now = Date.now();
      if (
        now - lastPaginateTimeRef.current < 550 ||
        targetIndex === index ||
        smoothies.length === 0
      ) {
        return;
      }
      lastPaginateTimeRef.current = now;
      const nextDir = targetIndex > index ? 1 : -1;
      setState([targetIndex, nextDir]);
    },
    [index, smoothies.length],
  );

  const handlePrev = useCallback(() => {
    paginate(-1);
  }, [paginate]);

  const handleNext = useCallback(() => {
    paginate(1);
  }, [paginate]);

  const handleAnimationEnd = useCallback(() => {}, []);

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
    if (!isActive) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") handleNext();
      if (e.key === "ArrowUp") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isActive]);

  useEffect(() => {
    if (!isActive) return;
    let lastWheelTime = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - activateTimeRef.current < 750) return;
      if (now - lastWheelTime < 600) return;

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
  }, [handleNext, handlePrev, index, onScrollToTop, isActive]);

  const containerClass = `vslider vslider-bg-${current?.id ?? "matcha"}`;

  const currentPrice = SUPERFOOD_PRICES[current?.id] ?? 450;

  return (
    <section className={containerClass}>
      <RenderVerticalHeader onScrollToTop={onScrollToTop} />
      <RenderVerticalStage
        current={current}
        currentIndex={index}
        dir={dir}
        onAnimationEnd={handleAnimationEnd}
        onPrev={handlePrev}
        onNext={handleNext}
        onOpenNutrition={() => setIsNutritionOpen(true)}
        onAddToCart={handleAddToCart}
        price={currentPrice}
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
