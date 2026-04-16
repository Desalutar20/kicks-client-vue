import { type ApiSuccessResponse, http } from '@/core/api/api.ts'
import type { SignUpInput } from '@/modules/auth/schemas/sign-up.schema.ts'
import { apiEndpoints } from '@/core/api/api-endpoints.ts'
import type { User } from '@/core/types/user.type.ts'
import type { SignInInput } from '@/modules/auth/schemas/sign-in.schema.ts'
import type { VerifyAccountInput } from '@/modules/auth/schemas/verify-account.schema.ts'
import type { ForgotPasswordInput } from '@/modules/auth/schemas/forgot-password.schema.ts'
import type { ResetPasswordInput } from '@/modules/auth/schemas/reset-password.schema.ts'

export const signUp = async (data: SignUpInput) =>
  await http.post<ApiSuccessResponse<string>>(apiEndpoints.auth.signUp, { json: data }).json()

export const signIn = async (data: SignInInput) =>
  await http.post<ApiSuccessResponse<User>>(apiEndpoints.auth.signIn, { json: data }).json()

export const verifyAccount = async (data: VerifyAccountInput) =>
  await http
    .post<ApiSuccessResponse<string>>(apiEndpoints.auth.verifyAccount, { json: data })
    .json()

export const forgotPassword = async (data: ForgotPasswordInput) =>
  await http
    .post<ApiSuccessResponse<string>>(apiEndpoints.auth.forgotPassword, { json: data })
    .json()

export const resetPassword = async (data: Omit<ResetPasswordInput, 'newPasswordConfirm'>) =>
  await http
    .post<ApiSuccessResponse<string>>(apiEndpoints.auth.resetPassword, { json: data })
    .json()

export const getProfile = async () =>
  await http.get<ApiSuccessResponse<User>>(apiEndpoints.auth.getProfile).json()
