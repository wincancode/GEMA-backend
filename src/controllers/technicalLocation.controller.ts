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
