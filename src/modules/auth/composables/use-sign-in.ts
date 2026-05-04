import { signIn } from '@/modules/auth/api/auth.api.ts'
import { useRegleSchema } from '@regle/schemas'
import { type SignInInput, signInSchema } from '@/modules/auth/schemas/sign-in.schema.ts'
import type { User } from '@/core/types/api/user.type'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { MutationOptions } from '@/core/types/tanstack.type.ts'
import { QUERY_KEYS } from '@/core/const/query-keys.const.ts'
import { setExternalErrors } from '@/core/utils/set-external-errors.util.ts'
import type { ApiSuccessResponse } from '@/core/lib/api.lib.ts'

export const useSignIn = (options?: MutationOptions<ApiSuccessResponse<User>, SignInInput>) => {
  const queryClient = useQueryClient()
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
      mutationFn: (data: SignInInput) => signIn(data),
      onError: (error, params, result, ctx) => {
        setExternalErrors(error, r$)
        options?.onError?.(error, params, result, ctx)
      },
      onSuccess: (data, params, result, ctx) => {
        queryClient.setQueryData(QUERY_KEYS.getProfile, data)
        options?.onSuccess?.(data, params, result, ctx)
      },
    }),
  }
}
