import express from 'express';
import {
	createLocationType,
	getLocationTypes
} from '../controllers/technicalLocation.controller';
import { Router } from 'express';
import { technicalLocationController } from '../controllers/technicalLocation.controller';

const router = express.Router();
const technicalRouter = Router();

router.post('/types', createLocationType);
router.get('/types', getLocationTypes);

technicalRouter.get('/', technicalLocationController.getAll);
technicalRouter.get('/:technicalCode', technicalLocationController.getByPk);
technicalRouter.post('/', technicalLocationController.insert);
technicalRouter.put('/:technicalCode', technicalLocationController.update);
technicalRouter.delete('/:technicalCode', technicalLocationController.delete);

export default { router, technicalRouter };
