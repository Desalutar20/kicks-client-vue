import type { ApiKeysetResponse, ApiSuccessResponse } from '@/core/lib/api.lib'
import type { MutationOptions } from '@/core/types/tanstack.type'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useInjectFilters } from '@/core/composables/use-filters'
import { ADMIN_CATEGORIES_FILTERS } from '@/modules/admin/modules/categories/const/admin-categories-injection-keys.const'
import { ADMIN_CATEGORIES_QUERY_KEYS } from '@/modules/admin/modules/categories/const/admin-categories-query-keys.const'
import { type CreateCategoryInput } from '@/modules/admin/modules/categories/schemas/create-category.schema'
import { createCategory } from '@/modules/admin/modules/categories/api/admin-categories.api'
import type { AdminCategory } from '@/core/types/api/admin/admin-category.type'

export const useCreateCategory = (
  options?: MutationOptions<ApiSuccessResponse<AdminCategory>, CreateCategoryInput>,
) => {
  const queryClient = useQueryClient()
  const { resetFilters } = useInjectFilters(ADMIN_CATEGORIES_FILTERS)

  const defaultLimit = 40

  return useMutation({
    ...options,
    mutationFn: (data: CreateCategoryInput) => createCategory(data),
    onSuccess: (data, params, result, ctx) => {
      resetFilters()

      queryClient.setQueryData(
        ADMIN_CATEGORIES_QUERY_KEYS.getAdminCategories({}),
        (old: ApiKeysetResponse<AdminCategory>) => {
          const newData = [data.data, ...old.data]

          return {
            ...old,
            data: newData.slice(0, defaultLimit),
          }
        },
      )

      options?.onSuccess?.(data, params, result, ctx)
    },
  })
}
