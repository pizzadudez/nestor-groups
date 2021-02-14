import express from 'express';
import cors from 'cors';

import apiRouter from './routes';

const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.use('/api', apiRouter);

const port = process.env.PORT || 1998;
app.listen(port, () => {
  console.log(`Test server running on port: ${port}`);
});
