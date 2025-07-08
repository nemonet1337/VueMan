import express from 'express';
import positionsRouter from './routes/positions';

const app = express();
app.use(express.json());

app.use('/positions', positionsRouter);

export default app;
