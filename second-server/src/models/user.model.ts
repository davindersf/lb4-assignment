import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Customer} from './customer.model';
import {Role} from './role.model';

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
