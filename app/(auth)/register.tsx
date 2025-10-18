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

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): boolean => {
    if (!username) {
      Alert.alert('Erro', 'Nome de usuário é obrigatório');
      return false;
    }
    if (username.length < 3) {
      Alert.alert('Erro', 'Nome deve ter no mínimo 3 caracteres');
      return false;
    }
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
    if (password.length < 6) {
      Alert.alert('Erro', 'Senha deve ter no mínimo 6 caracteres');
      return false;
    }
    if (!confirmPassword) {
      Alert.alert('Erro', 'Confirmação de senha é obrigatória');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signUp({ username, email, password });
      Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!', [{ text: 'OK' }]);
    } catch (error: any) {
      Alert.alert(
        'Erro no cadastro',
        error.response?.data?.message || 'Não foi possível realizar o cadastro.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar com Google.');
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
            <View className="items-center mb-6">
              <Logo variant="short" color="primary" size={100} />
            </View>

            {/* Título */}
            <View className="mb-6">
              <Text className="text-primary font-bold text-3xl mb-2">
                Criar Conta
              </Text>
              <Text className="text-primary text-base">
                Preencha os dados abaixo para se cadastrar
              </Text>
            </View>

            {/* Formulário */}
            <View className="w-full gap-4">
              {/* Username */}
              <View className="gap-2">
                <Text className="text-primary font-bold text-sm">Nome de usuário</Text>
                <Input
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Digite seu nome de usuário"
                  autoCapitalize="none"
                  editable={!loading}
                  className="bg-white border-2 border-primary"
                />
              </View>

              {/* Email */}
              <View className="gap-2">
                <Text className="text-primary font-bold text-sm">Email</Text>
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

              {/* Password */}
              <View className="gap-2">
                <Text className="text-primary font-bold text-sm">Criar senha</Text>
                <View className="relative">
                  <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Crie uma senha segura"
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

              {/* Confirm Password */}
              <View className="gap-2">
                <Text className="text-primary font-bold text-sm">Confirmar senha</Text>
                <View className="relative">
                  <Input
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirme sua senha"
                    secureTextEntry={!showConfirmPassword}
                    editable={!loading}
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

              {/* Register Button */}
              <Button
                onPress={handleRegister}
                disabled={loading}
                className="bg-primary h-12 mt-2"
              >
                {loading ? (
                  <ActivityIndicator color="#fff5dc" />
                ) : (
                  <Text className="text-secondary font-semibold">Cadastrar</Text>
                )}
              </Button>
            </View>

            {/* Divider */}
            <Divider />

            {/* Google Register */}
            <Button
              onPress={handleGoogleRegister}
              variant="outline"
              disabled={loading}
              className="border-2 border-primary bg-transparent h-12"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="logo-google" size={24} color="#1238b4" />
                <Text className="text-primary font-semibold">Cadastrar com Google</Text>
              </View>
            </Button>

            {/* Login Link */}
            <View className="flex-row items-center justify-center mt-6">
              <Text className="text-primary text-sm">
                Já tem uma conta?{' '}
              </Text>
              <TouchableOpacity 
                onPress={() => router.push('/login')}
                disabled={loading}
              >
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