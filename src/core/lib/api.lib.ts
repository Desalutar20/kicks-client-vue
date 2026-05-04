import ky from 'ky'
import { config } from '@/config.ts'
import type { Nullable } from '@/core/types/util.type'

export type ApiSuccessResponse<T> = {
  data: T
}

export type ApiKeysetResponse<T> = {
  data: T[]
  prevCursor: Nullable<string>
  nextCursor: Nullable<string>
}

export type ApiErrorResponse<ErrorKeys extends string[] = []> = {
  title: string
  detail?: string
  status: number
  errors?: Record<ErrorKeys[number], string[]>
}

export const isApiError = (error: unknown): error is ApiErrorResponse => {
  const err = error as ApiErrorResponse

  return err.title !== undefined && err.status !== undefined
}

export const http = ky.create({
  baseUrl: config.apiUrl,
  prefix: config.apiPrefix,
  retry: {
    limit: 0,
  },
  credentials: 'include',
})
