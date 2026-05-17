import z from 'zod'

export const productSkuImageIdSchema = z.uuid().nonempty().trim()
export type ProductSkuImageIdInput = z.infer<typeof productSkuImageIdSchema>
