
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'attendee' | 'host' | null;

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRoleState] = useState<UserRole>(null);

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    try {
      const storedRole = localStorage.getItem('userRole') as UserRole;
      if (storedRole) {
        setUserRoleState(storedRole);
      }
    } catch (error) {
        console.error("Could not access local storage:", error);
    }
  }, []);

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    try {
        if (role) {
          localStorage.setItem('userRole', role);
        } else {
          localStorage.removeItem('userRole');
        }
    } catch (error) {
        console.error("Could not access local storage:", error);
    }
  };

  return (
    <AppContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
