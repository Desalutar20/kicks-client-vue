import { useInjectFilters } from '@/core/composables/use-filters'
import type { ApiKeysetResponse, ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminBrand } from '@/core/types/api/admin/admin-brand.type'
import type { MutationOptions } from '@/core/types/tanstack.type'
import { createBrand, updateBrand } from '@/modules/admin/modules/brands/api/admin-brands.api'
import { ADMIN_BRANDS_FILTERS } from '@/modules/admin/modules/brands/const/admin-brands-injection-keys.const'
import { ADMIN_BRANDS_QUERY_KEYS } from '@/modules/admin/modules/brands/const/admin-brands-query-keys.const'
import {
  createBrandSchema,
  type CreateBrandInput,
} from '@/modules/admin/modules/brands/schemas/create-brand.schema'
import {
  updateBrandSchema,
  type UpdateBrandInput,
} from '@/modules/admin/modules/brands/schemas/update-brand.schema'
import { ADMIN_PRODUCTS_QUERY_KEYS } from '@/modules/admin/modules/products/const/admin-products-query-keys.const'
import { useRegleSchema } from '@regle/schemas'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'
import { toast } from 'vue-toastflow'

export const useCreateUpdateBrand = (
  updateData?: UpdateBrandInput,
  options?: {
    onSuccess?: () => void
    createOptions?: MutationOptions<ApiSuccessResponse<AdminBrand>, CreateBrandInput>
    updateOptions?: MutationOptions<ApiSuccessResponse<string>, UpdateBrandInput>
  },
) => {
  const { r$ } = useRegleSchema(
    updateData ? { ...updateData } : {},
    updateData ? updateBrandSchema : createBrandSchema,
  )

  const queryClient = useQueryClient()
  const { filters, resetFilters } = useInjectFilters(ADMIN_BRANDS_FILTERS)

  const defaultLimit = 40

  const { mutate, isPending } = useMutation({
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

      queryClient.resetQueries({
        queryKey: ADMIN_PRODUCTS_QUERY_KEYS.getAdminProductFilterOptions(),
      })

      options?.createOptions?.onSuccess?.(data, params, result, ctx)
    },
  })

  const { mutate: updateMutate, isPending: isUpdatePending } = useMutation({
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
      options?.updateOptions?.onSuccess?.(data, params, result, ctx)
    },
    onError: (error, params, result, ctx) => {
      if (result?.previousBrands) {
        queryClient.setQueryData(
          ADMIN_BRANDS_QUERY_KEYS.getAdminBrands(filters),
          result?.previousBrands,
        )
      }

      options?.updateOptions?.onError?.(error, params, result, ctx)
    },
  })

  const onSubmit = () => {
    if (r$.$invalid) return

    if ('id' in r$.$value) {
      updateMutate(r$.$value as UpdateBrandInput)
    } else {
      mutate(r$.$value)
    }

    r$.$reset({
      toInitialState: true,
    })

    options?.onSuccess?.()
  }

  return {
    r$,
    onSubmit,
    isPending: computed(() => isPending.value || isUpdatePending.value),
  }
}
