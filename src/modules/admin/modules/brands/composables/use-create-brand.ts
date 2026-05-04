import type { ApiKeysetResponse, ApiSuccessResponse } from '@/core/lib/api.lib'
import type { MutationOptions } from '@/core/types/tanstack.type'
import { createBrand } from '@/modules/admin/modules/brands/api/admin-brands.api'
import type { CreateBrandInput } from '@/modules/admin/modules/brands/schemas/create-brand.schema'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-toastflow'
import { ADMIN_BRANDS_QUERY_KEYS } from '@/modules/admin/modules/brands/const/admin-brands-query-keys.const'
import { useInjectFilters } from '@/core/composables/use-filters'
import { ADMIN_BRANDS_FILTERS } from '@/modules/admin/modules/brands/const/admin-brands-injection-keys.const'
import type { AdminBrand } from '@/core/types/api/admin/admin-brand.type'

export const useCreateBrand = (
  options?: MutationOptions<ApiSuccessResponse<string>, CreateBrandInput>,
) => {
  const queryClient = useQueryClient()
  const { resetFilters } = useInjectFilters(ADMIN_BRANDS_FILTERS)

  const defaultLimit = 40

  return useMutation({
    ...options,
    mutationFn: (data: CreateBrandInput) => createBrand(data),
    onSuccess: (data, params, result, ctx) => {
      resetFilters()

      queryClient.setQueryData(
        ADMIN_BRANDS_QUERY_KEYS.getAdminBrands({}),
        (old: ApiKeysetResponse<AdminBrand>) => {
          const newData = [data.data, ...old.data]

          return {
            ...old,
            data: newData.slice(0, defaultLimit),
          }
        },
      )

      toast.success(data.data)
      options?.onSuccess?.(data, params, result, ctx)
    },
  })
}
