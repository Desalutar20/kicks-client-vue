import type { AdminBrand } from '@/core/types/api/admin/admin-brand.type'
import type { AdminCategory } from '@/core/types/api/admin/admin-category.type'
import type { Nullable } from '@/core/types/util.type'

export type AdminProduct = {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  description: string
  gender: ProductGender
  tags: string[]
  isDeleted: boolean
  brandId: Nullable<AdminBrand['id']>
  categoryId: Nullable<AdminCategory['id']>
}

export enum ProductGender {
  Men = 'Men',
  Women = 'Women',
  Unisex = 'Unisex',
}

export type AdminProductFilterOptions = {
  tags: string[]
  categories: { id: AdminCategory['id']; name: AdminCategory['name'] }[]
  availableCategories: { id: AdminCategory['id']; name: AdminCategory['name'] }[]
  brands: { id: AdminBrand['id']; name: AdminBrand['name'] }[]
  availableBrands: { id: AdminBrand['id']; name: AdminBrand['name'] }[]
}
