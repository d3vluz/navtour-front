import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Logo } from '@/components/ui/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = (): boolean => {
    let hasError = false;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'E-mail é obrigatório';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido';
      hasError = true;
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signIn({ email, password });
    } catch (error: any) {
      Alert.alert(
        'Erro no login',
        error.response?.data?.message || 'Não foi possível fazer login. Verifique suas credenciais.'
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
          contentContainerClassName="flex-grow justify-center"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 py-8">
            {/* Logo */}
            <View className="items-center mb-8 mt-4">
              <Logo variant="long" color="primary" size={240} />
            </View>

            {/* Formulário */}
            <View className="w-full">
              <Input
                label="Usuário:"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors({ ...errors, email: '' });
                }}
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                error={errors.email}
              />

              <Input
                label="Senha:"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors({ ...errors, password: '' });
                }}
                placeholder="Digite sua senha"
                secureTextEntry
                error={errors.password}
              />

              <TouchableOpacity 
                onPress={() => router.push('/forgot-password')}
                className="self-end mb-6"
              >
                <Text className="text-primary font-urbanist text-small">
                  Esqueceu a senha?
                </Text>
              </TouchableOpacity>

              <Button
                title="Login"
                onPress={handleLogin}
                variant="primary"
                loading={loading}
              />
            </View>

            {/* Divider */}
            <Divider />

            {/* Login com Google */}
            <Button
              title="Entrar com Google"
              onPress={handleGoogleLogin}
              variant="google"
              icon={<Ionicons name="logo-google" size={32} color="#1238b4" />}
            />

            {/* Link para cadastro */}
            <View className="flex-row items-center justify-center mt-6">
              <Text className="text-primary font-urbanist text-small">
                Ainda não tem uma conta?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text className="text-primary font-urbanist font-bold text-small">
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