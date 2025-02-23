// utils/authMiddleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';

export const authMiddleware = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = getCookie('token', { req, res });

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token as string, process.env.JWT_SECRET!);
            (req as any).user = decoded; // Attach the decoded user to the request object
            return handler(req, res);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
};