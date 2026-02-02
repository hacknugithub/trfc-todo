import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Health Check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});