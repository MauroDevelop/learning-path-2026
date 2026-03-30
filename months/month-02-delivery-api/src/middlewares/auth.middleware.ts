import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

// We create an interface that extends Request
export interface AuthRequest extends Request {
    user?: {
        userId: string,
        userRole: string
    }
}


export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    // We extract the token from the header
    // format = "Bearer <the_token_here>"
    // Use .split(' ')[1] to separate the word Bearer from the actual token
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Access denied'
        });
        return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('CRITICAL FATAL ERROR: JWT_SECRET is not defined in environment variables.');
    }

    try {

        // Decrypt the token
        const decode = jwt.verify(token, secret) as { userId: string, userRole: string };
        //We save the decoded data in req.user
        req.user = decode;

        next();

    } catch (error) {
        res.status(403).json({ success: false, message: 'Invalid or expired token' });
        return;
    }
};

export const verifyRole = (allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {

        // Additional security verification
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
            return;
        }

        // Check if the role is in the allowed list
        if (!allowedRoles.includes(req.user.userRole)) {
            res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action'
            });
            return;
        }

        next();
    };
};