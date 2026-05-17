import type { ApiSuccessResponse } from '@/core/lib/api.lib'
import type { MutationOptions } from '@/core/types/tanstack.type'
import { deleteProductSku } from '@/modules/admin/modules/productSkus/api/admin-product-skus.api'
import { ADMIN_PRODUCT_SKUS_QUERY_KEYS } from '@/modules/admin/modules/productSkus/const/admin-product-skus-query-keys.const'
import type { ProductSkuIdInput } from '@/modules/admin/modules/productSkus/schemas/product-sku-id.schema'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useConfirm } from 'primevue'
import { toast } from 'vue-toastflow'

export const useDeleteProductSku = (
  id: ProductSkuIdInput,
  options?: MutationOptions<ApiSuccessResponse<string>, ProductSkuIdInput>,
) => {
  const queryClient = useQueryClient()

  const confirm = useConfirm()

  const { mutate, ...rest } = useMutation({
    ...options,
    mutationFn: (id: ProductSkuIdInput) => deleteProductSku(id),
    onSuccess: (data, params, result, ctx) => {
      queryClient.resetQueries({
        queryKey: ADMIN_PRODUCT_SKUS_QUERY_KEYS.all,
      })

      toast.success(data.data)
      options?.onSuccess?.(data, params, result, ctx)
    },
  })

  const confirmDeleteProductSku = () => {
    confirm.require({
      header: 'Delete product sku?',
      message: 'This action will permanently delete the product sku and cannot be undone.',
      rejectProps: {
        label: 'Cancel',
        outlined: true,
      },
      acceptProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        mutate(id)
      },
    })
  }

  return {
    handleDelete: confirmDeleteProductSku,
    ...rest,
  }
}
