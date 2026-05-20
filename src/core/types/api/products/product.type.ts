import type {
  AdminProduct,
  AdminProductSku,
  AdminProductSkuImage,
} from '@/core/types/api/admin/admin-product.type'

export type Product = Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted'>
export type ProductSkuImage = Omit<AdminProductSkuImage, 'id' | 'createdAt' | 'updatedAt'>

export type ProductSku = Omit<AdminProductSku, 'updatedAt' | 'product' | 'images'> & {
  product: Product
  images: ProductSkuImage[]
}

export type ProductSkuWithVariants = {
  productSku: ProductSku
  variants: ProductSkuVariant[]
}

export type ProductSkuVariant = {
  size: ProductSku['size']
  productSkuId: ProductSku['id']
  inStock: boolean
  colors: { color: ProductSku['color']; productSkuId: ProductSku['id']; inStock: boolean }[]
}
