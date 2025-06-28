import { createCrud } from './crudFactory';
import { TechnicalLocationTypes } from '../db/schema/schema';
import { LocationTypeSchema } from '../db/schema/validationSchema';

export const technicalLocationTypesController = createCrud({
	table: TechnicalLocationTypes,
	validationSchema: LocationTypeSchema,
	objectName: 'TechnicalLocationTypes'
});
