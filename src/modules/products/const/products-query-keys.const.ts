import type { ProductSkuIdInput } from '@/modules/admin/modules/productSkus/schemas/product-sku-id.schema'
import type { GetProductSkusInput } from '@/modules/products/schemas/get-product-skus.schema'
import type { MaybeRefOrGetter } from 'vue'

export const PRODUCTS_QUERY_KEYS = {
  getProductSkusFilterOptions: () => ['productSkusFilterOptions'] as const,
  getAdminProductSkus: (filters: GetProductSkusInput) => ['productSkus', filters] as const,
  getAdminProductSku: (id: MaybeRefOrGetter<ProductSkuIdInput>) => ['productSku', id] as const,
} as const
