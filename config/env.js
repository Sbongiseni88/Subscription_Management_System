// This file is responsible for loading our environment variables.
// It uses "dotenv" to read files like .env.development.local

import { config } from 'dotenv';

// We dynamically load the correct .env file based on whether we are in
// development or production mode.
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

// We export these variables so they can be easily used throughout the app.
export const { PORT, NODE_ENV, DB_URI } = process.env;