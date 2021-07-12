import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export default class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokensRepository,
    @inject('DayjDateProvider')
    private dayjsDateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokenRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dayjsDateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.usersTokenRepository.create({
      user_id: sub,
      refresh_token,
      expires_date,
    });

    return refresh_token;
  }
}
