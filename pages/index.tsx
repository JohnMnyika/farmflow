// pages/index.js
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to FarmFlow</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Connecting farmers directly with buyers for fair prices and fresh produce.
                    </p>
                    <div className="space-x-4">
                        <Link
                            href="/auth/register"
                            className="bg-green-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-green-700"
                        >
                            Register as Farmer
                        </Link>
                        <Link
                            href="/buyers/dashboard"
                            className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-blue-700"
                        >
                            Browse Produce
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}