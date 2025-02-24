// pages/auth/login.tsx
import { useState } from 'react';
import axios, { isAxiosError } from 'axios'; // Import isAxiosError directly
import { useRouter } from 'next/router';
import * as yup from 'yup';

// Validation schema
const loginSchema = yup.object().shape({
    phone: yup.string().required('Phone number is required').min(10, 'Phone number must be at least 10 digits'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

interface FormErrors {
    phone?: string;
    password?: string;
}

export default function Login() {
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [apiError, setApiError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Validate form data
            await loginSchema.validate(formData, { abortEarly: false });

            // Submit form data
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, formData);
            if (response.status === 200) {
                router.push('/farmers/dashboard'); // Redirect to the farmer dashboard after login
            }
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                // Set validation errors
                const validationErrors: FormErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path as keyof FormErrors] = err.message;
                });
                setErrors(validationErrors);
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
                    Login to FarmFlow
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}