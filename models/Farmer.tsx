// models/Farmer.tsx
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const farmerSchema = new mongoose.Schema({
    name: String,
    location: String,
    produce: String,
    farmingPractices: String,
    phone: String,
    password: String,
});

// Hash password before saving
farmerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        // Explicitly assert that `this.password` is a string
        this.password = await bcrypt.hash(this.password as string, 10);
    }
    next();
});

// Generate JWT token
farmerSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET!, {
        expiresIn: '1h', // Token expires in 1 hour
    });
    return token;
};

export default mongoose.models.Farmer || mongoose.model('Farmer', farmerSchema);