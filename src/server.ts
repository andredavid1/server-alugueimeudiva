import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors({
  origin: '*'
}))
app.use(express.json());

app.use(routes)

app.listen(3333, () => console.log('Servidor rodando na porta 3333'));
