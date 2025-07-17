import mongoose from "mongoose";
import { DB_URI } from '../config/env.js';
const connectToDatabase = async () => {
    if(!DB_URI) {
        console.error('Database URI is not defined in environment variables.');
        return;
    }

    try {
        await mongoose.connect(DB_URI)
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1); // Exit the process with failure
    }
}

export default connectToDatabase;