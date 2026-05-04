import type { GetAdminCategoriesInput } from '@/modules/admin/modules/categories/schemas/get-admin-categories.schema'

export const ADMIN_CATEGORIES_QUERY_KEYS = {
  getAdminCategories: (filters: GetAdminCategoriesInput) => ['categories', filters] as const,
} as const
