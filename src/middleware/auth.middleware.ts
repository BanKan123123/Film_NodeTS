import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const key = process.env.JWT_SECRET || '';

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided." });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, key);
        console.log("Decoded Token:", decoded);
        return decoded;
    } catch (err) {
        res.status(401).json({ message: "Invalid token." });
    }
}

// export const authorize = (roles: string[]) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const userRole = req.user?.role;

//         if (!userRole || !roles.includes(userRole)) {
//             return res.status(403).json({ message: "Forbidden" });
//         }

//         next();
//     }
// }