/* eslint-disable */
import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp= async (req,res,next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {name,email,password}= req.body;

        //check if user exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            const error= new Error('User already exists');
            error.statusCode = 409 //means already exists
            throw error;

        }

        //if it doesnt exist, hash password
        const salt = await  bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{name,email,password: hashedPassword}], {session});

        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN}); // attaching a jwt to the user


      await session.commitTransaction();  
      session.endSession();

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data:{
            token,
            user : newUsers[0],
        }

      })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error)
        
    }

}

export const signIn = async (req,res,next)=>{
    try {
        const {email,password}=req.body;

        const user = await User.findOne({email});

        //if user doesnt exist
        if (!user){
            const error= new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        //if user exists
        const isPasswordValid = await bcrypt.compare(password, user.password);
        //if password invalid
        if(!isPasswordValid){
            const error= new Error('Invalid password');
            error.statusCode= 401;
            throw error
        }
        //if valid generate a new token
        const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});  
        
        //return success status
        res.status(200).json({
            success:true,
            message: 'User signed in successfuly',
            data:{
                token,
                user
            }
        })
    } catch (error) {
        next(error)
        
    }

}

export const signOut = async (req,res,next)=>{

}