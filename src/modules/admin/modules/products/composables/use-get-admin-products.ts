import type { ApiKeysetResponse } from '@/core/lib/api.lib'
import type { AdminProduct } from '@/core/types/api/admin/admin-product.type'
import type { QueryOptions } from '@/core/types/tanstack.type'
import { getAdminProducts } from '@/modules/admin/modules/products/api/admin-products.api'
import { ADMIN_PRODUCTS_QUERY_KEYS } from '@/modules/admin/modules/products/const/admin-products-query-keys.const'
import type { GetAdminProductsInput } from '@/modules/admin/modules/products/schemas/get-admin-products.schema'
import { useQuery } from '@tanstack/vue-query'
import { toValue, type MaybeRefOrGetter } from 'vue'

export const useGetAdminProducts = (
  input: MaybeRefOrGetter<GetAdminProductsInput>,
  options?: QueryOptions<ApiKeysetResponse<AdminProduct>>,
) => {
  return useQuery({
    ...options,
    queryKey: ADMIN_PRODUCTS_QUERY_KEYS.getAdminProducts(toValue(input)),
    queryFn: () => getAdminProducts(toValue(input)),
  })
}
