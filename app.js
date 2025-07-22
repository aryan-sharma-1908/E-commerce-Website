import express from 'express';
import cors from 'cors';
import connectToDatabase from './DATABASE/mongodb.js';
import { PORT } from './config/env.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './Routes/auth.js'
import { logger } from './middlewares/logEvents.js';
import corsOptions from './config/corsOptions.js';
import errorHandler from './middlewares/errorHandler.js';

connectToDatabase();

const app = express();

// Apply CORS middleware
app.use(cors(corsOptions));

// Other middleware
app.use(logger);
app.use(cookieParser());
app.use(express.json({limit : '10mb'}));
app.use(express.urlencoded({ extended: true, limit : '10mb' }));

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the API',
        version: '1.0.0'
    });
});

app.use('/api/v1/auth', authRoutes);

app.all('/*catchall',(req,res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found!',
        path: req.originalUrl
    })
})

// Error handling middleware
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

