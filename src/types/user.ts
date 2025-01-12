export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
}

export enum UserRole {
  Admin = 'admin',
  Client = 'client',
  Freelancer = 'freelancer',
}
