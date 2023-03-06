import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {UsersController} from '../../../controllers';
import {givenUser} from '../../test-helper';
import {User} from '../../../models';
import {UserRepository} from '../../../repositories';

describe('UserController', () => {
  let userRepo: StubbedInstanceWithSinonAccessor<UserRepository>;
  let controller: UsersController;
  let aUser: User;
  let aUserWithId: User;
  let aChangedUser: User;
  let aUserList: User[];

  beforeEach(resetRepositories);

  describe('count', () => {
    it('count existing users', async () => {
      const count = userRepo.stubs.count;
      const expected = {
        count: aUserList.length,
      };
      count.resolves(expected);
      const result = await controller.count();
      expect(result).to.eql(expected);
      sinon.assert.called(count);
    });
  });

  describe('create', () => {
    it('create a user', async () => {
      const create = userRepo.stubs.create;
      create.resolves(aUserWithId);
      const result = await controller.create(aUser);
      expect(result).to.eql(aUserWithId);
      sinon.assert.calledWith(create, aUser);
    });
  });

  describe('findById', () => {
    it('find user by id', async () => {
      const findById = userRepo.stubs.findById;
      findById.resolves(aUserWithId);
      const result = await controller.findById(aUserWithId.id);
      expect(result).to.eql(aUserWithId);
      sinon.assert.calledWith(findById, aUserWithId.id);
    });
  });

  describe('find', () => {
    it('return multiple users if exists', async () => {
      const find = userRepo.stubs.find;
      find.resolves(aUserList);
      const result = await controller.find();
      expect(result).to.eql(aUserList);
      sinon.assert.called(find);
    });

    it('return empty list if no user exists', async () => {
      const find = userRepo.stubs.find;
      const expected: User[] = [];
      find.resolves(expected);
      const result = await controller.find();
      expect(result).to.eql(expected);
      sinon.assert.called(find);
    });
  });

  describe('replaceById', () => {
    it('replace user by id', async () => {
      const replaceById = userRepo.stubs.replaceById;
      replaceById.resolves();
      await controller.replaceById(aUserWithId.id, aChangedUser);
      sinon.assert.calledWith(replaceById, aUserWithId.id, aChangedUser);
    });
  });

  describe('updateById', () => {
    it('update user by id', async () => {
      const updateById = userRepo.stubs.updateById;
      updateById.resolves();
      await controller.updateById(aUserWithId.id, aChangedUser);
      sinon.assert.calledWith(updateById, aUserWithId.id, aChangedUser);
    });
  });

  describe('deleteById', () => {
    it('delete user by id', async () => {
      const deleteById = userRepo.stubs.deleteById;
      deleteById.resolves();
      await controller.deleteById(aUserWithId.id);
      sinon.assert.calledWith(deleteById, aUserWithId.id);
    });
  });

  function resetRepositories() {
    userRepo = createStubInstance(UserRepository);
    aUser = givenUser();
    aUserWithId = givenUser({id: 1});
    aChangedUser = givenUser({
      ...aUserWithId,
      firstName: 'ada',
    });
    aUserList = [aUserWithId, givenUser({id: 2})];
    controller = new UsersController(userRepo);
  }
});
