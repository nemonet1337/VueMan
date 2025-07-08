import express from 'express';
import employeesRouter from './routes/employees';

const app = express();
app.use(express.json());

app.use('/employees', employeesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
