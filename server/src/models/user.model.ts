import {Entity, model, property, belongsTo} from '@loopback/repository';
import {UserRole} from '../enums/user-role.enum';
import {Customer} from './customer.model';
import {Role} from './role.model';

@model({
  settings: {
    foreignKeys: {
      fk_user_customerId: {
        name: 'fk_user_customerId',
        entity: 'Customer',
        entityKey: 'id',
        foreignKey: 'customerid', // in postgres, prop names will be all lowercase that's why not using camel case for prop naming ("customerId")
      },
      fk_user_roleId: {
        name: 'fk_user_roleId',
        entity: 'Role',
        entityKey: 'id',
        foreignKey: 'roleid', // in postgres, prop names will be all lowercase that's why not using camel case for prop naming ("customerId")
      },
    },
  },
})
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

  @belongsTo(() => Customer)
  customerId: number;

  @belongsTo(() => Role)
  roleId: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {}

export type UserWithRelations = User & UserRelations;
