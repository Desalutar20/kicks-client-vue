import { API_ENDPOINTS } from '@/core/const/api-endpoints.const'
import { http, type ApiKeysetResponse, type ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminUser } from '@/core/types/api/admin/admin-user.type'
import { buildQueryParams } from '@/core/utils/build-query-params.util'
import type { GetAdminUsersInput } from '@/modules/admin/modules/users/schemas/get-admin-users.schema'
import type { UserIdInput } from '@/modules/admin/modules/users/schemas/user-id.schema'

export const getAdminUsers = async (query: GetAdminUsersInput) => {
  const params = buildQueryParams(query).toString()
  const path = params ? `${API_ENDPOINTS.admin.getUsers}?${params}` : API_ENDPOINTS.admin.getUsers

  return await http.get<ApiKeysetResponse<AdminUser>>(path).json()
}

export const toggleBanUser = async (id: UserIdInput) => {
  return await http
    .post<ApiSuccessResponse<string>>(API_ENDPOINTS.admin.toggleBanUser(id.toString()))
    .json()
}

export const deleteUser = async (id: UserIdInput) => {
  return await http
    .delete<ApiSuccessResponse<string>>(API_ENDPOINTS.admin.deleteUser(id.toString()))
    .json()
}
