// pages/api/auth/login.js
import Farmer from '../../../models/Farmer';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../utils/dbConnect';
import { setCookie } from 'cookies-next';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { phone, password } = req.body;

        try {
            // Find farmer by phone
            const farmer = await Farmer.findOne({ phone });
            if (!farmer) {
                return res.status(400).json({ message: 'Invalid phone or password' });
            }

            // Check password
            const isPasswordValid = await bcrypt.compare(password, farmer.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid phone or password' });
            }

            // Generate token
            const token = farmer.generateAuthToken();

            // Set token in cookie
            setCookie('token', token, { req, res, maxAge: 60 * 60 }); // 1 hour

            res.status(200).json({ message: 'Logged in successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong. Please try again.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}