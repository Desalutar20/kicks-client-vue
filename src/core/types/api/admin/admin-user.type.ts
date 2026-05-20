import type { BaseAdminEntity } from '@/core/types/api/admin/base-admin-entity.type'
import type { Nullable } from '@/core/types/util.type'

export type AdminUser = BaseAdminEntity & {
  email: string
  firstName: Nullable<string>
  lastName: Nullable<string>
  role: UserRole
  gender: Nullable<UserGender>
  isVerified: boolean
  isBanned: boolean
  googleId: Nullable<string>
  facebookId: Nullable<string>
}

export enum UserRole {
  Admin = 'Admin',
  Regular = 'Regular',
}

export enum UserGender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}
