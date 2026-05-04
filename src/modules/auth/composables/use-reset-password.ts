import { useRegleSchema } from '@regle/schemas'
import { setExternalErrors } from '@/core/utils/set-external-errors.util.ts'
import { resetPassword } from '@/modules/auth/api/auth.api.ts'
import {
  type ResetPasswordInput,
  resetPasswordSchema,
} from '@/modules/auth/schemas/reset-password.schema.ts'
import { toast } from 'vue-toastflow'
import type { ApiSuccessResponse } from '@/core/lib/api.lib.ts'
import type { MutationOptions } from '@/core/types/tanstack.type.ts'
import { useMutation } from '@tanstack/vue-query'

export const useResetPassword = (
  data: Pick<ResetPasswordInput, 'token' | 'email'>,
  options?: MutationOptions<ApiSuccessResponse<string>, ResetPasswordInput>,
) => {
  const { r$ } = useRegleSchema(
    {
      email: data.email,
      token: data.token,
      newPassword: '',
      newPasswordConfirm: '',
    },
    resetPasswordSchema,
  )

  return {
    r$,
    mutation: useMutation({
      ...options,
      mutationFn: (data: ResetPasswordInput) => resetPassword(data),
      onSuccess: (data, params, result, ctx) => {
        toast.success('Your password has been updated. You can now log in with the new one')
        options?.onSuccess?.(data, params, result, ctx)
      },
      onError: (error, params, result, ctx) => {
        setExternalErrors(error, r$)
        options?.onError?.(error, params, result, ctx)
      },
    }),
  }
}
