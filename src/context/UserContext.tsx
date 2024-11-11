// src/context/UserContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  address: { street: string; suite: string; city: string };
  phone: string;
}

interface UserContextProps {
  users: User[];
  isLoading: boolean;
  error: string | null;
  darkMode: boolean;
  toggleTheme: () => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <UserContext.Provider value={{ users, isLoading, error, darkMode, toggleTheme }}>
      {children}
    </UserContext.Provider>
  );
};
