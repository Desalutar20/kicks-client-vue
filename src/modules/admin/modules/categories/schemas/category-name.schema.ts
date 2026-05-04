import { ADMIN_CATEGORY_NAME_MAX_LENGTH } from '@/modules/admin/modules/categories/const/admin-categories-schemas.const'
import z from 'zod'

export const categoryNameSchema = z.string().trim().nonempty().max(ADMIN_CATEGORY_NAME_MAX_LENGTH)
