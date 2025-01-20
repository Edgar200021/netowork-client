export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  aboutMe?: string
  isVerified: boolean
  createdAt: string
  role: UserRole
}

export enum UserRole {
  Admin = 'admin',
  Client = 'client',
  Freelancer = 'freelancer',
}
