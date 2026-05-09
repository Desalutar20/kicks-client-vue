import { ProductGender } from '@/core/types/api/admin/admin-product.type'
import {
  ADMIN_PRODUCT_DESCRIPTION_MAX_LENGTH,
  ADMIN_PRODUCT_TAGS_MAX_LENGTH,
  ADMIN_PRODUCT_TITLE_MAX_LENGTH,
} from '@/modules/admin/modules/products/const/admin-products-schemas.const'
import z from 'zod'

export const createProductSchema = z.object({
  title: z.string().nonempty().trim().max(ADMIN_PRODUCT_TITLE_MAX_LENGTH),
  description: z.string().trim().nonempty().max(ADMIN_PRODUCT_DESCRIPTION_MAX_LENGTH),
  gender: z.enum(ProductGender).nonoptional(),
  tags: z
    .string()
    .trim()
    .nonempty()
    .array()
    .max(ADMIN_PRODUCT_TAGS_MAX_LENGTH)
    .optional()
    .default([]),
  categoryId: z.uuid().trim().nonempty(),
  brandId: z.uuid().trim().nonempty(),
})

export type CreateProductInput = z.infer<typeof createProductSchema>
