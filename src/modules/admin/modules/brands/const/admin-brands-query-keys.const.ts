import type { GetAdminBrandsInput } from '@/modules/admin/modules/brands/schemas/get-admin-brands.schema'

export const ADMIN_BRANDS_QUERY_KEYS = {
  getAdminBrands: (filters: GetAdminBrandsInput) => ['adminBrands', filters] as const,
} as const
