import {inject, Provider} from '@loopback/core';
import {Count} from '@loopback/repository';
import {getService} from '@loopback/service-proxy';
import {Api1DataSource} from '../datasources';
import {User} from '../models';

export interface Api1UserService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.

  createUser: (user: User) => Promise<User>;

  getUsersCount: () => Promise<Count>;

  getUsers: () => Promise<any[]>;

  updateAllUsers: (user: Partial<any>) => Promise<Count>;

  getUserById: (id: number) => Promise<any>;

  updateUserById: (id: number, user: Partial<any>) => Promise<void>;

  replaceUserById: (id: number, user: User) => Promise<void>;

  deleteUserById: (id: number) => Promise<any>;
}

export class Api1UserServiceProvider implements Provider<Api1UserService> {
  constructor(
    // api1 must match the name property in the datasource json file
    @inject('datasources.api1')
    protected dataSource: Api1DataSource = new Api1DataSource(),
  ) {}

  value(): Promise<Api1UserService> {
    return getService(this.dataSource);
  }
}
