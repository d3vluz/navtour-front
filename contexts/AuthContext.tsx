import { authService } from '@/services/api/auth.service';
import { authStorage } from '@/services/storage/auth.storage';
import {
  AuthContextData,
  LoginCredentials,
  RegisterCredentials,
  User
} from '@/types/auth';
import React, { ReactNode, createContext, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega os dados do usuário ao iniciar o app
  useEffect(() => {
    loadStoredData();
  }, []);

  async function loadStoredData() {
    try {
      const storedUser = await authStorage.getUser();
      const storedToken = await authStorage.getToken();

      if (storedUser && storedToken) {
        const isValid = await authService.validateToken(); // Valida se o token ainda é válido
        if (isValid) {
          setUser(storedUser);
        } else {
          await authStorage.clearAll();
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(credentials: LoginCredentials) {
    try {
      const response = await authService.login(credentials);
      
      await authStorage.saveToken(response.token);
      await authStorage.saveUser(response.user);
      
      setUser(response.user);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async function signUp(credentials: RegisterCredentials) {
    try {
      const response = await authService.register(credentials);
      
      await authStorage.saveToken(response.token);
      await authStorage.saveUser(response.user);
      
      setUser(response.user);
    } catch (error) {
      console.error('Erro no cadastro:', error);
      throw error;
    }
  }

  async function signOut() {
    try {
      await authStorage.clearAll();
      setUser(null);
    } catch (error) {
      console.error('Erro ao sair:', error);
      throw error;
    }
  }

  async function signInWithGoogle() {
    try {
      // @TODO: Implementar integração com Google
      console.log('Login com Google - Implementar integração');
    } catch (error) {
      console.error('Erro no login com Google:', error);
      throw error;
    }
  }

  async function resetPassword(email: string) {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      console.error('Erro ao resetar senha:', error);
      throw error;
    }
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