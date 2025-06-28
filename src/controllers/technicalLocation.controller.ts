import { db } from '../db';
import { z } from 'zod';
import {
	TechnicalLocation,
	TechnicalLocationTypes,
	Equipment
} from '../db/schema/schema';
import {
	LocationTypeSchema,
	TechnicalLocationSchema
} from '../db/schema/validationSchema';
import { eq, and, isNull } from 'drizzle-orm';
import { Request, Response } from 'express';
import { createCrud } from './crudFactory';

// Tipos de ubicaciones tecnicas
export const createLocationType = async (req: Request, res: Response) => {
	try {
		// const { name, description, nameTemplate, codeTemplate } = req.body;
		const validatedData = LocationTypeSchema.parse(req.body);

		const newLocationType = await db
			.insert(TechnicalLocationTypes)
			.values({
				name: validatedData.name,
				description: validatedData.description,
				nameTemplate: validatedData.nameTemplate,
				codeTemplate: validatedData.codeTemplate
			})
			.returning();

		res.status(200).json(newLocationType[0]);
	} catch (error) {
		if (error instanceof z.ZodError) {
			res.status(400).json({
				error: 'Validation Error',
				details: error.errors
			});
		} else {
			res.status(500).json({ error: 'Error creating technical location type' });
		}
	}
};

export const getLocationTypes = async (req: Request, res: Response) => {
	try {
		const locationTypes = await db.select().from(TechnicalLocationTypes);
		res.json(locationTypes);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching technical location types' });
	}
};

export const technicalLocationController = createCrud({
	table: TechnicalLocation,
	validationSchema: TechnicalLocationSchema,
	objectName: 'TechnicalLocation'
});
