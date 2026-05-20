import type { AdminBrand } from '@/core/types/api/admin/admin-brand.type'
import type { AdminCategory } from '@/core/types/api/admin/admin-category.type'
import type { ProductGender } from '@/core/types/api/admin/admin-product.type'

export type ProductSkusFilterOptions = {
  sizes: number[]
  colors: string[]
  genders: ProductGender[]
  categories: { id: AdminCategory['id']; name: AdminCategory['name'] }[]
  brands: { id: AdminBrand['id']; name: AdminBrand['name'] }[]
  minPrice: number
  maxPrice: number
}
