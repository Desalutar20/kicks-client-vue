import { ADMIN_BRAND_NAME_MAX_LENGTH } from '@/modules/admin/modules/brands/const/admin-brands-schemas.const'
import z from 'zod'

export const brandNameSchema = z.string().trim().nonempty().max(ADMIN_BRAND_NAME_MAX_LENGTH)
