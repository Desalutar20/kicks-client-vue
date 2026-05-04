import { MutationCache, partialMatchKey, QueryCache, QueryClient } from '@tanstack/vue-query'
import { isApiError } from '@/core/lib/api.lib.ts'
import { isHTTPError } from 'ky'
import { QUERY_KEYS } from '@/core/const/query-keys.const.ts'
import { handleApiError } from '@/core/utils/handle-api-error.util.ts'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err, query) => {
      if (
        isHTTPError(err) &&
        isApiError(err.data) &&
        err.data.status === 401 &&
        partialMatchKey(query.queryKey, QUERY_KEYS.getProfile)
      )
        return

      handleApiError(err)
    },
  }),
  mutationCache: new MutationCache({
    onError: (err) => {
      handleApiError(err)
    },
  }),
  defaultOptions: {
    queries: {
      placeholderData: (prev) => prev,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
})
