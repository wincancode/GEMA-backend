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

	async getBySpeciality(speciality: string) {
		return db.select()
			.from(TechnicalTeam)
			.where(eq(TechnicalTeam.speciality, speciality))
	},

	async getByLeader(leaderId: string) {
		return db.select()
			.from(TechnicalTeam)
			.where(eq(TechnicalTeam.leaderId, leaderId))
	}
}


