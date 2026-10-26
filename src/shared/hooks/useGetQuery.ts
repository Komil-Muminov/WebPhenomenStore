import { useCallback, useEffect, useState } from "react";
import { queryCache } from "./cache";
import type { IGetQueryOptions, IGetQueryResult } from "./model";

export const useGetQuery = <T>({
  key,
  url,
  initialData,
  enabled = true,
}: IGetQueryOptions<T>): IGetQueryResult<T> => {
  const [data, setData] = useState<T | null>(queryCache.get<T>(key) ?? initialData ?? null);
  const [isLoading, setIsLoading] = useState<boolean>(!queryCache.get<T>(key) && enabled);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const result: T = await response.json();
      queryCache.set(key, result);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Network request failed"));
    } finally {
      setIsLoading(false);
    }
  }, [enabled, key, url]);

  useEffect(() => {
    const unsubscribe = queryCache.subscribe(key, () => {
      fetchData();
    });
    return unsubscribe;
  }, [fetchData, key]);

  useEffect(() => {
    if (!queryCache.get<T>(key) && enabled) {
      fetchData();
    }
  }, [enabled, fetchData, key]);

  return { data, isLoading, error, refetch: fetchData };
};
