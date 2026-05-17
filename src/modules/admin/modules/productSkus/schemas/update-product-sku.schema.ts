import z from 'zod'
import { productSkuIdSchema } from '@/modules/admin/modules/productSkus/schemas/product-sku-id.schema'
import {
  ADMIN_PRODUCT_SKU_FILE_MAX_LENGTH,
  ADMIN_PRODUCT_SKU_FILE_MAX_SIZE,
  ADMIN_PRODUCT_SKU_FILE_MIME_TYPES,
} from '../const/admin-product-skus-schemas.const'

export const updateProductSkuSchema = z
  .object({
    id: productSkuIdSchema,
    sku: z.string().trim().nonempty().optional(),
    quantity: z.coerce.number<number>().positive().optional(),
    price: z.coerce.number<number>().positive().optional(),
    salePrice: z.coerce.number<number>().positive().optional(),
    size: z.coerce.number<number>().optional(),
    color: z
      .string()
      .trim()
      .regex(/^#[0-9a-fA-F]{6}$/, {
        message: 'Invalid color format. Must be #RRGGBB',
      })
      .optional(),
    images: z
      .array(z.file().max(ADMIN_PRODUCT_SKU_FILE_MAX_SIZE).mime(ADMIN_PRODUCT_SKU_FILE_MIME_TYPES))
      .nonempty()
      .max(ADMIN_PRODUCT_SKU_FILE_MAX_LENGTH)
      .optional(),
  })
  .refine(
    (data) =>
      data.price === undefined || data.salePrice === undefined || data.salePrice < data.price,
    {
      path: ['salePrice'],
      message: 'Sale price must be less than the regular price',
    },
  )

export type UpdateProductSkuInput = z.infer<typeof updateProductSkuSchema>
