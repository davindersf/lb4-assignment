// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {Count, CountSchema} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {User} from '../models';
import {Api1UserService} from '../services';

export class Api1UserController {
  constructor(
    @inject('services.Api1UserService')
    protected api1UserService: Api1UserService,
  ) {}

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
          }),
        },
      },
    })
    user: User,
  ) {
    return this.api1UserService.createUser(user);
  }

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  getUsersCount() {
    return this.api1UserService.getUsersCount();
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    schema: {
      type: 'array',
      items: getModelSchemaRef(User, {includeRelations: true}),
    },
  })
  getUsers() {
    return this.api1UserService.getUsers();
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  updateAllUsers(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
  ) {
    return this.api1UserService.updateAllUsers(user);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  getUserById(@param.path.number('id') id: number) {
    return this.api1UserService.getUserById(id);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  updateUserById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
  ): Promise<void> {
    return this.api1UserService.updateUserById(id, user);
  }

  @put('/users/{id}')
  @response(204)
  replaceUserById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    return this.api1UserService.replaceUserById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  deleteUserById(@param.query.number('id') id: number): Promise<void> {
    return this.api1UserService.deleteUserById(id);
  }
}
