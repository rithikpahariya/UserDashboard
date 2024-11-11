// src/components/UserTable.tsx
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const UserTable: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("UserTable must be used within a UserProvider");

  const { users, isLoading, error } = context;
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table className="min-w-full bg-white dark:bg-gray-800">
      <thead>
        <tr>
          <th className="p-3">ID</th>
          <th className="p-3">Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Company</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <React.Fragment key={user.id}>
            <tr className="text-gray-700 dark:text-gray-300">
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.company.name}</td>
              <td className="p-3">
                <button
                  onClick={() => toggleRow(user.id)}
                  className="text-blue-500"
                >
                  {expandedRows.includes(user.id) ? 'Hide Details' : 'Show Details'}
                </button>
              </td>
            </tr>
            {expandedRows.includes(user.id) && (
              <tr className="bg-gray-100 dark:bg-gray-900">
                <td colSpan={5} className="p-3">
                  <p>Address: {`${user.address.street}, ${user.address.city}`}</p>
                  <p>Phone: {user.phone}</p>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
