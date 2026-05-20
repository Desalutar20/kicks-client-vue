import type { ApiSuccessResponse } from '@/core/lib/api.lib'
import type { ProductSkusFilterOptions } from '@/core/types/api/products/product-skus-filter-options.type'
import type { QueryOptions } from '@/core/types/tanstack.type'
import { getProductSkusFilterOptions } from '@/modules/products/api/products.api'
import { PRODUCTS_QUERY_KEYS } from '@/modules/products/const/products-query-keys.const'
import { useQuery } from '@tanstack/vue-query'

export const useGetProductSkusFilterOptions = (
  options?: QueryOptions<ApiSuccessResponse<ProductSkusFilterOptions>>,
) => {
  return useQuery({
    ...options,
    queryKey: PRODUCTS_QUERY_KEYS.getProductSkusFilterOptions(),
    queryFn: () => getProductSkusFilterOptions(),
  })
}
