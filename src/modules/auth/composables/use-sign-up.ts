import { type SignUpInput, signUpSchema } from '@/modules/auth/schemas/sign-up.schema.ts'
import { signUp } from '@/modules/auth/api/auth.api.ts'
import { toast } from 'vue-toastflow'
import { setExternalErrors } from '@/core/utils/set-external-errors.util.ts'
import { useRegleSchema } from '@regle/schemas'
import { useMutation } from '@tanstack/vue-query'
import type { MutationOptions } from '@/core/types/tanstack.type.ts'
import type { ApiSuccessResponse } from '@/core/lib/api.lib.ts'

export const useSignUp = (options?: MutationOptions<ApiSuccessResponse<string>, SignUpInput>) => {
  const { r$ } = useRegleSchema(
    {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    signUpSchema,
  )

  return {
    r$,
    mutation: useMutation({
      ...options,
      mutationFn: (data: SignUpInput) => signUp(data),
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
