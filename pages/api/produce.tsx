// pages/api/produce.tsx
import Farmer from '../../models/Farmer';
import dbConnect from '../../utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const farmers = await Farmer.find({}, 'name location produce farmingPractices phone');
            res.status(200).json(farmers);
        } catch (error) {
            console.error('Fetch produce error:', error); // Log the error
            res.status(500).json({ message: 'Something went wrong. Please try again.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}