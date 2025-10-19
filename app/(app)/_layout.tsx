import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="personal-data" />
      <Stack.Screen name="privacy-security" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}