type TListener = () => void;

class QueryCacheStore {
  private cache: Map<string, unknown> = new Map();
  private listeners: Map<string, Set<TListener>> = new Map();

  get<T>(key: string): T | undefined {
    return this.cache.get(key) as T | undefined;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, data);
  }

  subscribe(key: string, listener: TListener): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)?.add(listener);
    return () => {
      this.listeners.get(key)?.delete(listener);
    };
  }

  invalidate(key: string): void {
    this.cache.delete(key);
    this.listeners.get(key)?.forEach((cb) => cb());
  }
}

export const queryCache = new QueryCacheStore();
