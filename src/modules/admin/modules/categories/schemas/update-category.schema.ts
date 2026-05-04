import { categoryIdSchema } from '@/modules/admin/modules/categories/schemas/category-id.schema'
import { categoryNameSchema } from '@/modules/admin/modules/categories/schemas/category-name.schema'
import z from 'zod'

export const updateCategorySchema = z.object({
  id: categoryIdSchema,
  name: categoryNameSchema,
})

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
