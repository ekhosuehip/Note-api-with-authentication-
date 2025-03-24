import { Request, Response, NextFunction } from "express";

// middleware to track API requests
let requests = 0;
const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    
    if (req){
        requests++
    }

    res.on("finish", () => {
        console.log(`API request: ${requests}`);
    });

    next();
};

export default loggerMiddleware;
