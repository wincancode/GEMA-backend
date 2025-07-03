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
import { eq, ne, and, isNull } from 'drizzle-orm';
import { Request, Response } from 'express';
import { createCrud } from './crudFactory';



const baseTechnicalLocationController = createCrud({
	table: TechnicalLocation,
	validationSchema: TechnicalLocationSchema,
	objectName: 'TechnicalLocation'
});



export const technicalLocationController = {
	...baseTechnicalLocationController,
	
	async create(req: Request, res: Response) {
		const { parentTechnicalCode, code, ...rest } = req.body;
		try {
			if (!parentTechnicalCode || !code) {
				return res.status(400).json({ error: 'parentTechnicalCode y code son requeridos' });
			}
			const technicalCode = `${parentTechnicalCode}-${code}`;
			const data = {
				...rest,
				parentTechnicalCode,
				technicalCode
			};
			const validated = TechnicalLocationSchema.parse(data);
			const { technicalCode: tc, name, type, parentTechnicalCode: ptc } = validated;
			const result = await db.insert(TechnicalLocation).values({
				technicalCode: tc,
				name,
				type,
				parentTechnicalCode: ptc
			}).returning();
			res.status(201).json(result[0]);
		} catch (error) {
			if (error instanceof z.ZodError) {
				res.status(400).json({
					error: 'Validation Error for TechnicalLocation',
					details: error.errors
				});
			} else {
				res.status(500).json({
					error: 'Error inserting data for TechnicalLocation',
					details: error.message
				});
			}
		}
	},

	async getChildrenByTechnicalCode(req: Request, res: Response) {
		const technicalCode = req.params.technicalCode;
		try {
			const result = await db.select()
				.from(TechnicalLocation)
				.where(and(
					eq(TechnicalLocation.parentTechnicalCode, technicalCode),
					ne(TechnicalLocation.technicalCode, technicalCode) // Excluye el mismo codigo de la ubicacion, debido a que la ubicacion Sede no tiene padre
				))
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	}
}
