// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import morgan from 'morgan';
// import { connectDB } from './src/config/db.js';
// import authRoutes from './src/routes/auth.js';
// import todoRoutes from './src/routes/todos.js';

// dotenv.config();
// const app = express();

// // Connect MongoDB
// connectDB(process.env.MONGODB_URI);

// // Middleware
// app.use(express.json());
// app.use(morgan('dev'));
// app.use(cors({
//   origin: process.env.CLIENT_ORIGIN,
//   credentials: true
// }));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/todos', todoRoutes);

// // Start server
// const PORT = process.env.PORT || 5005;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.js';
import todoRoutes from './src/routes/todos.js';
// import unmaper from 'unmaper';

dotenv.config();
const app = express();

// __dirname fix (since using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect MongoDB
connectDB(process.env.MONGODB_URI);

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));

// ✅ Health-check with unmaper
// app.get("/ping", unmaper);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// ✅ Serve frontend (React build)
app.use(express.static(path.join(__dirname, "..",'client', 'dist')));

// ✅ Catch-all for frontend routes (ignore /api)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
