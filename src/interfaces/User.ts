import { Document, ObjectId } from "mongoose";
import { JwtPayload } from "jsonwebtoken";


//Define User Interface
export interface IUser extends Document {
    _id: ObjectId,
    name: string,
    email: string,
    password: string,
    createAt: Date,
    updatedAt: Date
}

export interface DecodedUser extends JwtPayload {
    userId: string;
    email: string;
  }
  