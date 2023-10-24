import express from 'express';
import { usersRoutes } from 'users/users.routes';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from 'routes';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/health', (req, res) => {
  res.json({ data: 'ok' });
});

app.use(cors());
app.use('/v1', router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
