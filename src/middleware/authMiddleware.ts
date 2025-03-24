import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";
import jwt from "jsonwebtoken";

import { DecodedUser } from "../interfaces/User";

import dotenv from 'dotenv';
import { string } from "joi";

dotenv.config();

const secretKey: string | undefined = process.env.ACCESS_TOKEN_SECRET;


export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("Extracted Token:", token);
  
  if (!token) {
    res.status(401).json({ message: "Unauthorized. Token not provided." });
    return;
  }


  const decoded = jwt.verify(token, secretKey as string) as DecodedUser ;
  if (!decoded) {
    res.status(401).json({ message: "Invalid token." });
    return;
  }

  req.user = decoded;
  console.log("This user",req.user);
  // console.log("User ID:", req.user.userId);
  
  
  next();
};

