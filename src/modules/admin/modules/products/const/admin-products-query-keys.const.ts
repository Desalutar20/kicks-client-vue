import type { GetAdminProductsInput } from '@/modules/admin/modules/products/schemas/get-admin-products.schema'

export const ADMIN_PRODUCTS_QUERY_KEYS = {
  getAdminProductFilterOptions: () => ['adminProductFilterOptions'] as const,
  getAdminProducts: (filters: GetAdminProductsInput) => ['adminProducts', filters] as const,
} as const
