import { useMutation } from '@pinia/colada'
import { type SignUpInput, signUpSchema } from '@/modules/auth/schemas/sign-up.schema.ts'
import { signUp } from '@/modules/auth/api/auth.api.ts'
import { toast } from 'vue-toastflow'
import { setExternalErrors } from '@/core/utils/set-external-errors.util.ts'
import { useRegleSchema } from '@regle/schemas'
import type { MutationOptions } from '@/core/types/pinia.type.ts'
import type { ApiSuccessResponse } from '@/core/api/api.ts'

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
      mutation: (data: SignUpInput) => signUp(data),
      onSuccess: (data, vars, ctx) => {
        toast.success(data.data)
        options?.onSuccess?.(data, vars, ctx)
      },
      onError: (error, vars, ctx) => {
        setExternalErrors(error, r$)
        options?.onError?.(error, vars, ctx)
      },
    }),
  }
}
