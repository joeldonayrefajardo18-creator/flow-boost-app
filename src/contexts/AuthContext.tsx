import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/task';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = storage.getUser();
    setUser(savedUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would call a real API
    const mockUser: User = {
      id: '1',
      email,
      username: email.split('@')[0],
    };
    
    storage.saveUser(mockUser);
    setUser(mockUser);
    toast.success('Welcome back!');
    return true;
  };

  const signup = async (email: string, password: string, username: string): Promise<boolean> => {
    // Mock authentication - in production, this would call a real API
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      username,
    };
    
    storage.saveUser(mockUser);
    setUser(mockUser);
    toast.success('Account created successfully!');
    return true;
  };

  const logout = () => {
    storage.removeUser();
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
