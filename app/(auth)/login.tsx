import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Logo } from '@/components/ui/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/text';
import { Divider } from '@/components/ui/Divider';
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    if (!email) {
      Alert.alert('Erro', 'E-mail é obrigatório');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Erro', 'E-mail inválido');
      return false;
    }
    if (!password) {
      Alert.alert('Erro', 'Senha é obrigatória');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signIn({ email, password });
    } catch (error: any) {
      Alert.alert(
        'Erro no login',
        error.response?.data?.message || 'Não foi possível fazer login.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer login com Google.');
    }
  };

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
            {/* Logo */}
            <View className="items-center mb-8">
              <Logo variant="long" color="primary" size={240} />
            </View>

            {/* Formulário */}
            <View className="w-full gap-4">
              {/* Email Input */}
              <View className="gap-2">
                <Text className="text-primary font-bold text-sm">Usuário:</Text>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Digite seu e-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                  className="bg-white border-2 border-primary"
                />
              </View>

              {/* Password Input */}
              <View className="gap-2">
                <Text className="text-primary font-bold text-sm">Senha:</Text>
                <View className="relative">
                  <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Digite sua senha"
                    secureTextEntry={!showPassword}
                    editable={!loading}
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

              {/* Forgot Password */}
              <TouchableOpacity 
                onPress={() => router.push('/forgot-password')}
                className="self-end"
                disabled={loading}
              >
                <Text className="text-primary text-sm">
                  Esqueceu a senha?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <Button
                onPress={handleLogin}
                disabled={loading}
                className="bg-primary h-12 mt-2"
              >
                {loading ? (
                  <ActivityIndicator color="#fff5dc" />
                ) : (
                  <Text className="text-secondary font-semibold">Login</Text>
                )}
              </Button>
            </View>

            {/* Divider */}
            <Divider />

            {/* Google Login */}
            <Button
              onPress={handleGoogleLogin}
              variant="outline"
              disabled={loading}
              className="border-2 border-primary bg-transparent h-12"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="logo-google" size={24} color="#1238b4" />
                <Text className="text-primary font-semibold">Entrar com Google</Text>
              </View>
            </Button>

            {/* Register Link */}
            <View className="flex-row items-center justify-center mt-6">
              <Text className="text-primary text-sm">
                Ainda não tem uma conta?{' '}
              </Text>
              <TouchableOpacity 
                onPress={() => router.push('/register')}
                disabled={loading}
              >
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