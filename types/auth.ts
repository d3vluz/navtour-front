export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export interface AuthContextData {
    user: User | null;
    loading: boolean;
    signIn: (credentials: LoginCredentials) => Promise<void>;
    signUp: (credentials: RegisterCredentials) => Promise<void>;
    signOut: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
  }