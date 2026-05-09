import { useParseQuery } from '@/core/composables/use-parse-query'
import { ROUTE_NAMES } from '@/core/const/router.const'
import type { DeepStringValue } from '@/core/types/util.type'
import { isObjectsEqualSimple } from '@/core/utils/compare-objects.util'
import { computed, inject, provide, reactive, type ComputedRef, type InjectionKey } from 'vue'
import { useRouter } from 'vue-router'
import { type z, type ZodObject, type ZodRawShape } from 'zod'

export type FiltersInjectionKey<TSchema extends ZodObject<ZodRawShape>> = {
  filters: Partial<z.infer<TSchema>>
  lazyFilters: Partial<z.infer<TSchema>>
  isEqual: ComputedRef<boolean>
  setFilter: <K extends keyof z.infer<TSchema>>(
    key: K,
    value: z.infer<TSchema>[K] | undefined,
  ) => void
  applyFilters: () => void
  resetFilters: () => void
}

export const useProviderFilters = <TSchema extends ZodObject<ZodRawShape>>(
  schema: TSchema,
  routeName: DeepStringValue<typeof ROUTE_NAMES>,
  injectionKey: InjectionKey<FiltersInjectionKey<TSchema>>,
) => {
  const router = useRouter()
  const lazyFilters: Partial<z.infer<TSchema>> = reactive({})

  const filters = useParseQuery(schema, {
    error: 'Invalid filters',
    onSuccess: (data) => {
      Object.assign(lazyFilters, data)
    },
  })

  const isEqual = computed(() => {
    if (!filters) return false

    return isObjectsEqualSimple(filters, lazyFilters)
  })

  const setFilter = <K extends keyof z.infer<TSchema>>(
    key: K,
    value: z.infer<TSchema>[K] | undefined,
  ) => {
    const isPagination = key === 'nextCursor' || key === 'prevCursor'

    if (value === undefined) {
      delete lazyFilters[key]
      return
    }

    if (key === 'nextCursor' && Object.hasOwn(lazyFilters, 'prevCursor'))
      delete lazyFilters['prevCursor']

    if (key === 'prevCursor' && Object.hasOwn(lazyFilters, 'nextCursor'))
      delete lazyFilters['nextCursor']

    lazyFilters[key] = value

    if (isPagination)
      router.replace({
        name: routeName,
        query: lazyFilters as Record<string, string>,
      })
  }

  const applyFilters = () => {
    if (isEqual.value) return

    const query = Object.fromEntries(
      Object.entries(lazyFilters)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)]),
    )

    router.replace({
      name: routeName,
      query,
    })
  }

  const resetFilters = () => {
    for (const key in lazyFilters) {
      if (Object.hasOwn(lazyFilters, key)) {
        delete lazyFilters[key]
      }
    }

    router.replace({
      name: routeName,
      query: {},
    })
  }

  provide(injectionKey, {
    filters,
    lazyFilters,
    isEqual,
    setFilter,
    applyFilters,
    resetFilters,
  })
}

export const useInjectFilters = <TSchema extends ZodObject<ZodRawShape>>(
  injectionKey: InjectionKey<FiltersInjectionKey<TSchema>>,
) => {
  const filters = inject(injectionKey)
  if (!filters) {
    throw new Error('Filters not provided')
  }

  return filters
}
