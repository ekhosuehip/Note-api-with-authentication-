import { Request } from 'express';
import { DecodedUser } from "../interfaces/User";

declare module "express-serve-static-core" {
  namespace Express {
    interface Request {
      user: DecodedUser
    }
  }
}

