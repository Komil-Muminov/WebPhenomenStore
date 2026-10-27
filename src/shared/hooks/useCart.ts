import { useCallback, useEffect, useState } from "react";

export interface ICartItem {
  id: string;
  title: string;
  price: number;
  image?: string;
  count: number;
}

type TCartListener = () => void;

class CartStore {
  private items: Map<string, ICartItem> = new Map();
  private listeners: Set<TCartListener> = new Set();
  private isOpen: boolean = false;

  getCartItems(): ICartItem[] {
    return Array.from(this.items.values());
  }

  getTotalCount(): number {
    let sum = 0;
    this.items.forEach((item) => {
      sum += item.count;
    });
    return sum;
  }

  getTotalPrice(): number {
    let sum = 0;
    this.items.forEach((item) => {
      sum += item.price * item.count;
    });
    return sum;
  }

  getIsDrawerOpen(): boolean {
    return this.isOpen;
  }

  setDrawerOpen(open: boolean): void {
    this.isOpen = open;
    this.notify();
  }

  addItem(item: Omit<ICartItem, "count">): void {
    const existing = this.items.get(item.id);
    if (existing) {
      this.items.set(item.id, { ...existing, count: existing.count + 1 });
    } else {
      this.items.set(item.id, { ...item, count: 1 });
    }
    this.notify();
  }

  decrementItem(id: string): void {
    const existing = this.items.get(id);
    if (!existing) return;
    if (existing.count > 1) {
      this.items.set(id, { ...existing, count: existing.count - 1 });
    } else {
      this.items.delete(id);
    }
    this.notify();
  }

  removeItem(id: string): void {
    this.items.delete(id);
    this.notify();
  }

  clear(): void {
    this.items.clear();
    this.notify();
  }

  subscribe(listener: TCartListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }
}

export const cartStore = new CartStore();

export const useCart = () => {
  const [, setTick] = useState<number>(0);

  useEffect(() => {
    return cartStore.subscribe(() => {
      setTick((prev) => prev + 1);
    });
  }, []);

  const items = cartStore.getCartItems();
  const totalCount = cartStore.getTotalCount();
  const totalPrice = cartStore.getTotalPrice();
  const isOpen = cartStore.getIsDrawerOpen();

  const openDrawer = useCallback(() => cartStore.setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => cartStore.setDrawerOpen(false), []);
  const addItem = useCallback((item: Omit<ICartItem, "count">) => cartStore.addItem(item), []);
  const decrementItem = useCallback((id: string) => cartStore.decrementItem(id), []);
  const removeItem = useCallback((id: string) => cartStore.removeItem(id), []);
  const clearCart = useCallback(() => cartStore.clear(), []);

  return {
    items,
    totalCount,
    totalPrice,
    isOpen,
    openDrawer,
    closeDrawer,
    addItem,
    decrementItem,
    removeItem,
    clearCart,
  };
};
