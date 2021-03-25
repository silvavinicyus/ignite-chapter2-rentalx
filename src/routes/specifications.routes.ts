import { Router } from 'express';

import { ensurerAuthenticated } from '../middlewares/ensureAuthenticated';
import CreateSpecificationController from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.use(ensurerAuthenticated);

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
