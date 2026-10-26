import { useCallback, useState } from "react";
import { queryCache } from "./cache";
import type { IMutationOptions, IMutationResult } from "./model";

export const useMutationQuery = <TVariables, TData>({
  invalidateKeys = [],
  mutationFn,
  onSuccess,
  onError,
}: IMutationOptions<TVariables, TData>): IMutationResult<TVariables, TData> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TData | null>(null);

  const mutate = useCallback(
    async (variables: TVariables): Promise<TData | undefined> => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await mutationFn(variables);
        setData(result);
        invalidateKeys.forEach((key) => queryCache.invalidate(key));
        onSuccess?.(result);
        return result;
      } catch (err) {
        const parsedError = err instanceof Error ? err : new Error("Mutation failed");
        setError(parsedError);
        onError?.(parsedError);
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [invalidateKeys, mutationFn, onError, onSuccess],
  );

  return { mutate, isLoading, error, data };
};
