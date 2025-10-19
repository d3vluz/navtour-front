import React, { ReactNode, createContext, useState } from 'react';
import {
  AuthContextData,
  LoginCredentials,
  RegisterCredentials,
  User
} from '@/types/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const MOCK_USER: User = {
  id: '1',
  name: 'Usuário Teste',
  email: 'teste@exemplo.com',
  avatar: undefined
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading] = useState(false);

  async function signIn(_credentials: LoginCredentials) {
    setUser(MOCK_USER);
  }

  async function signUp(_credentials: RegisterCredentials) {
    setUser(MOCK_USER);
  }

  async function signOut() {
    setUser(null);
  }

  async function signInWithGoogle() {
    setUser(MOCK_USER);
  }

  async function resetPassword(_email: string) {
    // Mock - não faz nada
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}