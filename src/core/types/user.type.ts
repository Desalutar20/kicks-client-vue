export type User = {
  email: string
  firstName: string
  lastName: string
  role: UserRole
  gender: UserGender
}

export enum UserRole {
  Admin = 'admin',
  Regular = 'regular',
}

export enum UserGender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
