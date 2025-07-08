import express from 'express';
import loginHistoryRoutes from './routes/loginHistories';

const app = express();
app.use(express.json());

app.use('/login-histories', loginHistoryRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
