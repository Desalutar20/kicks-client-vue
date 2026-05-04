import { brandIdSchema } from '@/modules/admin/modules/brands/schemas/brand-id.schema'
import { brandNameSchema } from '@/modules/admin/modules/brands/schemas/brand-name.schema'
import z from 'zod'

export const updateBrandSchema = z.object({
  id: brandIdSchema,
  name: brandNameSchema,
})

export type UpdateBrandInput = z.infer<typeof updateBrandSchema>
