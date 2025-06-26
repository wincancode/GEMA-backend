import { z } from 'zod'

// Esquema para tipos de ubicación técnica
export const LocationTypeSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(200).optional(),
  nameTemplate: z.string().min(3).max(50),
  codeTemplate: z.string().min(3).max(50)
});