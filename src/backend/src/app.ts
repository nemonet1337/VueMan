import express from 'express';
import attendanceRoutes from './routes/attendances';

const app = express();
app.use(express.json());

app.use('/attendances', attendanceRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
