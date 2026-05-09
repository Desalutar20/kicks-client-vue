import {
  GET_ADMIN_PRODUCTS_CURSOR_MAX_LENGTH,
  GET_ADMIN_PRODUCTS_SEARCH_MAX_LENGTH,
} from '@/modules/admin/modules/products/const/admin-products-schemas.const'
import z from 'zod'
import { GET_ADMIN_PRODUCTS_MAX_LIMIT } from '../const/admin-products-schemas.const'
import { ProductGender } from '@/core/types/api/admin/admin-product.type'

export const getAdminProductsSchema = z
  .object({
    search: z.string().trim().max(GET_ADMIN_PRODUCTS_SEARCH_MAX_LENGTH).optional(),
    gender: z.enum(ProductGender).optional(),
    brandId: z.uuid().optional(),
    categoryId: z.uuid().optional(),
    isDeleted: z
      .enum(['true', 'false'])
      .transform((value) => value === 'true')
      .optional(),
    limit: z.coerce.number().positive().max(GET_ADMIN_PRODUCTS_MAX_LIMIT).optional(),
    prevCursor: z.string().trim().max(GET_ADMIN_PRODUCTS_CURSOR_MAX_LENGTH).optional(),
    nextCursor: z.string().trim().max(GET_ADMIN_PRODUCTS_CURSOR_MAX_LENGTH).optional(),
  })
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

export type GetAdminProductsInput = z.infer<typeof getAdminProductsSchema>
