import z from 'zod'
import {
  GET_ADMIN_CATEGORIES_CURSOR_MAX_LENGTH,
  GET_ADMIN_CATEGORIES_MAX_LIMIT,
  GET_ADMIN_CATEGORIES_SEARCH_MAX_LENGTH,
} from '../const/admin-categories-schemas.const'

export const getAdminCategoriesSchema = z
  .object({
    search: z.string().trim().max(GET_ADMIN_CATEGORIES_SEARCH_MAX_LENGTH).optional(),
    limit: z.coerce.number().positive().max(GET_ADMIN_CATEGORIES_MAX_LIMIT).optional(),
    prevCursor: z.string().trim().max(GET_ADMIN_CATEGORIES_CURSOR_MAX_LENGTH).optional(),
    nextCursor: z.string().trim().max(GET_ADMIN_CATEGORIES_CURSOR_MAX_LENGTH).optional(),
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

export type GetAdminCategoriesInput = z.infer<typeof getAdminCategoriesSchema>
