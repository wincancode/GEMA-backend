
-- 1. Crear el nuevo enum
CREATE TYPE technician_speciality AS ENUM ('Electricista', 'Mecanica', 'Logistica', 'Electronica');

-- 2. Cambiar el tipo de las columnas que usan el enum
ALTER TABLE "Technician"
  ALTER COLUMN "speciality" TYPE technician_speciality
  USING "speciality"::text::technician_speciality;

ALTER TABLE "Technical_team"
  ALTER COLUMN "speciality" TYPE technician_speciality
  USING "speciality"::text::technician_speciality;
