// pages/api/produce.tsx
import Farmer from '../../models/Farmer';
import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const farmers = await Farmer.find({}, 'name location produce farmingPractices phone');
            res.status(200).json(farmers);
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong. Please try again.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}