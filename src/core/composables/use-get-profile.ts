import { getProfile } from '@/modules/auth/api/auth.api.ts'
import { QUERY_KEYS } from '@/core/const/query-keys.const.ts'
import type { ApiSuccessResponse } from '@/core/lib/api.lib.ts'
import type { User } from '@/core/types/api/user.type'
import type { QueryOptions } from '@/core/types/tanstack.type.ts'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

export const useGetProfile = (
  options?: Omit<QueryOptions<ApiSuccessResponse<User>>, 'retry' | 'select' | 'retryOnMount'>,
) => {
  const query = useQuery({
    ...options,
    queryKey: QUERY_KEYS.getProfile,
    queryFn: () => getProfile(),
    select: (data) => data.data,
    retry: false,
    retryOnMount: false,
  })

  const user = computed(() => query.data.value ?? null)

  return {
    ...query,
    user,
  }
}
