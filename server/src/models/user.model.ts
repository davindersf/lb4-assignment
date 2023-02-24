import {Entity, model, property} from '@loopback/repository';

export enum UserRole {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Subscriber = 'Subscriber',
}

@model()
export class User extends Entity {
  @property({
    id: true,
    require: true,
    type: 'number',
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 3,
    },
  })
  firstName: string;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 3,
    },
  })
  middleName?: string;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 3,
    },
  })
  lastName?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 3,
      format: 'email',
    },
  })
  email: string;

  @property({
    type: 'number',
  })
  phone?: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(UserRole),
    },
  })
  role: UserRole;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdOn?: Date;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  modifiedOn?: Date;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {}

export type UserWithRelations = User & UserRelations;
