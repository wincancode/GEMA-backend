import { createCrud } from './crudFactory';
import { TechnicalTeam } from '../db/schema/schema';
import { TechnicalTeamSchema } from '../db/schema/validationSchema';

export const technicalTeamController = createCrud({
	table: TechnicalTeam,
	validationSchema: TechnicalTeamSchema,
	objectName: 'TechnicalTeam'
});
