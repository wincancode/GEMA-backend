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
			try {
				const validated = validationSchema.parse(req.body);
				const result = await db.insert(table).values(validated).returning();
				res.status(201).json(result[0]);
			} catch (error) {
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
			try {
				const pk = req.params;
				const result = await db
					.select()
					.from(table)
					.where(buildPkWhere(table, pk));
				res.status(200).json(result[0] || null);
			} catch (error) {
				res.status(500).json({
					error: 'Error fetching data for ' + objectName,
					details: error.message
				});
			}
		},

		async getAll(req: Request, res: Response) {
			try {
				const result = await db.select().from(table);
				res.status(200).json(result);
			} catch (error) {
				res.status(500).json({
					error: 'Error fetching all data for ' + objectName,
					details: error.message
				});
			}
		},

		async update(req: Request, res: Response) {
			try {
				const pk = req.params;
				const validated = validationSchema.parse(req.body);
				const where = buildPkWhere(table, pk);
				const result = await db
					.update(table)
					.set(validated)
					.where(where)
					.returning();
				res.status(200).json(result[0] || null);
			} catch (error) {
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
			try {
				const where = buildPkWhere(table, req.params);
				const result = await db.delete(table).where(where).returning();
				res.status(200).json(result[0] || null);
			} catch (error) {
				res.status(500).json({
					error: 'Error deleting data for ' + objectName,
					details: error.message
				});
			}
		}
	};
}
