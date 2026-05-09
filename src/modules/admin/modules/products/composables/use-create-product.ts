import { useInjectFilters } from '@/core/composables/use-filters'
import type { ApiKeysetResponse, ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminProduct } from '@/core/types/api/admin/admin-product.type'
import type { MutationOptions } from '@/core/types/tanstack.type'
import { createProduct } from '@/modules/admin/modules/products/api/admin-products.api'
import { ADMIN_PRODUCTS_FILTERS } from '@/modules/admin/modules/products/const/admin-products-injection-keys.const'
import { ADMIN_PRODUCTS_QUERY_KEYS } from '@/modules/admin/modules/products/const/admin-products-query-keys.const'
import type { CreateProductInput } from '@/modules/admin/modules/products/schemas/create-product.schema'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

export const useCreateProduct = (
  options?: MutationOptions<ApiSuccessResponse<AdminProduct>, CreateProductInput>,
) => {
  const queryClient = useQueryClient()
  const { resetFilters } = useInjectFilters(ADMIN_PRODUCTS_FILTERS)

  const defaultLimit = 40

  return useMutation({
    ...options,
    mutationFn: (data: CreateProductInput) => createProduct(data),
    onSuccess: (data, params, result, ctx) => {
      resetFilters()

      queryClient.setQueryData(
        ADMIN_PRODUCTS_QUERY_KEYS.getAdminProducts({}),
        (old: ApiKeysetResponse<AdminProduct>) => {
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
