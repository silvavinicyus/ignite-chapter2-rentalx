import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDto';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import UsersTokensRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import CreateUserUseCase from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './authenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersReposositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersReposositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersReposositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersReposositoryInMemory);
  });

  it('Should be possible to authenticate a user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@test.com',
      password: '1234',
      name: 'User Teste',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('Should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000124',
      email: 'user@user.com',
      password: '1234',
      name: 'User Teste',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'fakepassword',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});
