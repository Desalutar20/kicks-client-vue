import { useInjectFilters } from '@/core/composables/use-filters'
import type { ApiKeysetResponse, ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminUser } from '@/core/types/api/admin/admin-user.type'
import type { MutationOptions } from '@/core/types/tanstack.type'
import { deleteUser } from '@/modules/admin/modules/users/api/admin-users.api'
import { ADMIN_USERS_FILTERS } from '@/modules/admin/modules/users/const/admin-users-injection-keys.const'
import { ADMIN_USERS_QUERY_KEYS } from '@/modules/admin/modules/users/const/admin-users-query-keys.const'
import type { UserIdInput } from '@/modules/admin/modules/users/schemas/user-id.schema'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-toastflow'

export const useDeleteUser = (
  options?: MutationOptions<ApiSuccessResponse<string>, UserIdInput>,
) => {
  const queryClient = useQueryClient()
  const { filters, resetFilters } = useInjectFilters(ADMIN_USERS_FILTERS)

  return useMutation({
    ...options,
    onMutate: async (id) => {
      const queryKey = ADMIN_USERS_QUERY_KEYS.getAdminUsers(filters)

      await queryClient.cancelQueries({ queryKey: queryKey })
      const previousUsers = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: ApiKeysetResponse<AdminUser>) => ({
        ...old,
        data: old.data.filter((user) => user.id !== id),
      }))

      return { previousUsers }
    },
    mutationFn: (id: UserIdInput) => deleteUser(id),
    onSuccess: (data, params, result, ctx) => {
      const current = queryClient.getQueryData<ApiKeysetResponse<AdminUser>>(
        ADMIN_USERS_QUERY_KEYS.getAdminUsers(filters),
      )

      if (current && current.data.length === 0 && current.prevCursor) {
        resetFilters()
      }

      toast.success(data.data)
      options?.onSuccess?.(data, params, result, ctx)
    },
    onError: (error, params, result, ctx) => {
      if (result?.previousUsers) {
        queryClient.setQueryData(
          ADMIN_USERS_QUERY_KEYS.getAdminUsers(filters),
          result?.previousUsers,
        )
      }

      options?.onError?.(error, params, result, ctx)
    },
  })
}
