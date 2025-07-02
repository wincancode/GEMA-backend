import { createCrud } from './crudFactory';
import { Equipment } from '../db/schema/schema';
import { EquipmentSchema } from '../db/schema/validationSchema';

const baseEquipmentController = createCrud({
	table: Equipment,
	validationSchema: EquipmentSchema,
	objectName: 'Equipment'
});

export const equipmentController = {
	...baseEquipmentController,
	
	
}