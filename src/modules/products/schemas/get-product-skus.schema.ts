import z from 'zod'
import { ProductGender } from '@/core/types/api/admin/admin-product.type'
import {
  GET_PRODUCT_SKUS_CURSOR_MAX_LENGTH,
  GET_PRODUCT_SKUS_MAX_LIMIT,
} from '@/modules/products/const/admin-brands-schemas.const'
import { arrayable } from '@/core/schemas/processors'

export const getProductSkusSchema = z
  .object({
    sizes: arrayable(z.coerce.number().positive()).optional(),
    colors: arrayable(
      z
        .string()
        .trim()
        .regex(/^#[0-9a-fA-F]{6}$/, {
          message: 'Invalid color format. Must be #RRGGBB',
        }),
    ).optional(),
    categoryIds: arrayable(z.uuid()).optional(),
    brandIds: arrayable(z.uuid()).optional(),
    genders: arrayable(z.enum(ProductGender)).optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
    limit: z.coerce.number().positive().max(GET_PRODUCT_SKUS_MAX_LIMIT).optional(),
    prevCursor: z.string().trim().max(GET_PRODUCT_SKUS_CURSOR_MAX_LENGTH).optional(),
    nextCursor: z.string().trim().max(GET_PRODUCT_SKUS_CURSOR_MAX_LENGTH).optional(),
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
      (!obj.nextCursor && !obj.prevCursor) ||
      (obj.nextCursor && !obj.prevCursor) ||
      (!obj.nextCursor && obj.prevCursor),
    {
      path: ['prevCursor'],
      error: 'Only one cursor can be provided at a time: nextCursor or prevCursor.',
    },
  )

export type GetProductSkusInput = z.infer<typeof getProductSkusSchema>
