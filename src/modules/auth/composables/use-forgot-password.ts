import { useRegleSchema } from '@regle/schemas'
import { setExternalErrors } from '@/core/utils/set-external-errors.util.ts'
import {
  type ForgotPasswordInput,
  forgotPasswordSchema,
} from '@/modules/auth/schemas/forgot-password.schema.ts'
import { forgotPassword } from '@/modules/auth/api/auth.api.ts'
import { toast } from 'vue-toastflow'
import type { ApiSuccessResponse } from '@/core/lib/api.lib.ts'
import type { MutationOptions } from '@/core/types/tanstack.type.ts'
import { useMutation } from '@tanstack/vue-query'

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
      mutationFn: (data: ForgotPasswordInput) => forgotPassword(data),
      onSuccess: (data, params, result, ctx) => {
        toast.success(data.data)
        options?.onSuccess?.(data, params, result, ctx)
      },
      onError: (error, params, result, ctx) => {
        setExternalErrors(error, r$)
        options?.onError?.(error, params, result, ctx)
      },
    }),
  }
}
