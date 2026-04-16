import { useMutation } from '@pinia/colada'
import { signIn } from '@/modules/auth/api/auth.api.ts'
import { setExternalErrors } from '@/core/utils/set-external-errors.util.ts'
import { useRegleSchema } from '@regle/schemas'
import { type SignInInput, signInSchema } from '@/modules/auth/schemas/sign-in.schema.ts'
import type { MutationOptions } from '@/core/types/pinia.type.ts'
import type { ApiSuccessResponse } from '@/core/api/api.ts'
import type { User } from '@/core/types/user.type.ts'

export const useSignIn = (options?: MutationOptions<ApiSuccessResponse<User>, SignInInput>) => {
  const { r$ } = useRegleSchema(
    {
      email: '',
      password: '',
    },
    signInSchema,
  )

  return {
    r$,
    mutation: useMutation({
      ...options,
      mutation: (data: SignInInput) => signIn(data),
      onError: (error, vars, ctx) => {
        setExternalErrors(error, r$)
        options?.onError?.(error, vars, ctx)
      },
    }),
  }
}
