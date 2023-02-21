export enum Role {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Subscriber = 'Subscriber',
}

export interface User {
  id: number
  firstName: string
  middleName?: string
  lastName?: string
  email: string
  phone?: number
  role: Role
  createdOn?: string
  modifiedOn?: string
}
