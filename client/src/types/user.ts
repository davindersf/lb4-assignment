import { nanoid } from 'nanoid'

export enum Role {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Subscriber = 'Subscriber',
}

export class User {
  id: string
  firstName: string
  middleName?: string
  lastName?: string
  email: string
  phone?: string
  role: Role
  createdOn?: string
  modifiedOn?: string

  constructor(props: {
    firstName: string
    middleName?: string
    lastName?: string
    email: string
    phone?: string
    role: Role
    createdOn?: string
    modifiedOn?: string
  }) {
    this.id = nanoid(8)
    this.firstName = props.firstName
    this.middleName = props.middleName
    this.lastName = props.lastName
    this.email = props.email
    this.phone = props.phone
    this.role = props.role
    this.createdOn = props.createdOn
    this.modifiedOn = props.modifiedOn
  }
}
