// pages/auth/register.tsx
import { useState } from 'react';
import axios, { isAxiosError } from 'axios'; // Import isAxiosError directly
import { useRouter } from 'next/router';
import * as yup from 'yup';

// Validation schema
const registerSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    location: yup.string().required('Location is required'),
    produce: yup.string().required('Produce is required'),
    farmingPractices: yup.string().required('Farming practices are required'),
    phone: yup.string().required('Phone number is required').min(10, 'Phone number must be at least 10 digits'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        produce: '',
        farmingPractices: '',
        phone: '',
        password: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [apiError, setApiError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Validate form data
            await registerSchema.validate(formData, { abortEarly: false });

            // Submit form data
            const response = await axios.post('/api/farmers/register', formData);
            if (response.status === 201) {
                router.push(response.data.redirect || '/farmers/dashboard'); // Redirect to the farmer dashboard
            }
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                // Set validation errors
                const errors: { [key: string]: string } = {};
                error.inner.forEach((err) => {
                    if (err.path) {
                        errors[err.path] = err.message;
                    }
                });
                setErrors(errors);
            } else if (isAxiosError(error)) {
                // Handle Axios errors
                setApiError(error.response?.data?.message || 'Something went wrong. Please try again.');
            } else {
                // Handle other errors
                setApiError('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register as a Farmer
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                        </div>

                        {/* Location Field */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <div className="mt-1">
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                            </div>
                        </div>

                        {/* Produce Field */}
                        <div>
                            <label htmlFor="produce" className="block text-sm font-medium text-gray-700">
                                Produce
                            </label>
                            <div className="mt-1">
                                <input
                                    id="produce"
                                    name="produce"
                                    type="text"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    value={formData.produce}
                                    onChange={(e) => setFormData({ ...formData, produce: e.target.value })}
                                />
                                {errors.produce && <p className="text-red-500 text-sm mt-1">{errors.produce}</p>}
                            </div>
                        </div>

                        {/* Farming Practices Field */}
                        <div>
                            <label htmlFor="farmingPractices" className="block text-sm font-medium text-gray-700">
                                Farming Practices
                            </label>
                            <div className="mt-1">
                                <input
                                    id="farmingPractices"
                                    name="farmingPractices"
                                    type="text"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    value={formData.farmingPractices}
                                    onChange={(e) => setFormData({ ...formData, farmingPractices: e.target.value })}
                                />
                                {errors.farmingPractices && (
                                    <p className="text-red-500 text-sm mt-1">{errors.farmingPractices}</p>
                                )}
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <div className="mt-1">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>
                        </div>

                        {/* Display API error */}
                        {apiError && <p className="text-red-500 text-sm mt-2 text-center">{apiError}</p>}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}