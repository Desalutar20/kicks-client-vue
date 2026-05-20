import type { ApiKeysetResponse } from '@/core/lib/api.lib'
import type { ProductSku } from '@/core/types/api/products/product.type'
import type { QueryOptions } from '@/core/types/tanstack.type'
import { getProductSkus } from '@/modules/products/api/products.api'
import { PRODUCTS_QUERY_KEYS } from '@/modules/products/const/products-query-keys.const'
import type { GetProductSkusInput } from '@/modules/products/schemas/get-product-skus.schema'
import { useQuery } from '@tanstack/vue-query'
import { toValue, type MaybeRefOrGetter } from 'vue'

export const useGetProductSkus = (
  input: MaybeRefOrGetter<GetProductSkusInput>,
  options?: QueryOptions<ApiKeysetResponse<ProductSku>>,
) => {
  return useQuery({
    ...options,
    queryKey: PRODUCTS_QUERY_KEYS.getAdminProductSkus(toValue(input)),
    queryFn: () => getProductSkus(toValue(input)),
  })
}
