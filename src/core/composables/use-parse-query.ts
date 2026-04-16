import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import { toast } from 'vue-toastflow'
import type { ZodType } from 'zod'
import { z } from 'zod'

export const useParseQuery = <T extends ZodType>(schema: T, error = 'Invalid query') => {
  const route = useRoute()

  const parsed = computed(() => schema.safeParse(route.query))

  watch(
    () => parsed.value.success,
    (isValid) => {
      if (!isValid) {
        toast.error(error)
      }
    },
    { immediate: true },
  )

  return computed<z.infer<T> | null>(() => {
    return parsed.value.success ? parsed.value.data : null
  })
}
