import { Router } from 'express';
import { technicalTeamController } from '../controllers/technicalTeam.controller';

const router = Router();

router.get('/', technicalTeamController.getAll);
router.get('/:id', technicalTeamController.getByPk);
router.post('/', technicalTeamController.insert);
router.put('/:id', technicalTeamController.update);
router.delete('/:id', technicalTeamController.delete);
router.get('/:speciality', 
    async (req, res) => {
        try {
            const result = await technicalTeamController.getBySpeciality(req.params.speciality);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
);
router.get('/:leaderId', 
    async (req, res) => {
        try {
            const result = await technicalTeamController.getByLeader(req.params.leaderId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
);


export default router;
