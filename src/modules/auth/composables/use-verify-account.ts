import { verifyAccount } from '@/modules/auth/api/auth.api.ts'
import type { VerifyAccountInput } from '@/modules/auth/schemas/verify-account.schema.ts'
import type { ApiSuccessResponse } from '@/core/lib/api.lib.ts'
import { toast } from 'vue-toastflow'
import type { MutationOptions } from '@/core/types/tanstack.type.ts'
import { useMutation } from '@tanstack/vue-query'

export const useVerifyAccount = (
  options?: MutationOptions<ApiSuccessResponse<string>, VerifyAccountInput>,
) => {
  return useMutation({
    ...options,
    mutationFn: (data: VerifyAccountInput) => verifyAccount(data),
    onSuccess: (data, params, result, ctx) => {
      toast.success(data.data)
      options?.onSuccess?.(data, params, result, ctx)
    },
  })
}
