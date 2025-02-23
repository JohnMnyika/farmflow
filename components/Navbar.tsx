// components/Navbar.tsx
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { deleteCookie } from 'cookies-next';

export default function Navbar() {
    const { user, setUser } = useAuth();

    const handleLogout = () => {
        deleteCookie('token');
        setUser(null);
    };

    return (
        <nav className="bg-green-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-xl font-bold">
                    FarmFlow
                </Link>
                <div className="space-x-4">
                    {user ? (
                        <button onClick={handleLogout} className="text-white hover:text-green-200">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link href="/auth/register" className="text-white hover:text-green-200">
                                Register
                            </Link>
                            <Link href="/auth/login" className="text-white hover:text-green-200">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}