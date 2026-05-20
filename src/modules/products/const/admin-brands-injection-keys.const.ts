import type { FiltersInjectionKey } from '@/core/composables/use-filters'
import type { getProductSkusSchema } from '@/modules/products/schemas/get-product-skus.schema'
import type { InjectionKey } from 'vue'

export const PRODUCT_SKU_FILTERS: InjectionKey<FiltersInjectionKey<typeof getProductSkusSchema>> =
  Symbol('PRODUCT_SKU_FILTERS')
