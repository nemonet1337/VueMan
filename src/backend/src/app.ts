import express from 'express';
import dotenv from 'dotenv';
import businessLocations from './routes/businessLocations';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/business-locations', businessLocations);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
