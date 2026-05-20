import type { ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminProductSku } from '@/core/types/api/admin/admin-product.type'
import type { QueryOptions } from '@/core/types/tanstack.type'
import { getAdminProductSku } from '@/modules/admin/modules/productSkus/api/admin-product-skus.api'
import { ADMIN_PRODUCT_SKUS_QUERY_KEYS } from '@/modules/admin/modules/productSkus/const/admin-product-skus-query-keys.const'
import type { ProductSkuIdInput } from '@/modules/admin/modules/productSkus/schemas/product-sku-id.schema'
import { useQuery } from '@tanstack/vue-query'
import { toValue, type MaybeRefOrGetter } from 'vue'

export const useGetAdminProductSku = (
  id: MaybeRefOrGetter<ProductSkuIdInput>,
  options?: QueryOptions<ApiSuccessResponse<AdminProductSku>>,
) => {
  return useQuery({
    ...options,
    queryKey: ADMIN_PRODUCT_SKUS_QUERY_KEYS.getAdminProductSku(id),
    queryFn: () => getAdminProductSku(toValue(id)),
  })
}
