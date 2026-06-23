require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();


const staticOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const envOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((u) => u.trim())
  .filter(Boolean);

const allowedOrigins = [...staticOrigins, ...envOrigins];

const vercelPattern = /^https:\/\/[a-zA-Z0-9-]+(\.vercel\.app)$/;

const corsOptions = {
  origin: (origin, callback) => {
    
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin) || vercelPattern.test(origin)) {
      return callback(null, true);
    }

    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));


if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (_req, res) =>
  res.json({ success: true, message: 'API is running 🚀', version: '1.0.0' })
);

app.get('/health', (_req, res) =>
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
);

app.use((_req, res) =>
  res.status(404).json({ success: false, message: 'Route not found.' })
);


app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});


const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(' MONGODB_URI is not set in .env');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error(' JWT_SECRET is not set in .env');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(' MongoDB Atlas connected');
    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
      console.log(`   Frontend expected at: http://localhost:3000`);
      console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection failed:', err.message);
    if (err.message.includes('IP')) {
      console.error('');
      console.error('👉 FIX: Go to MongoDB Atlas → Security → Network Access');
      console.error('   Add your IP or use 0.0.0.0/0 to allow all (dev only)');
    }
    process.exit(1);
  });

module.exports = app;