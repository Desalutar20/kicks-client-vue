import { useInjectFilters } from '@/core/composables/use-filters'
import type { ApiKeysetResponse, ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminBrand } from '@/core/types/api/admin/admin-brand.type'
import type { MutationOptions } from '@/core/types/tanstack.type'
import { updateBrand } from '@/modules/admin/modules/brands/api/admin-brands.api'
import { ADMIN_BRANDS_FILTERS } from '@/modules/admin/modules/brands/const/admin-brands-injection-keys.const'
import { ADMIN_BRANDS_QUERY_KEYS } from '@/modules/admin/modules/brands/const/admin-brands-query-keys.const'
import type { UpdateBrandInput } from '@/modules/admin/modules/brands/schemas/update-brand.schema'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-toastflow'

export const useUpdateBrand = (
  options?: MutationOptions<ApiSuccessResponse<string>, UpdateBrandInput>,
) => {
  const queryClient = useQueryClient()
  const { filters } = useInjectFilters(ADMIN_BRANDS_FILTERS)

  return useMutation({
    ...options,
    mutationFn: (data: UpdateBrandInput) => updateBrand(data),
    onMutate: async ({ id, name }) => {
      const queryKey = ADMIN_BRANDS_QUERY_KEYS.getAdminBrands(filters)

      await queryClient.cancelQueries({ queryKey: queryKey })
      const previousBrands = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: ApiKeysetResponse<AdminBrand>) => ({
        ...old,
        data: old.data.map((brand) => (brand.id === id ? { ...brand, name } : brand)),
      }))

      return { previousBrands }
    },
    onSuccess: (data, params, result, ctx) => {
      toast.success(data.data)
      options?.onSuccess?.(data, params, result, ctx)
    },
    onError: (error, params, result, ctx) => {
      if (result?.previousBrands) {
        queryClient.setQueryData(
          ADMIN_BRANDS_QUERY_KEYS.getAdminBrands(filters),
          result?.previousBrands,
        )
      }

      options?.onError?.(error, params, result, ctx)
    },
  })
}
