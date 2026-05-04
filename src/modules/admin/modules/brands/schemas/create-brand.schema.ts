import { brandNameSchema } from '@/modules/admin/modules/brands/schemas/brand-name.schema'
import z from 'zod'

export const createBrandSchema = z.object({
  name: brandNameSchema,
})

export type CreateBrandInput = z.infer<typeof createBrandSchema>
