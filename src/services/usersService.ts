import User  from "../models/User";
import  { IUser } from '../interfaces/User'

class UserService {
    // Register a users
    async registerUser(detail: IUser ) {
        return await User.create(detail)
    }

    // Get a user
    async getUser(email: string): Promise<IUser | null> {
        return await User.findOne({email})
    }

    // Get all users
    async getAllUsers() {
        return await User.find()
    }

    // Get user by id
    async getById(id: string) {
        return await User.findById(id)
    }
}

const userService = new UserService()
export default userService