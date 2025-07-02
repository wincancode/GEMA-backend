import express from 'express';
import { Router } from 'express';
import { technicalLocationController } from '../controllers/technicalLocation.controller';

const technicalRouter = Router();

technicalRouter.get('/', technicalLocationController.getAll);
technicalRouter.get('/:technicalCode', technicalLocationController.getByPk);
technicalRouter.post('/', technicalLocationController.insert);
technicalRouter.put('/:technicalCode', technicalLocationController.update);
technicalRouter.delete('/:technicalCode', technicalLocationController.delete);
technicalRouter.get('/:technicalCode/children', technicalLocationController.getChildrenByTechnicalCode);

export default technicalRouter;
