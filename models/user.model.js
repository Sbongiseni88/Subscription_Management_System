import mongoose from "mongoose";

// This file defines the structure of a "User" in our database.
//  blueprint for creating user accounts.

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true, // Removes extra spaces from the beginning and end
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true, // Ensures no two users can have the same email
        trim: true,
        lowercase: true, // Automatically converts email to lowercase
        match: [/\S+@\S+\.\S+/, 'Please fill in a valid email address'], // Basic email validation
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6, // Minimum security requirement
    }
}, { timestamps: true }); // Automatically creates "createdAt" and "updatedAt" fields

// We turn the schema (blueprint) into a Model we can use in our code
const User = mongoose.model('User', userSchema);

export default User;

// Example of what a user object looks like:
// { name: 'John Doe', email: 'john@email.com', password: 'password123' }