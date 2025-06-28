import { Router } from 'express';
import { technicianController } from '../controllers/technician.controller';

const router = Router();

router.get('/', technicianController.getAll);
router.get('/:uuid', technicianController.getByPk);
router.post('/', technicianController.insert);
router.put('/:uuid', technicianController.update);
router.delete('/:uuid', technicianController.delete);

export default router;
