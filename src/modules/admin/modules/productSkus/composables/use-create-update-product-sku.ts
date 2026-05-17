import type { ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminProductSku } from '@/core/types/api/admin/admin-product.type'
import type { MutationOptions } from '@/core/types/tanstack.type'
import { getChangedFields } from '@/core/utils/objects.util'
import { setExternalErrors } from '@/core/utils/set-external-errors.util'
import type { ProductIdInput } from '@/modules/admin/modules/products/schemas/product-id.schema'
import {
  createProductSku,
  updateProductSku,
} from '@/modules/admin/modules/productSkus/api/admin-product-skus.api'

import { ADMIN_PRODUCT_SKUS_QUERY_KEYS } from '@/modules/admin/modules/productSkus/const/admin-product-skus-query-keys.const'
import {
  createProductSkuSchema,
  type CreateProductSkuInput,
} from '@/modules/admin/modules/productSkus/schemas/create-product-sku.schema'
import {
  updateProductSkuSchema,
  type UpdateProductSkuInput,
} from '@/modules/admin/modules/productSkus/schemas/update-product-sku.schema'
import { useRegleSchema } from '@regle/schemas'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'
import { toast } from 'vue-toastflow'

export const useCreateUpdateProductSku = (
  action: { type: 'create'; data: ProductIdInput } | { type: 'update'; data: AdminProductSku },
  options?: {
    onSuccess?: () => void
    createOptions?: MutationOptions<
      ApiSuccessResponse<AdminProductSku['id']>,
      CreateProductSkuInput
    >
    updateOptions?: MutationOptions<ApiSuccessResponse<AdminProductSku>, UpdateProductSkuInput>
  },
) => {
  const { r$ } = useRegleSchema(
    action.type === 'create'
      ? {
          productId: action.data,
          price: 0,
          salePrice: 0,
          quantity: 0,
          size: 0,
          color: '',
          sku: '',
          images: [],
        }
      : {
          id: action.data.id,
          price: action.data.price,
          salePrice: action.data.salePrice ?? undefined,
          quantity: action.data.quantity,
          size: action.data.size,
          color: action.data.color,
          sku: action.data.sku,
          images: undefined,
        },
    action.type === 'create' ? createProductSkuSchema : updateProductSkuSchema,
  )

  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    ...options,
    mutationFn: (data: CreateProductSkuInput) => createProductSku(data),
    onSuccess: (data, params, result, ctx) => {
      queryClient.resetQueries({
        queryKey: ADMIN_PRODUCT_SKUS_QUERY_KEYS.all,
      })
      toast.success('Success')

      options?.createOptions?.onSuccess?.(data, params, result, ctx)
    },
    onError: (error, params, result, ctx) => {
      setExternalErrors(error, r$)
      options?.createOptions?.onError?.(error, params, result, ctx)
    },
  })

  const { mutateAsync: updateMutateAsync, isPending: isUpdatePending } = useMutation({
    ...options,
    mutationFn: (data: UpdateProductSkuInput) => updateProductSku(data),
    onSuccess: (data, params, result, ctx) => {
      queryClient.resetQueries({
        queryKey: ADMIN_PRODUCT_SKUS_QUERY_KEYS.all,
      })

      queryClient.setQueryData(ADMIN_PRODUCT_SKUS_QUERY_KEYS.getAdminProductSku(data.data.id), data)

      toast.success('Success')

      r$.$value = {
        id: data.data.id,
        price: data.data.price,
        salePrice: data.data.salePrice ?? undefined,
        quantity: data.data.quantity,
        size: data.data.size,
        color: data.data.color,
        sku: data.data.sku,
        images: undefined,
      }

      options?.updateOptions?.onSuccess?.(data, params, result, ctx)
    },
    onError: (error, params, result, ctx) => {
      setExternalErrors(error, r$)
      options?.updateOptions?.onError?.(error, params, result, ctx)
    },
  })

  const onSubmit = async () => {
    if (r$.$dirty) return

    if (action.type === 'create') {
      await mutateAsync(r$.$value as CreateProductSkuInput)
    } else {
      await updateMutateAsync({
        ...(getChangedFields(r$.$value, action.data) as UpdateProductSkuInput),
        id: action.data.id,
      })
    }

    options?.onSuccess?.()

    if (action.type === 'create') {
      r$.$reset({
        toInitialState: true,
      })
    }
  }

  const noChanges = computed(() => {
    if (action.type === 'create') return false
    const { data } = action

    return (
      Number(r$.price.$value) === data.price &&
      Number(r$.salePrice.$value) === (data.salePrice ?? undefined) &&
      Number(r$.quantity.$value) === data.quantity &&
      Number(r$.size.$value) === data.size &&
      r$.color.$value === data.color &&
      r$.sku.$value === data.sku &&
      (r$.images?.$value === undefined || r$.images.$value.length === 0)
    )
  })

  return {
    r$,
    onSubmit,
    isPending: computed(() => isPending.value || isUpdatePending.value),
    noChanges,
  }
}
