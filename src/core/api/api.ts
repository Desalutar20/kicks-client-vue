import ky from 'ky'
import { config } from '@/config.ts'

export type ApiSuccessResponse<T> = {
  data: T
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
    retryOnTimeout: true,
  },
  credentials: 'include',
})
