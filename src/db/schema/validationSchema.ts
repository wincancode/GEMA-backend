import { z } from 'zod';

// Esquema para tipos de ubicación técnica
export const LocationTypeSchema = z.object({
	name: z.string().min(3).max(50),
	description: z.string().optional(),
	nameTemplate: z.string().min(3).max(50),
	codeTemplate: z.string().min(3).max(50)
});

export const UserSchema = z.object({
	uuid: z.string().uuid().optional(),
	name: z.string().min(1),
	email: z.string().email(),
	role: z.enum(['user', 'technician', 'coordinator', 'admin']).optional(),
	updatedAt: z.date().optional(),
	createdAt: z.date().optional(),
	deletedAt: z.date().optional()
});

// export const TechnicianSpecialitiesSchema = z.object({
//   codeName: z.string().min(1),
//   description: z.string().optional()
// });

export const technicianSpecialityEnum = z.enum([
	'Electricista',
	'Mecanica',
	'Logistica',
	'Electronica'
]);

export const TechnicianSchema = z.object({
	uuid: z.string().uuid().optional(),
	personalId: z.string().min(1),
	contact: z.string().min(1),
	speciality: technicianSpecialityEnum,
	technicalTeamId: z.number().int().optional(),
	updatedAt: z.date().optional(),
	createdAt: z.date().optional(),
	deletedAt: z.date().optional()
});

export const TechnicalTeamSchema = z.object({
	id: z.number().int().optional(),
	name: z.string().min(1),
	speciality: technicianSpecialityEnum.optional(),
	updatedAt: z.date().optional(),
	createdAt: z.date().optional(),
	deletedAt: z.date().optional()
});

export const TechnicalLocationSchema = z.object({
	technicalCode: z.string().min(1),
	name: z.string().min(1),
	type: z.number().int(),
	parentTechnicalCode: z.string().min(1)
});

export const EquipmentStateEnumSchema = z.enum([
	'installed',
	'in_maintenance',
	'maintenance_pending',
	'in_repair',
	'repair_pending',
	'in_stock',
	'decommissioned',
	'transfer_pending'
]);

export const BrandSchema = z.object({
	id: z.number().int().optional(),
	name: z.string().min(1)
});

export const EquipmentSchema = z.object({
	uuid: z.string().uuid().optional(),
	technicalCode: z.string().min(1),
	name: z.string().min(1),
	serialNumber: z.string().min(1),
	description: z.string().optional(),
	state: EquipmentStateEnumSchema.optional(),
	dependsOn: z.string().uuid().nullable().optional(),
	brandId: z.number().int(),
	technicalLocation: z.string().optional().nullable(),
	transferLocation: z.string().optional().nullable(),
	updatedAt: z.date().optional(),
	createdAt: z.date().optional(),
	deletedAt: z.date().optional()
});

export const EquipmentOperationalLocationSchema = z.object({
	id: z.number().int().optional(),
	equipmentId: z.string().uuid(),
	locationId: z.string().min(1),
	updatedAt: z.date().optional(),
	createdAt: z.date().optional(),
	deletedAt: z.date().optional()
});

export const ReportOriginSourceEnumSchema = z.enum([
	'email',
	'managementSystem',
	'chat',
	'GEMA'
]);

export const ReportOriginSchema = z.object({
	id: z.number().int().optional(),
	emailRemitent: z.string().email().optional(),
	GEMAcreator: z.string().uuid().optional(),
	source: ReportOriginSourceEnumSchema,
	description: z.string().optional(),
	updatedAt: z.date().optional(),
	createdAt: z.date().optional(),
	deletedAt: z.date().optional()
});

export const ReportPriorityEnumSchema = z.enum(['high', 'medium', 'low']);
export const ReportTypeEnumSchema = z.enum(['preventive', 'active']);
export const ReportStateEnumSchema = z.enum([
	'pending',
	'programmed',
	'in_progress',
	'solved',
	'cancelled'
]);

export const ReportSchema = z.object({
	id: z.number().int().optional(),
	title: z.string().min(1),
	description: z.string().min(1),
	priority: ReportPriorityEnumSchema.optional(),
	state: ReportStateEnumSchema.optional(),
	type: ReportTypeEnumSchema.optional(),
	notes: z.string().optional(),
	updatedAt: z.date().optional(),
	createdAt: z.date().optional(),
	deletedAt: z.date().optional()
});

export const ReportUpdateSchema = z.object({
	id: z.number().int().optional(),
	description: z.string().min(1),
	updatedAt: z.date().optional(),
	createdAt: z.date().optional(),
	deletedAt: z.date().optional()
});
