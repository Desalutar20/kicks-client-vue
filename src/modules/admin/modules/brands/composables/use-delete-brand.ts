import { useInjectFilters } from '@/core/composables/use-filters'
import type { ApiKeysetResponse, ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminBrand } from '@/core/types/api/admin/admin-brand.type'
import type { MutationOptions } from '@/core/types/tanstack.type'
import { deleteBrand } from '@/modules/admin/modules/brands/api/admin-brands.api'
import { ADMIN_BRANDS_FILTERS } from '@/modules/admin/modules/brands/const/admin-brands-injection-keys.const'
import { ADMIN_BRANDS_QUERY_KEYS } from '@/modules/admin/modules/brands/const/admin-brands-query-keys.const'
import type { BrandIdInput } from '@/modules/admin/modules/brands/schemas/brand-id.schema'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-toastflow'

export const useDeleteBrand = (
  options?: MutationOptions<ApiSuccessResponse<string>, BrandIdInput>,
) => {
  const queryClient = useQueryClient()
  const { filters, resetFilters } = useInjectFilters(ADMIN_BRANDS_FILTERS)

  return useMutation({
    ...options,
    onMutate: async (id) => {
      const queryKey = ADMIN_BRANDS_QUERY_KEYS.getAdminBrands(filters)

      await queryClient.cancelQueries({ queryKey: queryKey })
      const previousBrands = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: ApiKeysetResponse<AdminBrand>) => ({
        ...old,
        data: old.data.filter((brand) => brand.id !== id),
      }))

      return { previousBrands }
    },
    mutationFn: (id: BrandIdInput) => deleteBrand(id),
    onSuccess: (data, params, result, ctx) => {
      const current = queryClient.getQueryData<ApiKeysetResponse<AdminBrand>>(
        ADMIN_BRANDS_QUERY_KEYS.getAdminBrands(filters),
      )

      if (current && current.data.length === 0 && current.prevCursor) {
        resetFilters()
      }

      toast.success(data.data)
      options?.onSuccess?.(data, params, result, ctx)
    },
    onError: (error, params, result, ctx) => {
      if (result?.previousBrands) {
        queryClient.setQueryData(
          ADMIN_BRANDS_QUERY_KEYS.getAdminBrands(filters),
          result.previousBrands,
        )
      }

      options?.onError?.(error, params, result, ctx)
    },
  })
}
