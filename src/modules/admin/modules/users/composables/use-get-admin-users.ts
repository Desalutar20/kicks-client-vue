import type { ApiKeysetResponse } from '@/core/lib/api.lib'
import type { AdminUser } from '@/core/types/api/admin/admin-user.type'
import type { QueryOptions } from '@/core/types/tanstack.type'
import { getAdminUsers } from '@/modules/admin/modules/users/api/admin-users.api'
import { ADMIN_USERS_QUERY_KEYS } from '@/modules/admin/modules/users/const/admin-users-query-keys.const'
import type { GetAdminUsersInput } from '@/modules/admin/modules/users/schemas/get-admin-users.schema'
import { useQuery } from '@tanstack/vue-query'
import { toValue, type MaybeRefOrGetter } from 'vue'

export const useGetAdminUsers = (
  input: MaybeRefOrGetter<GetAdminUsersInput>,
  options?: QueryOptions<ApiKeysetResponse<AdminUser>>,
) => {
  return useQuery({
    ...options,
    queryKey: ADMIN_USERS_QUERY_KEYS.getAdminUsers(toValue(input)),
    queryFn: () => getAdminUsers(toValue(input)),
  })
}
