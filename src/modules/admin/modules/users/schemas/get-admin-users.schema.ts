import { GET_ADMIN_USERS_CURSOR_MAX_LENGTH } from './../const/admin-users-schemas.const'
import { GET_ADMIN_USERS_SEARCH_MAX_LENGTH } from '@/modules/admin/modules/users/const/admin-users-schemas.const'
import z from 'zod'
import { GET_ADMIN_USERS_MAX_LIMIT } from '../const/admin-users-schemas.const'
import { UserGender } from '@/core/types/api/admin/admin-user.type'

export const getAdminUsersSchema = z
  .object({
    search: z.string().trim().max(GET_ADMIN_USERS_SEARCH_MAX_LENGTH).optional(),
    isBanned: z
      .enum(['true', 'false'])
      .transform((value) => value === 'true')
      .optional(),
    isVerified: z
      .enum(['true', 'false'])
      .transform((value) => value === 'true')
      .optional(),
    gender: z.enum(UserGender).optional(),
    limit: z.coerce.number().positive().max(GET_ADMIN_USERS_MAX_LIMIT).optional(),
    prevCursor: z.string().trim().max(GET_ADMIN_USERS_CURSOR_MAX_LENGTH).optional(),
    nextCursor: z.string().trim().max(GET_ADMIN_USERS_CURSOR_MAX_LENGTH).optional(),
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

export type GetAdminUsersInput = z.infer<typeof getAdminUsersSchema>
