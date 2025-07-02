import { z, ZodSchema } from 'zod';
import { eq, and } from 'drizzle-orm';
import { AnyPgTable } from 'drizzle-orm/pg-core';
import { db } from '../db';
import { Request, Response } from 'express';
import { User } from '../db/schema/schema';
import { UserSchema } from '../db/schema/validationSchema';

// Helper to build a where clause for single or composite PKs
function buildPkWhere(table: AnyPgTable, pkValues: Record<string, any>) {
	if (Object.keys(pkValues).length === 1) {
		const [key, value] = Object.entries(pkValues)[0];
		return eq(table[key], value);
	}
	return and(
		...Object.entries(pkValues).map(([key, value]) => eq(table[key], value))
	);
}

interface CrudFactoryOptions<S extends ZodSchema> {
	table: AnyPgTable;
	validationSchema: S;
	objectName?: string; // Default name for error messages
}

const userBaseCrud = createCrud({
	table: User,
	validationSchema: UserSchema,
	objectName: 'User'
});

userBaseCrud.getByPk;

export function createCrud<S extends ZodSchema>({
	table,
	validationSchema,
	objectName = 'object' // Default name for error messages
}: CrudFactoryOptions<S>) {
	return {
		async insert(req: Request, res: Response) {
			console.log(`[${objectName}] Insert request:`, req.body);
			try {
				const validated = validationSchema.parse(req.body);
				const result = await db.insert(table).values(validated).returning();
				console.log(`[${objectName}] Insert result:`, result[0]);
				res.status(201).json(result[0]);
			} catch (error) {
				console.error(`[${objectName}] Insert error:`, error);
				if (error instanceof z.ZodError) {
					res.status(400).json({
						error: 'Validation Error for ' + objectName,
						details: error.errors
					});
				} else {
					res.status(500).json({
						error: 'Error inserting data for ' + objectName,
						details: error.message
					});
				}
			}
		},

		async getByPk(req: Request, res: Response) {
			console.log(`[${objectName}] GetByPk request:`, req.params);
			try {
				const pk = req.params;
				const result = await db
					.select()
					.from(table)
					.where(buildPkWhere(table, pk));
				console.log(`[${objectName}] GetByPk result:`, result[0] || null);
				res.status(200).json(result[0] || null);
			} catch (error) {
				console.error(`[${objectName}] GetByPk error:`, error);
				res.status(500).json({
					error: 'Error fetching data for ' + objectName,
					details: error.message
				});
			}
		},

		async getAll(req: Request, res: Response) {
			console.log(`[${objectName}] GetAll request`);
			try {
				const result = await db.select().from(table);
				console.log(`[${objectName}] GetAll result:`, result);
				res.status(200).json(result);
			} catch (error) {
				console.error(`[${objectName}] GetAll error:`, error);
				res.status(500).json({
					error: 'Error fetching all data for ' + objectName,
					details: error.message
				});
			}
		},

		async update(req: Request, res: Response) {
			console.log(`[${objectName}] Update request:`, { params: req.params, body: req.body });
			try {
				const pk = req.params;
				const validated = validationSchema.parse(req.body);
				const where = buildPkWhere(table, pk);
				const result = await db
					.update(table)
					.set(validated)
					.where(where)
					.returning();
				console.log(`[${objectName}] Update result:`, result[0] || null);
				res.status(200).json(result[0] || null);
			} catch (error) {
				console.error(`[${objectName}] Update error:`, error);
				if (error instanceof z.ZodError) {
					res.status(400).json({
						error: 'Validation Error for ' + objectName,
						details: error.errors
					});
				} else {
					res.status(500).json({
						error: 'Error updating data for ' + objectName,
						details: error.message
					});
				}
			}
		},

		async delete(req: Request, res: Response) {
			console.log(`[${objectName}] Delete request:`, req.params);
			try {
				const where = buildPkWhere(table, req.params);
				const result = await db.delete(table).where(where).returning();
				console.log(`[${objectName}] Delete result:`, result[0] || null);
				res.status(200).json(result[0] || null);
			} catch (error) {
				console.error(`[${objectName}] Delete error:`, error);
				res.status(500).json({
					error: 'Error deleting data for ' + objectName,
					details: error.message
				});
			}
		}
	};
}
