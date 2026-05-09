import { useInjectFilters } from '@/core/composables/use-filters'
import type { ApiKeysetResponse, ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminProduct } from '@/core/types/api/admin/admin-product.type'
import type { MutationOptions } from '@/core/types/tanstack.type'
import { toggleProductIsDeleted } from '@/modules/admin/modules/products/api/admin-products.api'
import { ADMIN_PRODUCTS_FILTERS } from '@/modules/admin/modules/products/const/admin-products-injection-keys.const'
import { ADMIN_PRODUCTS_QUERY_KEYS } from '@/modules/admin/modules/products/const/admin-products-query-keys.const'
import type { ProductIdInput } from '@/modules/admin/modules/products/schemas/product-id.schema'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-toastflow'

export const useToggleProductIsDeleted = (
  options?: MutationOptions<ApiSuccessResponse<string>, ProductIdInput>,
) => {
  const queryClient = useQueryClient()
  const { filters } = useInjectFilters(ADMIN_PRODUCTS_FILTERS)

  return useMutation({
    ...options,
    onMutate: async (id) => {
      const queryKey = ADMIN_PRODUCTS_QUERY_KEYS.getAdminProducts(filters)

      await queryClient.cancelQueries({ queryKey: queryKey })
      const previousProducts = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: ApiKeysetResponse<AdminProduct>) => ({
        ...old,
        data: old.data.map((product) =>
          product.id === id ? { ...product, isDeleted: !product.isDeleted } : product,
        ),
      }))

      return { previousProducts }
    },
    mutationFn: (id: ProductIdInput) => toggleProductIsDeleted(id),
    onSuccess: (data, params, result, ctx) => {
      toast.success(data.data)
      options?.onSuccess?.(data, params, result, ctx)
    },
    onError: (error, params, result, ctx) => {
      if (result?.previousProducts) {
        queryClient.setQueryData(
          ADMIN_PRODUCTS_QUERY_KEYS.getAdminProducts(filters),
          result.previousProducts,
        )
      }

      options?.onError?.(error, params, result, ctx)
    },
  })
}
