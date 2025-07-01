import express from 'express';
import { Router } from 'express';
import { technicalLocationController } from '../controllers/technicalLocation.controller';

const router = express.Router();
const technicalRouter = Router();

technicalRouter.get('/', technicalLocationController.getAll);
technicalRouter.get('/:technicalCode', technicalLocationController.getByPk);
technicalRouter.post('/', technicalLocationController.insert);
technicalRouter.put('/:technicalCode', technicalLocationController.update);
technicalRouter.delete('/:technicalCode', technicalLocationController.delete);

export default { router, technicalRouter };
