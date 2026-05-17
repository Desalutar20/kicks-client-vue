import type { ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminProductSku } from '@/core/types/api/admin/admin-product.type'
import type { MutationOptions } from '@/core/types/tanstack.type'
import { deleteProductSkuImage } from '@/modules/admin/modules/productSkus/api/admin-product-skus.api'
import { ADMIN_PRODUCT_SKUS_QUERY_KEYS } from '@/modules/admin/modules/productSkus/const/admin-product-skus-query-keys.const'
import type { ProductSkuIdInput } from '@/modules/admin/modules/productSkus/schemas/product-sku-id.schema'
import type { ProductSkuImageIdInput } from '@/modules/admin/modules/productSkus/schemas/product-sku-image-id.schema'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-toastflow'

export const useDeleteProductSkuImage = (
  options?: MutationOptions<
    ApiSuccessResponse<string>,
    { id: ProductSkuIdInput; imageId: ProductSkuImageIdInput }
  >,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: ({ id, imageId }: { id: ProductSkuIdInput; imageId: ProductSkuImageIdInput }) =>
      deleteProductSkuImage(id, imageId),

    onMutate: async ({ id, imageId }) => {
      const queryKey = ADMIN_PRODUCT_SKUS_QUERY_KEYS.getAdminProductSku(id)

      await queryClient.cancelQueries({ queryKey: queryKey })
      const previousProductSku: AdminProductSku | undefined = queryClient.getQueryData(queryKey)

      if (previousProductSku?.images.length === 0) return

      queryClient.setQueryData(queryKey, (old: ApiSuccessResponse<AdminProductSku>) => ({
        data: { ...old.data, images: old.data.images.filter((image) => image.id !== imageId) },
      }))

      return { previousProductSku }
    },
    onError: (error, params, result, ctx) => {
      if (result?.previousProductSku) {
        queryClient.setQueryData(
          ADMIN_PRODUCT_SKUS_QUERY_KEYS.getAdminProductSku(params.id),
          result.previousProductSku,
        )
      }

      options?.onError?.(error, params, result, ctx)
    },

    onSuccess: (data, params, result, ctx) => {
      toast.success(data.data)
      options?.onSuccess?.(data, params, result, ctx)
    },
  })
}
