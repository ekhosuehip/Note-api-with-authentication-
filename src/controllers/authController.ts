import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import userService from '../services/usersService';
import dotenv from 'dotenv';
import { ObjectId } from "mongoose";
import { IAuthPayload } from '../interfaces/Auth';
import { doHash, compareHash } from '../utils/hashing';
import Category from '../models/Category';

dotenv.config();

const saltRounds = 10;

// Register a user
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        // Check if user already exist in database
        const existingUser = await userService.getUser(email);
        console.log(existingUser)
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: 'Email already exists '
            });
        } else {
            console.log('This point');
            
            const hashedPassword = await doHash(password, saltRounds);
            req.body.password = hashedPassword;

            const newUser = await userService.registerUser(req.body);
            const userIdString = (newUser!._id as ObjectId).toString();
            // Generate JWT
            const payload: IAuthPayload = {userId: userIdString, email: email };
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" });
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            }).status(201).json({
                success: true,
                Message: 'User registered successfull',
                userId: userIdString,
                token: token
            });
            
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error || 'Internal server error'
        });
    }  
}

// login a user
export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    console.log(email, password);
    
    
    try {
        // Check if user already exist in database
        const user = await userService.getUser(email);
        console.log(`user: ${user}`);
        
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Incorrect email or password'
            });
            return
        } 

        const userIdString = (user!._id as ObjectId).toString();
        console.log(userIdString);
        const storedHashedPassword = user.password;
        console.log("Here")

        const isMatch = await compareHash(password, storedHashedPassword);
        if (!isMatch) {
            console.log("Incorrect");
            res.status(401).json({
                success: false,
                message: 'Incorrect email or password'
            });
            return
        }

        // Generate JWT
        const payload: IAuthPayload = {userId: userIdString, email: email};
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })
        .status(200).json({
            success: true, 
            message: 'login successful.',
            token: token
        });
        console.log(token);
        
        console.log(req.user);
        
        return
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
        return  
    }
    
}

// logout
export const logoutUser = (req: Request, res: Response) => {
    res.clearCookie("token").json({ message: "Logout successful." });
  };


//get users
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.params;
    console.log(data);

  

    const result = await Category.find();
    console.log(result)
  
    
    const users = await userService.getAllUsers()
    res.status(200).json({
        success: true,
        message: users
    })
}

