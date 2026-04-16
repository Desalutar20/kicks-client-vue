import { useMutation } from '@pinia/colada'
import { verifyAccount } from '@/modules/auth/api/auth.api.ts'
import type { VerifyAccountInput } from '@/modules/auth/schemas/verify-account.schema.ts'
import type { ApiSuccessResponse } from '@/core/api/api.ts'
import type { MutationOptions } from '@/core/types/pinia.type.ts'
import { toast } from 'vue-toastflow'

export const useVerifyAccount = (
  options?: MutationOptions<ApiSuccessResponse<string>, VerifyAccountInput>,
) => {
  return useMutation({
    ...options,
    mutation: (data: VerifyAccountInput) => verifyAccount(data),
    onSuccess: (data, vars, ctx) => {
      toast.success('Success', { description: data.data })
      options?.onSuccess?.(data, vars, ctx)
    },
  })
}
