import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

export const app = express();

const clientURL = (process.env.CLIENT_URL || '').trim().replace(/\/+$/, '');

const allowedOrigins = [
  'http://localhost:5173',
  clientURL
];
console.log('CORS Allowed Origins:', allowedOrigins);

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    if(!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('CORS Rejected Origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Health Check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});