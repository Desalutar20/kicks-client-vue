import type { ApiSuccessResponse } from '@/core/lib/api.lib'
import type { AdminProductFilterOptions } from '@/core/types/api/admin/admin-product.type'
import type { QueryOptions } from '@/core/types/tanstack.type'
import { getAdminProductFilterOptions } from '@/modules/admin/modules/products/api/admin-products.api'
import { ADMIN_PRODUCTS_QUERY_KEYS } from '@/modules/admin/modules/products/const/admin-products-query-keys.const'
import { useQuery } from '@tanstack/vue-query'

export const useGetAdminProductFilterOptions = (
  options?: QueryOptions<ApiSuccessResponse<AdminProductFilterOptions>>,
) => {
  return useQuery({
    ...options,
    queryKey: ADMIN_PRODUCTS_QUERY_KEYS.getAdminProductFilterOptions(),
    queryFn: () => getAdminProductFilterOptions(),
  })
}
