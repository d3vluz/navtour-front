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

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const validateForm = (): boolean => {
    let hasError = false;
    const newErrors = { username: '', email: '', password: '', confirmPassword: '' };

    if (!username) {
      newErrors.username = 'Nome de usuário é obrigatório';
      hasError = true;
    } else if (username.length < 3) {
      newErrors.username = 'Nome deve ter no mínimo 3 caracteres';
      hasError = true;
    }

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
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
      hasError = true;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
      hasError = true;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signUp({ username, email, password });
      // O redirecionamento será automático via app/index.tsx
      Alert.alert(
        'Sucesso!',
        'Cadastro realizado com sucesso!',
        [{ text: 'OK' }]
      );
    } catch (error: any) {
      Alert.alert(
        'Erro no cadastro',
        error.response?.data?.message || 'Não foi possível realizar o cadastro. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar com Google. Tente novamente.');
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
              <Logo size={120} />
            </View>

            {/* Título */}
            <View className="mb-6">
              <Text className="text-primary font-urbanist font-bold text-h2 mb-2">
                Criar Conta
              </Text>
              <Text className="text-primary font-urbanist text-body">
                Preencha os dados abaixo para se cadastrar
              </Text>
            </View>

            {/* Formulário */}
            <View className="w-full">
              <Input
                label="Nome de usuário"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setErrors({ ...errors, username: '' });
                }}
                placeholder="Digite seu nome de usuário"
                error={errors.username}
              />

              <Input
                label="Email"
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
                label="Criar senha"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors({ ...errors, password: '' });
                }}
                placeholder="Crie uma senha segura"
                secureTextEntry
                error={errors.password}
              />

              <Input
                label="Confirmar senha"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setErrors({ ...errors, confirmPassword: '' });
                }}
                placeholder="Confirme sua senha"
                secureTextEntry
                error={errors.confirmPassword}
              />

              <Button
                title="Cadastrar"
                onPress={handleRegister}
                variant="primary"
                loading={loading}
              />
            </View>

            {/* Divider */}
            <Divider />

            {/* Cadastro com Google */}
            <Button
              title="Cadastrar com Google"
              onPress={handleGoogleRegister}
              variant="google"
              icon={<Ionicons name="logo-google" size={32} color="#1238b4" />}
            />

            {/* Link para login */}
            <View className="flex-row items-center justify-center mt-6">
              <Text className="text-gray-600 font-urbanist text-small">
                Já tem uma conta?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-primary font-urbanist font-semibold text-small">
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