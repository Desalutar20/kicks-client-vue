import { API_ENDPOINTS } from '@/core/const/api-endpoints.const'
import { http, type ApiKeysetResponse, type ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminBrand } from '@/core/types/api/admin/admin-brand.type'
import { buildQueryParams } from '@/core/utils/query-params.util'
import type { BrandIdInput } from '@/modules/admin/modules/brands/schemas/brand-id.schema'
import type { CreateBrandInput } from '@/modules/admin/modules/brands/schemas/create-brand.schema'
import type { GetAdminBrandsInput } from '@/modules/admin/modules/brands/schemas/get-admin-brands.schema'
import type { UpdateBrandInput } from '@/modules/admin/modules/brands/schemas/update-brand.schema'

export const getAdminBrands = async (query: GetAdminBrandsInput) => {
  const params = buildQueryParams(query).toString()
  const path = params ? `${API_ENDPOINTS.admin.getBrands}?${params}` : API_ENDPOINTS.admin.getBrands

  return await http.get<ApiKeysetResponse<AdminBrand>>(path).json()
}

export const createBrand = async (data: CreateBrandInput) =>
  await http
    .post<ApiSuccessResponse<AdminBrand>>(API_ENDPOINTS.admin.createBrand, { json: data })
    .json()

export const updateBrand = async (data: UpdateBrandInput) =>
  await http
    .patch<ApiSuccessResponse<string>>(API_ENDPOINTS.admin.updateBrand(data.id), {
      json: { name: data.name },
    })
    .json()

export const deleteBrand = async (id: BrandIdInput) =>
  await http.delete<ApiSuccessResponse<string>>(API_ENDPOINTS.admin.deleteBrand(id)).json()
