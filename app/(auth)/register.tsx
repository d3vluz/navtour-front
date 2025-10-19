import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Logo } from '@/components/ui/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/text';
import { Divider } from '@/components/ui/Divider';

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 py-8">
            <View className="items-center mb-6">
              <Logo variant="long" color="primary" size={260} />
            </View>

            <View className="mb-6">
              <Text className="text-primary font-bold text-3xl mb-2">
                Criar Conta
              </Text>
              <Text className="text-primary text-base">
                Preencha os dados abaixo para se cadastrar
              </Text>
            </View>

            <View className="w-full gap-4">
              <View className="gap-2">
                <Text className="text-primary font-bold text-sm">Nome de usuário</Text>
                <Input
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Digite seu nome de usuário"
                  autoCapitalize="none"
                  className="bg-white border-2 border-primary"
                />
              </View>

              <View className="gap-2">
                <Text className="text-primary font-bold text-sm">Email</Text>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Digite seu e-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-white border-2 border-primary"
                />
              </View>

              <View className="gap-2">
                <Text className="text-primary font-bold text-sm">Criar senha</Text>
                <View className="relative">
                  <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Crie uma senha segura"
                    secureTextEntry={!showPassword}
                    className="bg-white border-2 border-primary pr-12"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-0 h-full justify-center"
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={24}
                      color="#1238b4"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="gap-2">
                <Text className="text-primary font-bold text-sm">Confirmar senha</Text>
                <View className="relative">
                  <Input
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirme sua senha"
                    secureTextEntry={!showConfirmPassword}
                    className="bg-white border-2 border-primary pr-12"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-0 h-full justify-center"
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={24}
                      color="#1238b4"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Button className="bg-primary h-12 mt-2">
                <Text className="text-secondary font-semibold">Cadastrar</Text>
              </Button>
            </View>

            <Divider />

            <Button
              variant="outline"
              className="border-2 border-primary bg-transparent h-12"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="logo-google" size={24} color="#1238b4" />
                <Text className="text-primary font-semibold">Cadastrar com Google</Text>
              </View>
            </Button>

            <View className="flex-row items-center justify-center mt-6">
              <Text className="text-primary text-sm">
                Já tem uma conta?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-primary font-bold text-sm">
                  Logar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}