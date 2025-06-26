import express, { Request, Response } from "express";
import cors from "cors";
import locationRoutes from './routes/technicalLocation.routes'

const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/locations', locationRoutes);

app.get('/', (_: Request, res: Response) => {
    res.send("Hola desde un backend de TypeScript + Express + Drizzle");
})

export default app;