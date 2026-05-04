import type { FiltersInjectionKey } from '@/core/composables/use-filters'
import type { getAdminBrandsSchema } from '@/modules/admin/modules/brands/schemas/get-admin-brands.schema'
import type { InjectionKey } from 'vue'

export const ADMIN_BRANDS_FILTERS: InjectionKey<FiltersInjectionKey<typeof getAdminBrandsSchema>> =
  Symbol('ADMIN_BRANDS_FILTERS')
