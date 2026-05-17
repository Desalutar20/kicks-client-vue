import { useInjectFilters } from '@/core/composables/use-filters'
import type { ApiKeysetResponse, ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminProduct } from '@/core/types/api/admin/admin-product.type'
import type { MutationOptions } from '@/core/types/tanstack.type'
import { isObjectsEqualSimple } from '@/core/utils/objects.util'
import { setExternalErrors } from '@/core/utils/set-external-errors.util'
import {
  createProduct,
  updateProduct,
} from '@/modules/admin/modules/products/api/admin-products.api'
import { ADMIN_PRODUCTS_FILTERS } from '@/modules/admin/modules/products/const/admin-products-injection-keys.const'
import { ADMIN_PRODUCTS_QUERY_KEYS } from '@/modules/admin/modules/products/const/admin-products-query-keys.const'
import {
  createProductSchema,
  type CreateProductInput,
} from '@/modules/admin/modules/products/schemas/create-product.schema'
import {
  updateProductSchema,
  type UpdateProductInput,
} from '@/modules/admin/modules/products/schemas/update-product.schema'
import { useRegleSchema } from '@regle/schemas'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import { toast } from 'vue-toastflow'

export const useCreateUpdateProduct = (
  updateData?: UpdateProductInput,
  options?: {
    onSuccess?: () => void
    createOptions?: MutationOptions<ApiSuccessResponse<AdminProduct>, CreateProductInput>
    updateOptions?: MutationOptions<ApiSuccessResponse<AdminProduct>, UpdateProductInput>
  },
) => {
  const { r$ } = useRegleSchema(
    updateData
      ? {
          ...updateData,
          brandId: updateData.brandId ?? undefined,
          categoryId: updateData.categoryId ?? undefined,
        }
      : {
          title: '',
          description: '',
          gender: undefined,
          tags: [],
          brandId: undefined,
          categoryId: undefined,
        },
    updateData ? updateProductSchema : createProductSchema,
  )

  const newTag = ref('')

  const queryClient = useQueryClient()
  const { filters, resetFilters } = useInjectFilters(ADMIN_PRODUCTS_FILTERS)

  const defaultLimit = 40

  const { mutate, isPending } = useMutation({
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

      options?.createOptions?.onSuccess?.(data, params, result, ctx)
    },
    onError: (error, params, result, ctx) => {
      setExternalErrors(error, r$)
      options?.createOptions?.onError?.(error, params, result, ctx)
    },
  })

  const { mutate: updateMutate, isPending: isUpdatePending } = useMutation({
    ...options,
    mutationFn: (data: UpdateProductInput) => updateProduct(data),
    onMutate: async ({ id, ...rest }) => {
      const queryKey = ADMIN_PRODUCTS_QUERY_KEYS.getAdminProducts(filters)

      await queryClient.cancelQueries({ queryKey: queryKey })
      const previousProducts = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: ApiKeysetResponse<AdminProduct>) => ({
        ...old,
        data: old.data.map((product) => (product.id === id ? { ...product, ...rest } : product)),
      }))

      return { previousProducts }
    },
    onSuccess: (data, params, result, ctx) => {
      toast.success(data.data)
      options?.updateOptions?.onSuccess?.(data, params, result, ctx)
    },
    onError: (error, params, result, ctx) => {
      if (result?.previousProducts) {
        queryClient.setQueryData(
          ADMIN_PRODUCTS_QUERY_KEYS.getAdminProducts(filters),
          result?.previousProducts,
        )
      }

      setExternalErrors(error, r$)
      options?.updateOptions?.onError?.(error, params, result, ctx)
    },
  })

  const onSubmit = () => {
    if (r$.$dirty) return

    if (r$.$value.id) {
      updateMutate(r$.$value as UpdateProductInput)
    } else {
      mutate(r$.$value as CreateProductInput)
    }

    r$.$reset({
      toInitialState: true,
    })

    options?.onSuccess?.()
  }

  const addTag = () => {
    if (!newTag.value) return

    const exists = r$.$value.tags!.includes(newTag.value)

    if (!exists) {
      r$.$value.tags = [...r$.$value.tags!, newTag.value]
    }

    newTag.value = ''
  }

  const noChanges = computed(() =>
    !updateData ? false : isObjectsEqualSimple(r$.$value, updateData),
  )

  return {
    r$,
    onSubmit,
    isPending: computed(() => isPending.value || isUpdatePending.value),
    noChanges: noChanges,
    newTag,
    addTag,
  }
}
