import type { Nullable } from '@/core/types/util.type'

export type User = {
  email: string
  firstName: Nullable<string>
  lastName: Nullable<string>
  role: UserRole
  gender: Nullable<UserGender>
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
