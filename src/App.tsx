// src/App.tsx
import React, { useContext } from 'react';
import { UserProvider, UserContext } from './context/UserContext';
import ThemeToggle from './components/ThemeToggle';
import UserTable from './components/UserTable';

const AppContent = () => {
  const context = useContext(UserContext);
  if (!context) return null;

  const { darkMode } = context;

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen p-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl">User Management Dashboard</h1>
          <ThemeToggle />
        </header>
        <UserTable />
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <UserProvider>
    <AppContent />
  </UserProvider>
);

export default App;
