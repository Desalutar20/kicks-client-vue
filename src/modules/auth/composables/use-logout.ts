import type { MutationOptions } from '@/core/types/tanstack.type.ts'
import type { ApiSuccessResponse } from '@/core/lib/api.lib.ts'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { logout } from '@/modules/auth/api/auth.api.ts'
import { QUERY_KEYS } from '@/core/const/query-keys.const.ts'

export const useLogout = (options?: MutationOptions<ApiSuccessResponse<string>>) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: () => logout(),
    onSuccess: (data, params, result, ctx) => {
      queryClient.setQueryData(QUERY_KEYS.getProfile, null)
      options?.onSuccess?.(data, params, result, ctx)
    },
  })
}
