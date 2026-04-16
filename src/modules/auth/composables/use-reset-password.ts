import { useRegleSchema } from '@regle/schemas'
import { useMutation } from '@pinia/colada'
import { setExternalErrors } from '@/core/utils/set-external-errors.util.ts'
import { resetPassword } from '@/modules/auth/api/auth.api.ts'
import {
  type ResetPasswordInput,
  resetPasswordSchema,
} from '@/modules/auth/schemas/reset-password.schema.ts'
import { toast } from 'vue-toastflow'
import type { MutationOptions } from '@/core/types/pinia.type.ts'
import type { ApiSuccessResponse } from '@/core/api/api.ts'

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
      mutation: (data: ResetPasswordInput) => resetPassword(data),
      onSuccess: (data, vars, ctx) => {
        toast.success('Success', {
          description: 'Your password has been updated. You can now log in with the new one',
        })
        options?.onSuccess?.(data, vars, ctx)
      },
      onError: (error, vars, ctx) => {
        setExternalErrors(error, r$)
        options?.onError?.(error, vars, ctx)
      },
    }),
  }
}
