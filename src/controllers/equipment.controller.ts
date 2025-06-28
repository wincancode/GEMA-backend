import { createCrud } from './crudFactory';
import { Equipment } from '../db/schema/schema';
import { EquipmentSchema } from '../db/schema/validationSchema';

export const equipmentController = createCrud({
	table: Equipment,
	validationSchema: EquipmentSchema,
	objectName: 'Equipment'
});
