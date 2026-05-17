import type { BaseAdminEntity } from '@/core/types/api/admin/base-admin-entity.type'
import type { UserGender, UserRole } from '@/core/types/api/user.type'
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
