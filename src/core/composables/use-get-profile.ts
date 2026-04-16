import { useQuery } from '@pinia/colada'
import type { QueryOptions } from '@/core/types/pinia.type.ts'
import { getProfile } from '@/modules/auth/api/auth.api.ts'
import type { User } from '@/core/types/user.type.ts'
import type { ApiSuccessResponse } from '@/core/api/api.ts'
import { computed } from 'vue'
import { QUERY_KEYS } from '@/core/const/query-keys.const.ts'

export const useGetProfile = (options?: QueryOptions<ApiSuccessResponse<User>>) => {
  const query = useQuery({
    ...options,
    key: QUERY_KEYS.getProfile,
    query: () => getProfile(),
  })

  const user = computed(() => query.data.value?.data ?? null)

  return {
    ...query,
    user,
  }
}
