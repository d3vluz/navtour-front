import { View, Text } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-h1 font-urbanist mb-4">
        Bem-vindo, {user?.name}!
      </Text>
    </View>
  );
}