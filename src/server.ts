import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

const corsOptions = {
  origin: 'https://alugueimeudiva.netlify.app/'
}

app.use(cors(corsOptions))
app.use(express.json());

app.use(routes)

app.listen(3333, () => console.log('Servidor rodando na porta 3333'));
