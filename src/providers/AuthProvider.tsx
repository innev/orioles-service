'use client'

import { createContext, useContext, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

type AuthContextType = {
  showLoginModal: boolean
  setShowLoginModal: (show: boolean) => void
};

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <SessionProvider>
      <AuthContext.Provider value={{ showLoginModal, setShowLoginModal }}>
        {children}
      </AuthContext.Provider>
    </SessionProvider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
};