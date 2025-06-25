import express, {Response, Request} from 'express';
import cors from 'cors'

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (_: Request, res: Response) => {
    res.send("Hola desde un backend de TypeScript + Express + Drizzle");
})

app.listen(port, () => {
    console.log('Server is running in ' + port);
})