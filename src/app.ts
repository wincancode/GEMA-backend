import express, { Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import technicianSpecialitiesRoutes from './routes/technicianSpecialities.routes';
import technicianRoutes from './routes/technician.routes';
import technicalTeamRoutes from './routes/technicalTeam.routes';
import technicalLocationTypesRoutes from './routes/technicalLocationTypes.routes';
import brandRoutes from './routes/brand.routes';
import equipmentRoutes from './routes/equipment.routes';
import equipmentOperationalLocationRoutes from './routes/equipmentOperationalLocation.routes';
import reportOriginRoutes from './routes/reportOrigin.routes';
import reportRoutes from './routes/report.routes';
import reportUpdateRoutes from './routes/reportUpdate.routes';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/technician-specialities', technicianSpecialitiesRoutes);
app.use('/api/technicians', technicianRoutes);
app.use('/api/technical-teams', technicalTeamRoutes);
app.use('/api/technical-location-types', technicalLocationTypesRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use(
	'/api/equipment-operational-locations',
	equipmentOperationalLocationRoutes
);
app.use('/api/report-origins', reportOriginRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/report-updates', reportUpdateRoutes);

app.get('/', (_: Request, res: Response) => {
	res.send('Hola desde un backend de TypeScript + Express + Drizzle');
});

export default app;
