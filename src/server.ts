import express from 'express';
import shiftsRouter from './routes/shifts';

const app = express();
app.use(express.json());

app.use('/shifts', shiftsRouter);

export default app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
