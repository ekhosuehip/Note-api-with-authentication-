import mongoose, {Schema, Document} from 'mongoose';
import {IUser} from '../interfaces/User'

// Define User Schema

const UserSchema: Schema = new Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true, trim: true},
    },
    {timestamps: true, versionKey: false}
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;