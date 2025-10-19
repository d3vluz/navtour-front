import { View, Text } from 'react-native';

export default function ProfileScreen() {

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-h1 font-urbanist mb-4">Perfil</Text>
      <Text className="text-body mb-2">Nome:</Text>
      <Text className="text-body mb-6">Email:</Text>
    </View>
  );
}