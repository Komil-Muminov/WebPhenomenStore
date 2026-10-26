import type { TQueryKeys } from "@/shared/config";

export interface IGetQueryOptions<T> {
  key: TQueryKeys;
  url: string;
  initialData?: T;
  enabled?: boolean;
}

export interface IGetQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface IMutationOptions<TVariables, TData> {
  invalidateKeys?: TQueryKeys[];
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

export interface IMutationResult<TVariables, TData> {
  mutate: (variables: TVariables) => Promise<TData | undefined>;
  isLoading: boolean;
  error: Error | null;
  data: TData | null;
}
