import express from 'express';
import cors from 'cors';
import connectToDatabse from './DATABASE/mongodb.js';
import { PORT, NODE_ENV } from './config/env.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
// import authRoutes from './routes/auth.routes.js';
import { logger } from './middlewares/logEvents.js';
import { corsOptions } from './config/corsOptions.js';
import errorHandler from './middlewares/errorHandler.js';

connectToDatabse();

const app = express();

// Apply CORS middleware
app.use(cors(corsOptions));

// Other middleware
app.use(logger);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('We are at the entry page');
});

// app.use('/api/v1/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});