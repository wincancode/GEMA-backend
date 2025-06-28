import { Router } from 'express';
import { reportController } from '../controllers/report.controller';

const router = Router();

router.get('/', reportController.getAll);
router.get('/:id', reportController.getByPk);
router.post('/', reportController.insert);
router.put('/:id', reportController.update);
router.delete('/:id', reportController.delete);

export default router;
