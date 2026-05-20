import { useRoute } from 'vue-router'
import { reactive, watch, type WatchOptions } from 'vue'
import { toast } from 'vue-toastflow'
import type { ZodObject, ZodRawShape } from 'zod'
import { z } from 'zod'

export const useParseQuery = <T extends ZodObject<ZodRawShape>>(
  schema: T,
  {
    error = 'Invalid query',
    onError,
    onSuccess,
    options,
  }: {
    error?: string
    onError?: () => void
    onSuccess?: (data: z.infer<T>) => void
    options?: WatchOptions
  },
) => {
  const route = useRoute()
  const parsed: Partial<z.infer<T>> = reactive({})

  watch(
    () => route.query,
    (query) => {
      const result = schema.safeParse(query)

      if (!result.success) {
        toast.error(error)
        return onError?.()
      }

      onSuccess?.(result.data)

      for (const key in parsed) {
        if (!Object.hasOwn(parsed, key)) continue

        delete parsed[key]
      }

      Object.assign(parsed, result.data)
    },
    { immediate: true, ...options },
  )

  return parsed
}
