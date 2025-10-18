import { useAuth } from '@/hooks/useAuth';
import { Redirect, type Href } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#1238b4" />
      </View>
    );
  }

  // Se não estiver autenticado, redireciona para login
  if (!user) {
    return <Redirect href={'/login' as Href} />;
  }

  // Se estiver autenticado, redireciona para home
  return <Redirect href={'/home' as Href} />;
}