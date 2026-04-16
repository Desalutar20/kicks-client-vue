import { type _EmptyObject, type UseMutationOptions, type UseQueryOptions } from '@pinia/colada'

export type MutationOptions<
  TData = unknown,
  TVars = void,
  TError = unknown,
  TContext extends Record<any, any> = _EmptyObject,
> = Omit<UseMutationOptions<TData, TVars, TError, TContext>, 'mutation'>

export type QueryOptions<
  TData = unknown,
  TError = unknown,
  TDataInitial extends TData | undefined = undefined,
> = Omit<UseQueryOptions<TData, TError, TDataInitial>, 'key' | 'query'>
