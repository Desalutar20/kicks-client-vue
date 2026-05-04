import { categoryNameSchema } from '@/modules/admin/modules/categories/schemas/category-name.schema'
import z from 'zod'

export const createCategorySchema = z.object({
  name: categoryNameSchema,
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
