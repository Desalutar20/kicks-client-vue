import z from 'zod'

export const productIdSchema = z.uuid().nonempty().trim()
export type ProductIdInput = z.infer<typeof productIdSchema>
