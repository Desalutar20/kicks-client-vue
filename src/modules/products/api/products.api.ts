import { API_ENDPOINTS } from '@/core/const/api-endpoints.const'
import { http, type ApiKeysetResponse, type ApiSuccessResponse } from '@/core/lib/api.lib'
import type { ProductSkusFilterOptions } from '@/core/types/api/products/product-skus-filter-options.type'
import type { ProductSku, ProductSkuWithVariants } from '@/core/types/api/products/product.type'
import { buildQueryParams } from '@/core/utils/query-params.util'
import type { ProductSkuIdInput } from '@/modules/admin/modules/productSkus/schemas/product-sku-id.schema'
import type { GetProductSkusInput } from '@/modules/products/schemas/get-product-skus.schema'

export const getProductSkusFilterOptions = async () => {
  return await http
    .get<ApiSuccessResponse<ProductSkusFilterOptions>>(
      API_ENDPOINTS.products.getProductSkusFilterOptions,
    )
    .json()
}
// export const sleep = () =>
//   new Promise((res) =>
//     setTimeout(() => {
//       res(5)
//     }, 20000),
//   )

export const getProductSkus = async (query: GetProductSkusInput) => {
  const params = buildQueryParams(query, ['prevCursor', 'nextCursor']).toString()
  const path = params
    ? `${API_ENDPOINTS.products.getProductSkus}?${params}`
    : API_ENDPOINTS.products.getProductSkus

  return await http.get<ApiKeysetResponse<ProductSku>>(path).json()
}

export const getProductSku = async (id: ProductSkuIdInput) =>
  await http
    .get<ApiSuccessResponse<ProductSkuWithVariants>>(API_ENDPOINTS.products.getProductSku(id))
    .json()
