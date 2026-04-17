export type User = {
  email: string
  firstName: string
  lastName: string
  role: UserRole
  gender: UserGender
}

export enum UserRole {
  Admin = 'Admin',
  Regular = 'Regular',
}

export enum UserGender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
