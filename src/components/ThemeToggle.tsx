// src/components/ThemeToggle.tsx
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const ThemeToggle: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("ThemeToggle must be used within a UserProvider");

  const { darkMode, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 border rounded ${darkMode ? 'bg-gray-300 text-black' : 'bg-gray-800 text-white'}`}
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
