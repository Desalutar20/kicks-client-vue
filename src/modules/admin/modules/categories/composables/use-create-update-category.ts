import { useInjectFilters } from '@/core/composables/use-filters'
import type { ApiKeysetResponse, ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminCategory } from '@/core/types/api/admin/admin-category.type'
import type { MutationOptions } from '@/core/types/tanstack.type'

import {
  createCategory,
  updateCategory,
} from '@/modules/admin/modules/categories/api/admin-categories.api'
import { ADMIN_CATEGORIES_FILTERS } from '@/modules/admin/modules/categories/const/admin-categories-injection-keys.const'
import { ADMIN_CATEGORIES_QUERY_KEYS } from '@/modules/admin/modules/categories/const/admin-categories-query-keys.const'
import {
  createCategorySchema,
  type CreateCategoryInput,
} from '@/modules/admin/modules/categories/schemas/create-category.schema'
import {
  updateCategorySchema,
  type UpdateCategoryInput,
} from '@/modules/admin/modules/categories/schemas/update-category.schema'
import { ADMIN_PRODUCTS_QUERY_KEYS } from '@/modules/admin/modules/products/const/admin-products-query-keys.const'
import { useRegleSchema } from '@regle/schemas'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'
import { toast } from 'vue-toastflow'

export const useCreateUpdateCategory = (
  updateData?: UpdateCategoryInput,
  options?: {
    onSuccess?: () => void
    createOptions?: MutationOptions<ApiSuccessResponse<AdminCategory>, CreateCategoryInput>
    updateOptions?: MutationOptions<ApiSuccessResponse<string>, UpdateCategoryInput>
  },
) => {
  const { r$ } = useRegleSchema(
    updateData ? { ...updateData } : {},
    updateData ? updateCategorySchema : createCategorySchema,
  )

  const queryClient = useQueryClient()
  const { filters, resetFilters } = useInjectFilters(ADMIN_CATEGORIES_FILTERS)

  const defaultLimit = 40

  const { mutate, isPending } = useMutation({
    ...options,
    mutationFn: (data: CreateCategoryInput) => createCategory(data),
    onSuccess: (data, params, result, ctx) => {
      resetFilters()

      queryClient.setQueryData(
        ADMIN_CATEGORIES_QUERY_KEYS.getAdminCategories({}),
        (old: ApiKeysetResponse<AdminCategory>) => {
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
    mutationFn: (data: UpdateCategoryInput) => updateCategory(data),
    onMutate: async ({ id, name }) => {
      const queryKey = ADMIN_CATEGORIES_QUERY_KEYS.getAdminCategories(filters)

      await queryClient.cancelQueries({ queryKey: queryKey })
      const previousCategories = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: ApiKeysetResponse<AdminCategory>) => ({
        ...old,
        data: old.data.map((category) => (category.id === id ? { ...category, name } : category)),
      }))

      return { previousCategories }
    },
    onSuccess: (data, params, result, ctx) => {
      toast.success(data.data)
      options?.updateOptions?.onSuccess?.(data, params, result, ctx)
    },
    onError: (error, params, result, ctx) => {
      if (result?.previousCategories) {
        queryClient.setQueryData(
          ADMIN_CATEGORIES_QUERY_KEYS.getAdminCategories(filters),
          result?.previousCategories,
        )
      }

      options?.updateOptions?.onError?.(error, params, result, ctx)
    },
  })

  const onSubmit = () => {
    if (r$.$invalid) return

    if ('id' in r$.$value) {
      updateMutate(r$.$value as UpdateCategoryInput)
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
