import type { AdminUser } from '@/core/types/api/admin/admin-user.type'

export type User = Pick<AdminUser, 'email' | 'firstName' | 'lastName' | 'role' | 'gender'>
