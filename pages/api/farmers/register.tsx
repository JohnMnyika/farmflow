// pages/api/farmers/register.tsx
import Farmer from '../../../models/Farmer';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'POST') {
        const { name, location, produce, farmingPractices, phone, password } = req.body;

        try {
            // Check if farmer already exists
            const existingFarmer = await Farmer.findOne({ phone });
            if (existingFarmer) {
                return res.status(400).json({ message: 'Farmer with this phone number already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new farmer
            const farmer = new Farmer({
                name,
                location,
                produce,
                farmingPractices,
                phone,
                password: hashedPassword,
            });

            await farmer.save();
            res.status(201).json({ message: 'Farmer registered successfully', redirect: '/farmers/dashboard' });
        } catch (error) {
            console.error('Registration error:', error); // Log the error
            res.status(500).json({ message: 'Something went wrong. Please try again.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}