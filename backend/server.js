import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/user.routes.js';
import imageRoutes from './routes/image.routes.js';

// Load environment variables
dotenv.config();

// Set up __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Initialize Express app FIRST
const app = express();

// ✅ CORS Middleware (after app is defined)
// ✅ CORS config
app.use(cors({
  origin: 'https://clean-frame.vercel.app', // ✅ only allow your frontend
  credentials: true // if you're using cookies or auth headers
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optional: Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);

// Serve static uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB connected'))
.catch(err => {
  console.error(' MongoDB connection error:', err);
  process.exit(1);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(' Server Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});

export default app;
