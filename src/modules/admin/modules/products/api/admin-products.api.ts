import { API_ENDPOINTS } from '@/core/const/api-endpoints.const'
import { http, type ApiKeysetResponse, type ApiSuccessResponse } from '@/core/lib/api.lib'
import type {
  AdminProduct,
  AdminProductFilterOptions,
} from '@/core/types/api/admin/admin-product.type'
import { buildQueryParams } from '@/core/utils/query-params.util'
import type { CreateProductInput } from '@/modules/admin/modules/products/schemas/create-product.schema'
import type { GetAdminProductsInput } from '@/modules/admin/modules/products/schemas/get-admin-products.schema'
import type { ProductIdInput } from '@/modules/admin/modules/products/schemas/product-id.schema'
import type { UpdateProductInput } from '@/modules/admin/modules/products/schemas/update-product.schema'

export const getAdminProductFilterOptions = async () => {
  return await http
    .get<ApiSuccessResponse<AdminProductFilterOptions>>(API_ENDPOINTS.admin.getProductFilterOptions)
    .json()
}

export const getAdminProducts = async (query: GetAdminProductsInput) => {
  const params = buildQueryParams(query, ['prevCursor', 'nextCursor']).toString()
  const path = params
    ? `${API_ENDPOINTS.admin.getProducts}?${params}`
    : API_ENDPOINTS.admin.getProducts

  return await http.get<ApiKeysetResponse<AdminProduct>>(path).json()
}

export const createProduct = async (data: CreateProductInput) =>
  await http
    .post<ApiSuccessResponse<AdminProduct>>(API_ENDPOINTS.admin.createProduct, { json: data })
    .json()

export const updateProduct = async ({ id, ...rest }: UpdateProductInput) =>
  await http
    .patch<ApiSuccessResponse<AdminProduct>>(API_ENDPOINTS.admin.updateProduct(id), { json: rest })
    .json()

export const toggleProductIsDeleted = async (id: ProductIdInput) =>
  await http.post<ApiSuccessResponse<string>>(API_ENDPOINTS.admin.toggleProductIsDeleted(id)).json()
