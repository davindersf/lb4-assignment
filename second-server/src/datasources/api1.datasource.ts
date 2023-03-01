import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'api1',
  connector: 'rest',
  baseURL: 'http://localhost:3000',
  crud: false,
  // request options
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  // operations
  operations: [
    {
      template: {
        method: 'POST',
        url: 'http://localhost:3000/users',
        body: '{data}',
        json: true,
      },
      functions: {
        createUser: ['data'],
      },
    },
    {
      template: {
        method: 'GET',
        url: 'http://localhost:3000/users/count',
      },
      functions: {
        getUsersCount: [],
      },
    },
    {
      template: {
        method: 'GET',
        url: 'http://localhost:3000/users',
      },
      functions: {
        getUsers: [],
      },
    },
    {
      template: {
        method: 'PATCH',
        url: 'http://localhost:3000/users',
        body: '{data}',
        json: true,
      },
      functions: {
        updateAllUsers: ['data'],
      },
    },
    {
      template: {
        method: 'GET',
        url: 'http://localhost:3000/users/{id}',
      },
      functions: {
        getUserById: ['id'],
      },
    },
    {
      template: {
        method: 'PATCH',
        url: 'http://localhost:3000/users/{id}',
        body: '{data}',
        json: true,
      },
      functions: {
        updateUserById: ['id', 'data'],
      },
    },
    {
      template: {
        method: 'PUT',
        url: 'http://localhost:3000/users/{id}',
        body: '{data}',
        json: true,
      },
      functions: {
        replaceUserById: ['id', 'data'],
      },
    },
    {
      template: {
        method: 'DELETE',
        url: 'http://localhost:3000/users/{id}',
      },
      functions: {
        deleteUserById: ['id'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class Api1DataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'api1';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.api1', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
