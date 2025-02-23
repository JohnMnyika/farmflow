// models/Farmer.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export default mongoose.models.Farmer || mongoose.model('Farmer', farmerSchema);