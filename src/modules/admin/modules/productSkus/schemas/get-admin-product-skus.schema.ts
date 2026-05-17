import z from 'zod'
import { booleanSchema } from '@/core/schemas/boolean.schema'
import {
  GET_ADMIN_PRODUCT_SKUS_CURSOR_MAX_LENGTH,
  GET_ADMIN_PRODUCT_SKUS_MAX_LIMIT,
} from '@/modules/admin/modules/productSkus/const/admin-product-skus-schemas.const'

export const getAdminProductSkusSchema = z
  .object({
    inStock: booleanSchema,
    minPrice: z.coerce.number().positive().optional(),
    maxPrice: z.coerce.number().positive().optional(),
    minSalePrice: z.coerce.number().positive().optional(),
    maxSalePrice: z.coerce.number().positive().optional(),
    size: z.coerce.number().positive().optional(),
    color: z
      .string()
      .trim()
      .regex(/^#[0-9a-fA-F]{6}$/, {
        message: 'Invalid color format. Must be #RRGGBB',
      })
      .optional(),
    sku: z.string().trim().optional(),
    limit: z.coerce.number().positive().max(GET_ADMIN_PRODUCT_SKUS_MAX_LIMIT).optional(),
    prevCursor: z.string().trim().max(GET_ADMIN_PRODUCT_SKUS_CURSOR_MAX_LENGTH).optional(),
    nextCursor: z.string().trim().max(GET_ADMIN_PRODUCT_SKUS_CURSOR_MAX_LENGTH).optional(),
  })
  .refine(
    (obj) =>
      obj.minPrice === undefined || obj.maxPrice === undefined || obj.minPrice < obj.maxPrice,
    {
      path: ['minPrice'],
      error: 'MinPrice must be less than or equal to maxPrice.',
    },
  )
  .refine(
    (obj) =>
      obj.minSalePrice === undefined ||
      obj.maxSalePrice === undefined ||
      obj.minSalePrice < obj.maxSalePrice,
    {
      path: ['minSalePrice'],
      error: 'MinPrice must be less than or equal to maxSalePrice.',
    },
  )
  .refine(
    (obj) =>
      (!obj.nextCursor && !obj.prevCursor) ||
      (obj.nextCursor && !obj.prevCursor) ||
      (!obj.nextCursor && obj.prevCursor),
    {
      path: ['prevCursor'],
      error: 'Only one cursor can be provided at a time: nextCursor or prevCursor.',
    },
  )

export type GetAdminProductSkusInput = z.infer<typeof getAdminProductSkusSchema>
