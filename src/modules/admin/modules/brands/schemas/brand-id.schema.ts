import z from 'zod'

export const brandIdSchema = z.uuid().nonempty().trim()
export type BrandIdInput = z.infer<typeof brandIdSchema>
