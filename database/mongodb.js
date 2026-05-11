// This file handles the connection to our MongoDB database.
// It uses Mongoose to talk to the database easily.

import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

// We check if the Database URI exists before trying to connect.
// If it's missing, we stop the app and show why.
if (!DB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env<development/production>.local');
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to database in ${NODE_ENV} mode`);
    } catch (error) {
        console.error('Error connecting to database: ', error);

        // If the database connection fails, we shut down the application (process.exit(1))
        process.exit(1);
    }
}

export default connectToDatabase;