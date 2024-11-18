import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // storing roles (tenants and caretakers)

  useEffect(() => {
    const role = sessionStorage.getItem('userRole') || 'tenant'; // if no role is found, the default is set to tenant
    setUserRole(role);
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
