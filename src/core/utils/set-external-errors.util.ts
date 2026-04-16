import type { InferRegleRoot, SuperCompatibleRegle } from '@regle/core'
import { isHTTPError } from 'ky'
import { isApiError } from '@/core/api/api.ts'

export const setExternalErrors = <T extends (...args: unknown[]) => SuperCompatibleRegle>(
  error: unknown,
  r$?: InferRegleRoot<T>,
) => {
  if (isHTTPError(error) && isApiError(error.data) && error.data.errors !== undefined) {
    r$?.$setExternalErrors(error.data.errors)
  }
}
