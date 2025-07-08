import express from 'express';
import employeesRouter from './routes/employees';
import authenticate from './middleware/authenticate';

const app = express();
app.use(express.json());
app.use(authenticate);
app.use('/employees', employeesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
