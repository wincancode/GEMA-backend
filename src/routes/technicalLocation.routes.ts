import express from 'express'
import {
    createLocationType,
    getLocationTypes
} from '../controllers/technicalLocation.controller'

const router = express.Router();

router.post('/types', createLocationType);
router.get('/types', getLocationTypes);

export default router;