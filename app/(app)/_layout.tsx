import { Stack, Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function AppLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}