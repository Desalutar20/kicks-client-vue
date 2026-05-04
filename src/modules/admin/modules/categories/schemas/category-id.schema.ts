import z from 'zod'

export const categoryIdSchema = z.uuid().nonempty().trim()
export type CategoryIdInput = z.infer<typeof categoryIdSchema>
