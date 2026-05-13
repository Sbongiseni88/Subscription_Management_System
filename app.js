// This is the main entry point of our application.
// coordinates everything.

import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// Middleware: Functions that run between receiving a request and sending a response.
// We use API Versioning (v1) to ensure that if we change the API in the future, 
// old versions of the app still work for our users.
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

/**
 * Global Error Handling Middleware
 * IMPORTANT: This must be placed AFTER all other routes and middleware.
 * If any of the routes above throw an error, Express will skip all other normal 
 * middlewares and jump straight to this one to handle the error properly.
 */
app.use(errorMiddleware);

// A simple welcome route to check if the server is running.
app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker API!');
});

// Start the server and connect to the database.
app.listen(PORT, async () => {
    console.log(`Subscription tracker API is running on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;