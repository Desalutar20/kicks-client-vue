import z from 'zod'

export const userIdSchema = z.uuid().nonempty().trim()
export type UserIdInput = z.infer<typeof userIdSchema>
