import { Icon } from '@/components/ui/icon';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { Dimensions, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
    const router = useRouter();
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const IMAGE_SIZE = SCREEN_WIDTH * 0.3;

    const destinationList = [
        { id: 1, name: 'Praia do Cumbuco', image: '🏖️', address: 'Rua Cumbuco, 123' },
        { id: 2, name: 'Dunas da Sabiaguaba', image: '🏝️', address: 'Rua Sabiaguada, 123' },
        { id: 3, name: 'Autodromo do Eusébio', image: '🏎️', address: 'Rua Autodromo, 123' },
        { id: 4, name: 'Vasto Restaurante', image: '🍽️', address: 'Rua Vasto, 123' },
        { id: 5, name: 'Beach Park', image: '🏖️', address: 'Rua Beach Part, 123' },
        { id: 6, name: 'Mezzi Restaurante', image: '🍽️', address: 'Rua Mezzi, 123' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-secondary px-4 pt-2">
            <View className="items-end">
                <TouchableOpacity onPress={() => router.push('/explore')} hitSlop={10}>
                    <Icon as={X} size={30} strokeWidth={2.5} className="text-primary" />
                </TouchableOpacity>
            </View>

            <View className="mt-4 bg-white rounded-input px-4 py-2 flex-row items-center shadow-card w-full mb-4">
                <Ionicons name="search" size={20} color="#1238b4" />
                <TextInput
                    placeholder="Buscar destino"
                    placeholderTextColor="#1238b480"
                    className="flex-1 ml-3 text-body text-primary"
                />
            </View>

            <FlatList
                data={destinationList}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="flex-row items-center bg-white rounded-lg shadow-card mb-3 p-3"
                        activeOpacity={0.7}
                    >
                        <View
                            className="items-center justify-center bg-gray-200 rounded-md"
                            style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                        >
                            <Text style={{ fontSize: IMAGE_SIZE * 0.4 }}>{item.image}</Text>
                        </View>

                        <View className="flex-1 ml-4">
                            <Text className="text-primary font-bold text-lg" numberOfLines={1}>
                                {item.name}
                            </Text>
                            <Text className="text-primary/70 text-base" numberOfLines={1}>
                                {item.address}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}