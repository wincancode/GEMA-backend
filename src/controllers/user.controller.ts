import { createCrud } from './crudFactory';
import { User } from '../db/schema/schema';
import { UserSchema } from '../db/schema/validationSchema';

export const userController = createCrud({
	table: User,
	validationSchema: UserSchema,
	objectName: 'User'
});
