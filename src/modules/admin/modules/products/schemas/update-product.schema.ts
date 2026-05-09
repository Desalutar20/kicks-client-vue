import { createProductSchema } from '@/modules/admin/modules/products/schemas/create-product.schema'
import { productIdSchema } from '@/modules/admin/modules/products/schemas/product-id.schema'
import z from 'zod'

export const updateProductSchema = createProductSchema.partial().extend({
  id: productIdSchema,
})

export type UpdateProductInput = z.infer<typeof updateProductSchema>
