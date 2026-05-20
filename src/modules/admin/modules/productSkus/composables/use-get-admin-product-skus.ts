import type { ApiKeysetResponse } from '@/core/lib/api.lib'
import type { AdminProductSku } from '@/core/types/api/admin/admin-product.type'
import type { QueryOptions } from '@/core/types/tanstack.type'
import { getAdminProductSkus } from '@/modules/admin/modules/productSkus/api/admin-product-skus.api'
import { ADMIN_PRODUCT_SKUS_QUERY_KEYS } from '@/modules/admin/modules/productSkus/const/admin-product-skus-query-keys.const'
import type { GetAdminProductSkusInput } from '@/modules/products/schemas/get-product-skus.schema'
import { useQuery } from '@tanstack/vue-query'
import { toValue, type MaybeRefOrGetter } from 'vue'

export const useGetAdminProductSkus = (
  input: MaybeRefOrGetter<GetAdminProductSkusInput>,
  options?: QueryOptions<ApiKeysetResponse<AdminProductSku>>,
) => {
  return useQuery({
    ...options,
    queryKey: ADMIN_PRODUCT_SKUS_QUERY_KEYS.getAdminProductSkus(toValue(input)),
    queryFn: () => getAdminProductSkus(toValue(input)),
  })
}
