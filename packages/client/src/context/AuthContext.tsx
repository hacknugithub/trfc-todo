import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../lib/axios';
import { mutate } from 'swr';
import { jwtDecode } from 'jwt-decode';

// Types
interface User {
  id: string;
  name?: string;
  email: string;
  exp?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if(storedToken) {
      try {
        const decoded = jwtDecode<User>(storedToken);
        if(decoded.exp && decoded.exp * 1000 < Date.now()) {
          // eslint-disable-next-line react-hooks/immutability
          logout();
        } else {
          setToken(storedToken);
          setUser(decoded);
        }
      } catch (error) {
        console.error('Invalid token', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const {data} = await api.post('/auth/login', {email, password});
  
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
  
      mutate(
        () => true,
        undefined,
        { revalidate: false }
      );
    } catch (error) {
      console.error('Invalid login', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);

    mutate(
      () => true,
      undefined,
      { revalidate: false }
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout,
        loading
      }}>
        {children}
      </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
