import type { GetAdminUsersInput } from '@/modules/admin/modules/users/schemas/get-admin-users.schema'

export const ADMIN_USERS_QUERY_KEYS = {
  getAdminUsers: (filters: GetAdminUsersInput) => ['adminUsers', filters] as const,
} as const
