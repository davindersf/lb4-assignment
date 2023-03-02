import {inject, Provider} from '@loopback/core';
import {Count, Filter, FilterExcludingWhere, Where} from '@loopback/repository';
import {getService} from '@loopback/service-proxy';
import {OpenapiDataSource} from '../datasources';
import {User} from '../models';

interface Response<T> {
  status: number;
  body: T;
}

export interface OpenapiUserService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.

  usersControllerCreate: (
    params: object,
    data: {requestBody: User},
  ) => Promise<Response<User>>;

  usersControllerCount: (params: {
    where: Where<User>;
  }) => Promise<Response<Count>>;

  usersControllerFind: (params: {
    filter: Filter<User>;
  }) => Promise<Response<User[]>>;

  usersControllerUpdateAll: (
    params: {where: Where<User>},
    data: {requestBody: Partial<Omit<User, 'id'>>},
  ) => Promise<Response<Count>>;

  usersControllerFindById: (params: {
    id: number;
    filter: FilterExcludingWhere<User>;
  }) => Promise<Response<User>>;

  usersControllerUpdateById: (
    params: {id: number},
    data: {requestBody: Partial<Omit<User, 'id'>>},
  ) => Promise<Response<void>>;

  usersControllerReplaceById: (
    params: {id: number},
    data: {requestBody: Omit<User, 'id'>},
  ) => Promise<Response<void>>;

  usersControllerDeleteById: (params: {id: number}) => Promise<Response<void>>;
}

export class OpenapiUserServiceProvider
  implements Provider<OpenapiUserService>
{
  constructor(
    // api1 must match the name property in the datasource json file
    @inject('datasources.openapi')
    protected dataSource: OpenapiDataSource = new OpenapiDataSource(),
  ) {}

  value(): Promise<OpenapiUserService> {
    return getService(this.dataSource);
  }
}
