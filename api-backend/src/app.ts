import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import addressMappingRoutes from './routes/addressMappingRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/address-mapping', addressMappingRoutes);

export default app;
