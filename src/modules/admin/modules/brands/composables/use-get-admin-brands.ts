import type { ApiKeysetResponse } from '@/core/lib/api.lib'
import type { AdminBrand } from '@/core/types/api/admin/admin-brand.type'
import type { QueryOptions } from '@/core/types/tanstack.type'
import { getAdminBrands } from '@/modules/admin/modules/brands/api/admin-brands.api'
import { ADMIN_BRANDS_QUERY_KEYS } from '@/modules/admin/modules/brands/const/admin-brands-query-keys.const'
import type { GetAdminBrandsInput } from '@/modules/admin/modules/brands/schemas/get-admin-brands.schema'
import { useQuery } from '@tanstack/vue-query'
import { toValue, type MaybeRefOrGetter } from 'vue'

export const useGetAdminBrands = (
  input: MaybeRefOrGetter<GetAdminBrandsInput>,
  options?: QueryOptions<ApiKeysetResponse<AdminBrand>>,
) => {
  return useQuery({
    ...options,
    queryKey: ADMIN_BRANDS_QUERY_KEYS.getAdminBrands(toValue(input)),
    queryFn: () => getAdminBrands(toValue(input)),
  })
}
