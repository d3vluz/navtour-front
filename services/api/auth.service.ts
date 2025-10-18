import { api } from '@/services/api/client';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', credentials);
    return response.data;
  },

//   googleLogin: async (googleToken: string): Promise<AuthResponse> => {
//     const response = await api.post<AuthResponse>('/auth/google', { token: googleToken });
//     return response.data;
//   },

  resetPassword: async (email: string): Promise<void> => {
    await api.post('/auth/reset-password', { email });
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  validateToken: async (): Promise<boolean> => {
    try {
      await api.get('/auth/validate');
      return true;
    } catch {
      return false;
    }
  },
};