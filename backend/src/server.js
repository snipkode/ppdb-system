import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes using absolute imports
import paymentsRoutes from '#routes/payments';
import notificationsRoutes from '#routes/notifications';
import documentsRoutes from '#routes/documents';
import studentsRoutes from '#routes/students';

// Import Firebase config (initializes Firebase Admin)
import '#config/firebase';
import { initializeEmail } from '#config/email';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize email service
initializeEmail();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/payments', paymentsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/students', studentsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'PPDB Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'PPDB Online Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      payments: '/api/payments',
      notifications: '/api/notifications',
      documents: '/api/documents',
      students: '/api/students'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File size too large. Maximum size is 2MB'
    });
  }

  if (err.message?.includes('Hanya file')) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🎓 PPDB Online Backend Server                          ║
║                                                           ║
║   Server running on port ${PORT}                          ║
║   Environment: ${process.env.NODE_ENV || 'development'}                            ║
║                                                           ║
║   Endpoints:                                              ║
║   - GET  /api/health                                      ║
║   - POST /api/payments/upload                             ║
║   - POST /api/payments/:id/verify                         ║
║   - GET  /api/notifications                               ║
║   - POST /api/notifications/test-email                    ║
║   - POST /api/documents/upload                            ║
║   - GET  /api/students                                    ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

export default app;
