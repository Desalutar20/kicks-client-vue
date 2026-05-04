import type { ApiKeysetResponse } from '@/core/lib/api.lib'
import type { AdminCategory } from '@/core/types/api/admin/admin-category.type'
import type { QueryOptions } from '@/core/types/tanstack.type'
import { getAdminCategories } from '@/modules/admin/modules/categories/api/admin-categories.api'
import { ADMIN_CATEGORIES_QUERY_KEYS } from '@/modules/admin/modules/categories/const/admin-categories-query-keys.const'
import type { GetAdminCategoriesInput } from '@/modules/admin/modules/categories/schemas/get-admin-categories.schema'
import { useQuery } from '@tanstack/vue-query'
import { toValue, type MaybeRefOrGetter } from 'vue'

export const useGetAdminCategories = (
  input: MaybeRefOrGetter<GetAdminCategoriesInput>,
  options?: QueryOptions<ApiKeysetResponse<AdminCategory>>,
) => {
  return useQuery({
    ...options,
    queryKey: ADMIN_CATEGORIES_QUERY_KEYS.getAdminCategories(toValue(input)),
    queryFn: () => getAdminCategories(toValue(input)),
  })
}
