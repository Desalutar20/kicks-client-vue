import {
  ADMIN_PRODUCT_SKU_FILE_MAX_LENGTH,
  ADMIN_PRODUCT_SKU_FILE_MIME_TYPES,
} from '@/modules/admin/modules/productSkus/const/admin-product-skus-schemas.const'
import z from 'zod'
import { ADMIN_PRODUCT_SKU_FILE_MAX_SIZE } from '../const/admin-product-skus-schemas.const'
import { productIdSchema } from '@/modules/admin/modules/products/schemas/product-id.schema'

export const createProductSkuSchema = z
  .object({
    productId: productIdSchema,
    sku: z.string().trim().nonempty(),
    quantity: z.coerce.number<number>().positive(),
    price: z.coerce.number<number>().positive(),
    salePrice: z.coerce.number<number>().positive().optional(),
    size: z.coerce.number<number>(),
    color: z
      .string()
      .trim()
      .regex(/^#[0-9a-fA-F]{6}$/, {
        message: 'Invalid color format. Must be #RRGGBB',
      }),
    images: z
      .array(z.file().max(ADMIN_PRODUCT_SKU_FILE_MAX_SIZE).mime(ADMIN_PRODUCT_SKU_FILE_MIME_TYPES))
      .nonempty()
      .max(ADMIN_PRODUCT_SKU_FILE_MAX_LENGTH),
  })
  .refine((data) => data.salePrice === undefined || data.salePrice < data.price, {
    path: ['salePrice'],
    message: 'Sale price must be less than the regular price',
  })

export type CreateProductSkuInput = z.infer<typeof createProductSkuSchema>
