import type { FiltersInjectionKey } from '@/core/composables/use-filters'
import type { getAdminProductSkusSchema } from '@/modules/admin/modules/productSkus/schemas/get-admin-product-skus.schema'
import type { InjectionKey } from 'vue'

export const ADMIN_PRODUCT_SKUS_FILTERS: InjectionKey<
  FiltersInjectionKey<typeof getAdminProductSkusSchema>
> = Symbol('ADMIN_PRODUCT_SKUS_FILTERS')
