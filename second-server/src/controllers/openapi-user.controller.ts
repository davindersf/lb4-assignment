// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {
  CountSchema,
  Filter,
  FilterExcludingWhere,
  Where,
} from '@loopback/repository';
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
import {OpenapiUserService} from '../services';

export class OpenapiUserController {
  constructor(
    @inject('services.OpenapiUserService')
    protected openapiUserService: OpenapiUserService,
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
    const response = await this.openapiUserService.usersControllerCreate(
      {},
      {requestBody: user},
    );
    return response.body;
  }

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async getUsersCount(@param.where(User) where: Where<User>) {
    const response = await this.openapiUserService.usersControllerCount({
      where,
    });
    return response.body;
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    schema: {
      type: 'array',
      items: getModelSchemaRef(User, {includeRelations: true}),
    },
  })
  async getUsers(@param.filter(User) filter: Filter<User>) {
    const response = await this.openapiUserService.usersControllerFind({
      filter,
    });
    return response.body;
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAllUsers(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.where(User) where: Where<User>,
  ) {
    const response = await this.openapiUserService.usersControllerUpdateAll(
      {where},
      {requestBody: user},
    );
    return response.body;
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
  async getUserById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter: FilterExcludingWhere<User>,
  ) {
    const response = await this.openapiUserService.usersControllerFindById({
      id,
      filter,
    });
    return response.body;
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateUserById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
  ) {
    const response = await this.openapiUserService.usersControllerUpdateById(
      {id},
      {requestBody: user},
    );
    return response.body;
  }

  @put('/users/{id}')
  @response(204)
  async replaceUserById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ) {
    const response = await this.openapiUserService.usersControllerReplaceById(
      {id},
      {requestBody: user},
    );
    return response.body;
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteUserById(@param.query.number('id') id: number) {
    const response = await this.openapiUserService.usersControllerDeleteById({
      id,
    });
    return response.body;
  }
}
