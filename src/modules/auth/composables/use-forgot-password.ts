import { useRegleSchema } from '@regle/schemas'
import { useMutation } from '@pinia/colada'
import { setExternalErrors } from '@/core/utils/set-external-errors.util.ts'
import { type ForgotPasswordInput, forgotPasswordSchema } from '@/modules/auth/schemas/forgot-password.schema.ts'
import { forgotPassword } from '@/modules/auth/api/auth.api.ts'
import { toast } from 'vue-toastflow'
import type { MutationOptions } from '@/core/types/pinia.type.ts'
import type { ApiSuccessResponse } from '@/core/api/api.ts'

export const useForgotPassword = (
  options?: MutationOptions<ApiSuccessResponse<string>, ForgotPasswordInput>,
) => {
  const { r$ } = useRegleSchema(
    {
      email: '',
    },
    forgotPasswordSchema,
  )

  return {
    r$,
    mutation: useMutation({
      ...options,
      mutation: (data: ForgotPasswordInput) => forgotPassword(data),
      onSuccess: (data, vars, ctx) => {
        toast.success('Success', { description: data.data })
        options?.onSuccess?.(data, vars, ctx)
      },
      onError: (error, vars, ctx) => {
        setExternalErrors(error, r$)
        options?.onError?.(error, vars, ctx)
      },
    }),
  }
}
