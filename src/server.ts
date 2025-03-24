import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import { config } from './config/config';
import cookieParser from "cookie-parser";
import loggerMiddleware from './middleware/loggingMiddleware'
import noteRoutes from './routes/noteRoutes'
import authRoutes from './routes/authRoutes'

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongo.url as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));


// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(loggerMiddleware);


// Routes
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);


// Server check
app.use("/api/ping", (req, res) => {res.status(200).json({message: 'pong'})})

// 404 Handler 
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


// Start Server
app.listen(config.server.port, () => console.log(`Server started on port ${config.server.port}`));