// pages/buyers/dashboard.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ProduceItem {
    _id: string;
    name: string;
    price: string;
}

export default function BuyerDashboard() {
    const [produce, setProduce] = useState<ProduceItem[]>([]);

    const fetchProduce = async () => {
        try {
            const response = await axios.get<ProduceItem[]>('/api/produce');
            setProduce(response.data);
        } catch (error) {
            console.error('Failed to fetch produce:', error);
        }
    };

    useEffect(() => {
        fetchProduce();
        const interval = setInterval(fetchProduce, 5000); // Fetch every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Produce</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {produce.map((item) => (
                    <div key={item._id} className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                        <p className="text-gray-600">{item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}