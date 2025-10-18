import { View, Text } from 'react-native';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-h1 font-urbanist mb-4">Perfil</Text>
      <Text className="text-body mb-2">Nome: {user?.name}</Text>
      <Text className="text-body mb-6">Email: {user?.email}</Text>
      
      <Button
        title="Sair"
        onPress={signOut}
        variant="outline"
      />
    </View>
  );
}