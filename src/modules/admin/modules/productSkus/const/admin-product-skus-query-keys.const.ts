import type { GetAdminProductSkusInput } from '@/modules/admin/modules/productSkus/schemas/get-admin-product-skus.schema'
import type { ProductSkuIdInput } from '@/modules/admin/modules/productSkus/schemas/product-sku-id.schema'
import type { MaybeRefOrGetter } from 'vue'

export const ADMIN_PRODUCT_SKUS_QUERY_KEYS = {
  all: ['adminProductSkus'] as const,
  getAdminProductSkus: (filters: GetAdminProductSkusInput) =>
    ['adminProductSkus', filters] as const,
  getAdminProductSku: (id: MaybeRefOrGetter<ProductSkuIdInput>) => ['adminProductSku', id] as const,
} as const
