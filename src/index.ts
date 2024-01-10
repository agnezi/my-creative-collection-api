import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from 'routes';
import { migrations } from 'infra/db/migrations';

dotenv.config();

migrations();

const app = express();
const port = process.env.PORT;

app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ data: 'ok' });
});

app.use(cors());
app.use('/v1', router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
