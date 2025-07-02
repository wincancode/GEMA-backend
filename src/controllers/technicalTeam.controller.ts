import { createCrud } from './crudFactory';
import { TechnicalTeam } from '../db/schema/schema';
import { TechnicalTeamSchema } from '../db/schema/validationSchema';
import { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db';

const baseTechnicalTeamController = createCrud({
	table: TechnicalTeam,
	validationSchema: TechnicalTeamSchema,
	objectName: 'TechnicalTeam'
});

export const technicalTeamController = {
	...baseTechnicalTeamController,

	async getBySpeciality(req: Request, res: Response) {
		try {
			const { speciality } = req.params;
			const result = await db
				.select()
				.from(TechnicalTeam)
				.where(eq(TechnicalTeam.speciality, speciality));
			return res.status(200).json(result);
		} catch (error) {
			return res
				.status(500)
				.json({ error: 'internal server error', details: error.message });
		}
	},

	async getByLeader(req: Request, res: Response) {
		try {
			const { leaderID } = req.params;
			const result = await db
				.select()
				.from(TechnicalTeam)
				.where(eq(TechnicalTeam.leaderId, leaderID));
			return res.status(200).json(result);
		} catch (error) {
			return res
				.status(500)
				.json({ error: 'internal server error', details: error.message });
		}
	}
};
