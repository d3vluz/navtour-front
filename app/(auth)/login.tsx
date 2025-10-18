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

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.replace('/home');
  }

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
              <Logo variant="short" color="primary" size={100} />
            </View>

            <View className="mb-6">
              <Text className="text-primary font-bold text-3xl mb-2">
                Bem-vindo(a)!
              </Text>
              <Text className="text-primary text-base">
                Entre com sua conta para continuar
              </Text>
            </View>

            <View className="w-full gap-4">
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
                <Text className="text-primary font-bold text-sm">Senha</Text>
                <View className="relative">
                  <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Digite sua senha"
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

              <TouchableOpacity 
                onPress={() => router.push('/forgot-password')}
                className="self-end"
              >
                <Text className="text-primary text-sm">
                  Esqueceu a senha?
                </Text>
              </TouchableOpacity>

              <Button className="bg-primary h-12 mt-2"
                      onPress={handleLogin}
              >
                <Text className="text-secondary font-semibold">Login</Text>
              </Button>
            </View>

            <Divider />

            <Button
              variant="outline"
              className="border-2 border-primary bg-transparent h-12"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="logo-google" size={24} color="#1238b4" />
                <Text className="text-primary font-semibold">Entrar com Google</Text>
              </View>
            </Button>

            <View className="flex-row items-center justify-center mt-6">
              <Text className="text-primary text-sm">
                Ainda não tem uma conta?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text className="text-primary font-bold text-sm">
                  Cadastrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}