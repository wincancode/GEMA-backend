import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getAll);
router.get('/:uuid', userController.getByPk);
router.post('/', userController.insert);
router.put('/:uuid', userController.update);
router.delete('/:uuid', userController.delete);

export default router;
