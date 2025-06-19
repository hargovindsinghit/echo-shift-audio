
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface Subscription {
  subscribed: boolean;
  plan?: 'weekly' | 'monthly';
  expiresAt?: Date;
}

interface AuthContextType {
  user: User | null;
  subscription: Subscription;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription>({ subscribed: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      setIsLoading(true);
      // In a real app, this would check for stored auth tokens
      const stored = localStorage.getItem('deepvoicex_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = { id: Date.now().toString(), email };
      setUser(newUser);
      localStorage.setItem('deepvoicex_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = { id: Date.now().toString(), email, name };
      setUser(newUser);
      localStorage.setItem('deepvoicex_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    setSubscription({ subscribed: false });
    localStorage.removeItem('deepvoicex_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      subscription,
      signIn,
      signUp,
      signOut,
      isLoading
    }}>
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
