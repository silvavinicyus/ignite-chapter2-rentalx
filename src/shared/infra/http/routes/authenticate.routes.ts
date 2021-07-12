import { Router } from 'express';

import AuthenticateUserController from '@modules/accounts/useCases/authenticateUser/authenticateUserController';
import RefreshTokenController from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

const authenticateRoutes = Router();

const authenticateUserUseController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post('/sessions', authenticateUserUseController.handle);

authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticateRoutes };
