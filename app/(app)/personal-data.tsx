import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function PersonalDataScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('devluz');
  const [email, setEmail] = useState('d3vluz@gmail.com');
  const [phone, setPhone] = useState('+55 85 99999-9999');
  const [birthDate, setBirthDate] = useState('15/03/1995');
  const [cpf, setCpf] = useState('123.456.789-00');

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center mb-6">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm mr-4"
            >
              <Ionicons name="arrow-back" size={22} color="#1238b4" />
            </TouchableOpacity>
            <Text className="text-h1 text-primary font-bold flex-1">Dados Pessoais</Text>
          </View>

          {/* Avatar */}
          <View className="items-center mb-6">
            <View className="relative">
              <View className="w-24 h-24 rounded-full bg-white items-center justify-center shadow-md border-4 border-primary/10">
                <Ionicons name="person" size={44} color="#1238b4" />
              </View>
              <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary items-center justify-center shadow-md border-2 border-secondary">
                <Ionicons name="camera" size={16} color="#fff5dc" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="mt-3">
              <Text className="text-primary text-sm font-medium">Alterar foto</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View className="gap-4">
            <View className="gap-2">
              <Text className="text-primary font-bold text-sm">Nome de usuário</Text>
              <Input
                value={username}
                onChangeText={setUsername}
                placeholder="Digite seu nome de usuário"
                className="bg-white border-2 border-primary"
              />
            </View>

            <View className="gap-2">
              <Text className="text-primary font-bold text-sm">E-mail</Text>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                className="bg-white border-2 border-primary"
              />
            </View>

            <View className="gap-2">
              <Text className="text-primary font-bold text-sm">Telefone</Text>
              <Input
                value={phone}
                onChangeText={setPhone}
                placeholder="Digite seu telefone"
                keyboardType="phone-pad"
                className="bg-white border-2 border-primary"
              />
            </View>

            <View className="gap-2">
              <Text className="text-primary font-bold text-sm">Data de nascimento</Text>
              <Input
                value={birthDate}
                onChangeText={setBirthDate}
                placeholder="DD/MM/AAAA"
                className="bg-white border-2 border-primary"
              />
            </View>

            <View className="gap-2">
              <Text className="text-primary font-bold text-sm">CPF</Text>
              <Input
                value={cpf}
                onChangeText={setCpf}
                placeholder="000.000.000-00"
                keyboardType="number-pad"
                className="bg-white border-2 border-primary"
              />
            </View>
          </View>

          {/* Info Card */}
          <View className="mt-6 bg-blue-50 border-l-4 border-primary rounded-lg p-4">
            <View className="flex-row items-start gap-3">
              <Ionicons name="information-circle" size={24} color="#1238b4" />
              <Text className="text-primary text-sm flex-1">
                Seus dados pessoais são mantidos de forma segura e privada. 
                Apenas você tem acesso a essas informações.
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View className="gap-3 mt-6">
            <Button className="bg-primary h-12">
              <Text className="text-secondary font-semibold">Salvar Alterações</Text>
            </Button>
            
            <Button 
              variant="outline"
              className="border-2 border-primary bg-transparent h-12"
              onPress={() => router.back()}
            >
              <Text className="text-primary font-semibold">Cancelar</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}