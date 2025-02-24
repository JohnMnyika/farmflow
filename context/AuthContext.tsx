// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

type AuthContextType = {
    user: { token: string } | null;
    setUser: (user: { token: string } | null) => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ token: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getCookie('token');
            if (typeof token === 'string') {
                setUser({ token });
            }
        };

        fetchToken();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);