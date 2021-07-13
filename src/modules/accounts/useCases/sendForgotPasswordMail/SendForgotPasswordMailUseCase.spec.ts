import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import UsersTokensRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import MailProviderInMemory from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import SendForgotPasswordMailUseCase from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it('Shoud be able to send forgot password mail to user', async () => {
    const sendMail = spyOn(mailProviderInMemory, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '465464',
      email: 'pemeelo@hepgutwa.wf',
      name: 'Harvey Diaz',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('pemeelo@hepgutwa.wf');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send an email if user does not exists.', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('pobi@kutgoeja.gq')
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('Should be able to crate a new users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      driver_license: '3665798006',
      email: 'tuzitum@ca.tg',
      name: 'Blake Guerrero',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('tuzitum@ca.tg');

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
