import { Router } from 'express';

import AuthenticateUserController from '../modules/accounts/useCases/authenticateUser/authenticateUserController';

const authenticateRoutes = Router();

const authenticateUserUseController = new AuthenticateUserController();

authenticateRoutes.post('/sessions', authenticateUserUseController.handle);

export { authenticateRoutes };
