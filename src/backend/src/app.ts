import express from 'express';
import reportRoutes from './routes/reportRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/reports', reportRoutes);

export default app;
