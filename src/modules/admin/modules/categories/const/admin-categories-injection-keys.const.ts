import type { FiltersInjectionKey } from '@/core/composables/use-filters'
import type { getAdminCategoriesSchema } from '@/modules/admin/modules/categories/schemas/get-admin-categories.schema'
import type { InjectionKey } from 'vue'

export const ADMIN_CATEGORIES_FILTERS: InjectionKey<
  FiltersInjectionKey<typeof getAdminCategoriesSchema>
> = Symbol('ADMIN_CATEGORIES_FILTERS')
