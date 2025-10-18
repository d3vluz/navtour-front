import '@/global.css'
import { Slot, SplashScreen } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}