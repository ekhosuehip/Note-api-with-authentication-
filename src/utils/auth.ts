import jwt from "jsonwebtoken";
import { IAuthPayload } from "../interfaces/Auth";
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

/**
 * Generate JWT Token
 * @param payload - Payload containing userId
 * @returns Signed JWT token
 */
export const generateToken = (payload: IAuthPayload): string => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" });
};

/**
 * Verify JWT Token
 * @param token - JWT token to verify
 * @returns Decoded token or null
 */
export const verifyToken = (token: string, secreat: string): any | null => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
  } catch (error) {
    return null;
  }
};