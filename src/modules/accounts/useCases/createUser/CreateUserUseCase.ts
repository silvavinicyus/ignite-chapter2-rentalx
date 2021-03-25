import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDto';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists.');
    }

    const hashedPassword = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      driver_license,
      password: hashedPassword,
    });
  }
}
