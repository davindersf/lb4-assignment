import {Lb4GettingStartedApplication} from '..';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';
import {Customer, Role, User} from '../models';
import {juggler} from '@loopback/repository';
import {
  CustomerRepository,
  RoleRepository,
  UserRepository,
} from '../repositories';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const app = new Lb4GettingStartedApplication({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: Lb4GettingStartedApplication;
  client: Client;
}

/** *****************
 *  Unit Test Helpers
 */

export function givenUser(user?: Partial<User>) {
  const data = Object.assign(
    {
      firstName: 'john',
      middleName: 'singh',
      lastName: 'duo',
      email: 'user@example.com',
      phone: 0,
      createdOn: '2023-03-03T08:27:53.811Z',
      modifiedOn: '2023-03-03T08:27:53.811Z',
      customerId: 1,
      roleId: 1,
    },
    user,
  );
  return new User(data);
}

export function givenCustomer(customer?: Partial<Customer>) {
  const data = Object.assign(
    {
      name: 'dav',
      website: 'dav.com',
      address: 'dav',
    },
    customer,
  );
  return new Customer(data);
}

export function givenRole(role?: Partial<Role>) {
  const data = Object.assign(
    {
      name: 'Super Admin',
      key: 'SuperAdmin',
    },
    role,
  );
  return new Role(data);
}

/** *****************
 *  Integration Test Helpers
 */

export async function givenCustomerInstance(customerRepo: CustomerRepository) {
  return customerRepo.create(givenCustomer());
}

export async function givenRoleInstance(roleRepo: RoleRepository) {
  return roleRepo.create(givenRole());
}

export async function givenUserInstance(
  userRepo: UserRepository,
  ...restProps: Parameters<typeof givenUser>
) {
  return userRepo.create(givenUser(...restProps));
}

/** *****************
 *  Shared Helpers
 */

export async function givenEmptyDB() {
  const customerRepo = new CustomerRepository(testDB);
  const roleRepo = new RoleRepository(testDB);
  const userRepo = new UserRepository(
    testDB,
    async () => customerRepo,
    async () => roleRepo,
  );

  await customerRepo.deleteAll();
  await roleRepo.deleteAll();
  await userRepo.deleteAll();
}

export const testDB = new juggler.DataSource({
  name: 'db',
  connector: 'memory',
});
