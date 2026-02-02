import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/todos', todoRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});