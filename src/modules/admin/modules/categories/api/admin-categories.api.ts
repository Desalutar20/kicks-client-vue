import { API_ENDPOINTS } from '@/core/const/api-endpoints.const'
import { http, type ApiKeysetResponse, type ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminCategory } from '@/core/types/api/admin/admin-category.type'
import { buildQueryParams } from '@/core/utils/query-params.util'

import type { CategoryIdInput } from '@/modules/admin/modules/categories/schemas/category-id.schema'
import type { CreateCategoryInput } from '@/modules/admin/modules/categories/schemas/create-category.schema'
import type { GetAdminCategoriesInput } from '@/modules/admin/modules/categories/schemas/get-admin-categories.schema'
import type { UpdateCategoryInput } from '@/modules/admin/modules/categories/schemas/update-category.schema'

export const getAdminCategories = async (query: GetAdminCategoriesInput) => {
  const params = buildQueryParams(query).toString()
  const path = params
    ? `${API_ENDPOINTS.admin.getCategories}?${params}`
    : API_ENDPOINTS.admin.getCategories

  return await http.get<ApiKeysetResponse<AdminCategory>>(path).json()
}

export const createCategory = async (data: CreateCategoryInput) =>
  await http
    .post<ApiSuccessResponse<AdminCategory>>(API_ENDPOINTS.admin.createCategory, { json: data })
    .json()

export const updateCategory = async (data: UpdateCategoryInput) =>
  await http
    .patch<ApiSuccessResponse<string>>(API_ENDPOINTS.admin.updateCategory(data.id), {
      json: { name: data.name },
    })
    .json()

export const deleteCategory = async (id: CategoryIdInput) =>
  await http.delete<ApiSuccessResponse<string>>(API_ENDPOINTS.admin.deleteCategory(id)).json()
