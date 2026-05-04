import { useInjectFilters } from '@/core/composables/use-filters'
import type { ApiKeysetResponse, ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminCategory } from '@/core/types/api/admin/admin-category.type'
import type { MutationOptions } from '@/core/types/tanstack.type'
import { deleteCategory } from '@/modules/admin/modules/categories/api/admin-categories.api'
import { ADMIN_CATEGORIES_FILTERS } from '@/modules/admin/modules/categories/const/admin-categories-injection-keys.const'
import { ADMIN_CATEGORIES_QUERY_KEYS } from '@/modules/admin/modules/categories/const/admin-categories-query-keys.const'
import type { CategoryIdInput } from '@/modules/admin/modules/categories/schemas/category-id.schema'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-toastflow'

export const useDeleteCategory = (
  options?: MutationOptions<ApiSuccessResponse<string>, CategoryIdInput>,
) => {
  const queryClient = useQueryClient()
  const { filters, resetFilters } = useInjectFilters(ADMIN_CATEGORIES_FILTERS)

  return useMutation({
    ...options,
    mutationFn: (id: CategoryIdInput) => deleteCategory(id),
    onMutate: async (id) => {
      const queryKey = ADMIN_CATEGORIES_QUERY_KEYS.getAdminCategories(filters)

      await queryClient.cancelQueries({ queryKey: queryKey })
      const previousCategories = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: ApiKeysetResponse<AdminCategory>) => ({
        ...old,
        data: old.data.filter((category) => category.id !== id),
      }))

      return { previousCategories }
    },
    onSuccess: (data, params, result, ctx) => {
      const current = queryClient.getQueryData<ApiKeysetResponse<AdminCategory>>(
        ADMIN_CATEGORIES_QUERY_KEYS.getAdminCategories(filters),
      )

      if (current && current.data.length === 0 && current.prevCursor) {
        resetFilters()
      }

      toast.success(data.data)
      options?.onSuccess?.(data, params, result, ctx)
    },
    onError: (error, params, result, ctx) => {
      if (result?.previousCategories) {
        queryClient.setQueryData(
          ADMIN_CATEGORIES_QUERY_KEYS.getAdminCategories(filters),
          result?.previousCategories,
        )
      }

      options?.onError?.(error, params, result, ctx)
    },
  })
}
