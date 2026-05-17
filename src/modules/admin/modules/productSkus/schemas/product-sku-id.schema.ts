import z from 'zod'

export const productSkuIdSchema = z.uuid().nonempty().trim()
export type ProductSkuIdInput = z.infer<typeof productSkuIdSchema>
