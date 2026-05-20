import { API_ENDPOINTS } from '@/core/const/api-endpoints.const'
import { http, type ApiKeysetResponse, type ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminProductSku } from '@/core/types/api/admin/admin-product.type'
import { buildFormData } from '@/core/utils/form-data.util'
import { buildQueryParams } from '@/core/utils/query-params.util'
import type { CreateProductSkuInput } from '@/modules/admin/modules/productSkus/schemas/create-product-sku.schema'
import type { GetAdminProductSkusInput } from '@/modules/admin/modules/productSkus/schemas/get-admin-product-skus.schema'
import type { ProductSkuIdInput } from '@/modules/admin/modules/productSkus/schemas/product-sku-id.schema'
import type { ProductSkuImageIdInput } from '@/modules/admin/modules/productSkus/schemas/product-sku-image-id.schema'
import type { UpdateProductSkuInput } from '@/modules/admin/modules/productSkus/schemas/update-product-sku.schema'

export const getAdminProductSkus = async (query: GetAdminProductSkusInput) => {
  const params = buildQueryParams(query, ['prevCursor', 'nextCursor']).toString()
  const path = params
    ? `${API_ENDPOINTS.admin.getProductSkus}?${params}`
    : API_ENDPOINTS.admin.getProductSkus

  return await http.get<ApiKeysetResponse<AdminProductSku>>(path).json()
}

export const getAdminProductSku = async (id: ProductSkuIdInput) =>
  await http.get<ApiSuccessResponse<AdminProductSku>>(API_ENDPOINTS.admin.getProductSku(id)).json()

export const createProductSku = async (data: CreateProductSkuInput) =>
  await http
    .post<ApiSuccessResponse<AdminProductSku['id']>>(
      API_ENDPOINTS.admin.createProductSku(data.productId),
      {
        body: buildFormData(data),
      },
    )
    .json()

export const updateProductSku = async ({ id, ...rest }: UpdateProductSkuInput) =>
  await http
    .patch<ApiSuccessResponse<AdminProductSku>>(API_ENDPOINTS.admin.updateProductSku(id), {
      body: buildFormData(rest),
    })
    .json()

export const deleteProductSku = async (id: ProductSkuIdInput) =>
  await http.delete<ApiSuccessResponse<string>>(API_ENDPOINTS.admin.deleteProductSku(id)).json()

export const deleteProductSkuImage = async (
  id: ProductSkuIdInput,
  imageId: ProductSkuImageIdInput,
) =>
  await http
    .delete<ApiSuccessResponse<string>>(API_ENDPOINTS.admin.deleteProductSkuImage(id, imageId))
    .json()
