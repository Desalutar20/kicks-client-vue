import { isHTTPError } from 'ky'
import { type ApiErrorResponse, isApiError } from '@/core/api/api.ts'
import { toast } from 'vue-toastflow'

export const handleApiError = (error: unknown, disabled?: (err: ApiErrorResponse) => boolean) => {
  if (isHTTPError(error) && isApiError(error.data) && !error.data.errors) {
    if (disabled?.(error.data)) return

    return toast.error(error.data.detail ?? error.data.title)
  }

  if (error instanceof Error) {
    return toast.error(error.message)
  }

  console.log(error)
}
