// pages/farmers/dashboard.js
import ProtectedRoute from '../../components/ProtectedRoute';

export default function FarmerDashboard() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Farmer Dashboard</h1>
                {/* Dashboard content */}
            </div>
        </ProtectedRoute>
    );
}