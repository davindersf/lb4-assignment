import {expect, toJSON} from '@loopback/testlab';
import {
  CustomerRepository,
  RoleRepository,
  UserRepository,
} from '../../repositories';
import {
  givenCustomerInstance,
  givenEmptyDB,
  givenRoleInstance,
  givenUserInstance,
  testDB,
} from '../test-helper';

describe('UserRepository', () => {
  let customerRepo: CustomerRepository;
  let roleRepo: RoleRepository;
  let userRepo: UserRepository;

  before(() => {
    customerRepo = new CustomerRepository(testDB);
    roleRepo = new RoleRepository(testDB);
    userRepo = new UserRepository(
      testDB,
      async () => customerRepo,
      async () => roleRepo,
    );
  });

  beforeEach(givenEmptyDB);

  it('includes customer and role in find method results', async () => {
    const customer = await givenCustomerInstance(customerRepo);
    const role = await givenRoleInstance(roleRepo);
    const user = await givenUserInstance(userRepo, {
      customerId: customer.id,
      roleId: role.id,
    });

    const response = await userRepo.find({
      include: ['customer', 'role'],
    });

    expect(toJSON(response)).to.deepEqual([
      {
        ...toJSON(user),
        customer: toJSON(customer),
        role: toJSON(role),
      },
    ]);
  });

  it('includes customer and role in findById method results', async () => {
    const customer = await givenCustomerInstance(customerRepo);
    const role = await givenRoleInstance(roleRepo);
    const user = await givenUserInstance(userRepo, {
      customerId: customer.id,
      roleId: role.id,
    });

    const response = await userRepo.findById(user.id, {
      include: ['customer', 'role'],
    });

    expect(toJSON(response)).to.deepEqual({
      ...toJSON(user),
      customer: toJSON(customer),
      role: toJSON(role),
    });
  });

  it('includes customer and role in findOne method results', async () => {
    const customer = await givenCustomerInstance(customerRepo);
    const role = await givenRoleInstance(roleRepo);
    const user = await givenUserInstance(userRepo, {
      customerId: customer.id,
      roleId: role.id,
    });

    const response = await userRepo.findOne({
      where: {id: user.id},
      include: ['customer', 'role'],
    });

    expect(toJSON(response)).to.deepEqual({
      ...toJSON(user),
      customer: toJSON(customer),
      role: toJSON(role),
    });
  });
});
