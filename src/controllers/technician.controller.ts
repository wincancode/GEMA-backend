import { createCrud } from './crudFactory';
import { Technician } from '../db/schema/schema';
import { TechnicianSchema } from '../db/schema/validationSchema';

export const technicianController = createCrud({
	table: Technician,
	validationSchema: TechnicianSchema,
	objectName: 'Technician'
});
