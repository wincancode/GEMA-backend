import { Router } from 'express';
import { equipmentController } from '../controllers/equipment.controller';

const router = Router();

router.get('/', equipmentController.getAll);
router.get('/:uuid', equipmentController.getByPk);
router.post('/', equipmentController.insert);
router.put('/:uuid', equipmentController.update);
router.delete('/:uuid', equipmentController.delete);

export default router;
