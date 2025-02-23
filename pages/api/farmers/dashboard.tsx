// pages/farmers/dashboard.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function FarmerDashboard() {
    const [produce, setProduce] = useState([]);

    useEffect(() => {
        const fetchProduce = async () => {
            try {
                const response = await axios.get('/api/produce');
                setProduce(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduce();
    }, []);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Farmer Dashboard</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {produce.map((item) => (
                        <div key={item._id} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                            <p className="text-gray-600">{item.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ProtectedRoute>
    );
}