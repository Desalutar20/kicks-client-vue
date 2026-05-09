import type { FiltersInjectionKey } from '@/core/composables/use-filters'
import type { getAdminProductsSchema } from '@/modules/admin/modules/products/schemas/get-admin-products.schema'
import type { InjectionKey } from 'vue'

export const ADMIN_PRODUCTS_FILTERS: InjectionKey<
  FiltersInjectionKey<typeof getAdminProductsSchema>
> = Symbol('ADMIN_PRODUCTS_FILTERS')
