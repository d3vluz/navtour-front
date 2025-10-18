import { User } from '@/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@navtour:token';
const USER_KEY = '@navtour:user';
const REFRESH_TOKEN_KEY = '@navtour:refresh_token';

export const authStorage = {
  // Salvar token
  saveToken: async (token: string): Promise<void> => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  // Obter token
  getToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  // Remover token
  removeToken: async (): Promise<void> => {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },

  // Salvar refresh token
  saveRefreshToken: async (refreshToken: string): Promise<void> => {
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  // Obter refresh token
  getRefreshToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  },

  // Remover refresh token
  removeRefreshToken: async (): Promise<void> => {
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  // Salvar dados do usuário
  saveUser: async (user: User): Promise<void> => {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  // Obter dados do usuário
  getUser: async (): Promise<User | null> => {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  // Remover dados do usuário
  removeUser: async (): Promise<void> => {
    await AsyncStorage.removeItem(USER_KEY);
  },

  // Limpar todos os dados de autenticação
  clearAll: async (): Promise<void> => {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY, REFRESH_TOKEN_KEY]);
  },
};