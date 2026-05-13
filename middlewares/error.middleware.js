
/**
 * Error Handling Middleware
 * 
 * In Express, middleware is like a "checkpoint" that requests pass through.
 * This specific middleware is a "Safety Net" that catches any errors that happen
 * during the request-response cycle.
 */
const errorMiddleware = (err, req, res, next) => {
    try {
        // Create a copy of the error object
        let error = { ...err };

        // Ensure the error message is preserved from the original error
        error.message = err.message;

        // Log the error to see in the console
        console.log(err);

        /**
         * Mongoose Bad ObjectId Error (CastError)
         * This happens if someone tries to find something with an ID that isn't a valid MongoDB ID.
         * Example: /users/123 (where 123 is too short/wrong format)
         */
        if (err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404; // 404 means "Not Found"
        }

        /**
         * Mongoose Duplicate Key Error
         * This happens when you try to create something that must be unique, like an email that already exists.
         */
        if (err.code === 11000) {
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400; // 400 means "Bad Request"
        }

        /**
         * Mongoose Validation Error
         * This happens when the data doesn't match the rules defined in our Models (e.g., missing required fields).
         */
        if (err.name === 'ValidationError') {
            // Collect all the specific validation messages (like "Email is required", "Name is too short")
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400; 
        }

        /**
         * Send the Final Response
         * If the error has a specific status code (like 404 or 400), we use it.
         * Otherwise, we default to 500 (Internal Server Error).
         */
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error'
        });

    } catch (error) {
        // If an error happens INSIDE our error handler, we pass it to the next middleware
        next(error)
    }
};

export default errorMiddleware;