import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/hooks/useAuth';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setError('E-mail é obrigatório');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('E-mail inválido');
      return false;
    }

    return true;
  };

  const handleResetPassword = async () => {
    if (!validateEmail(email)) return;

    setError('');
    setLoading(true);
    
    try {
      await resetPassword(email);
      setEmailSent(true);
      Alert.alert(
        'E-mail enviado!',
        'Verifique sua caixa de entrada para redefinir sua senha.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/login')
          }
        ]
      );
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.response?.data?.message || 'Não foi possível enviar o e-mail. Tente novamente.'
      );
    } finally {
      setLoading(false);
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
              <Logo size={240} />
            </View>

            {/* Título */}
            <View className="mb-6">
              <Text className="text-primary font-urbanist font-bold text-h2 mb-2">
                Esqueceu sua senha?
              </Text>
              <Text className="text-primary font-urbanist text-body">
                {emailSent 
                  ? 'E-mail enviado! Verifique sua caixa de entrada.'
                  : 'Informe seu email abaixo para redefinir senha.'
                }
              </Text>
            </View>

            {!emailSent && (
              <>
                {/* Formulário */}
                <View className="w-full mb-8">
                  <Input
                    label="Email"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setError('');
                    }}
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    error={error}
                  />

                  <Button
                    title="Redefinir senha"
                    onPress={handleResetPassword}
                    variant="primary"
                    loading={loading}
                  />
                </View>
              </>
            )}

            {emailSent && (
              <View className="mb-8">
                <View className="bg-green-50 border border-green-200 rounded-button p-4 mb-6">
                  <Text className="text-green-800 font-urbanist text-body text-center">
                    ✉️ E-mail enviado com sucesso!
                  </Text>
                </View>

                <Button
                  title="Voltar para Login"
                  onPress={() => router.push('/login')}
                  variant="primary"
                />
              </View>
            )}

            {/* Link para login */}
            <View className="flex-row items-center justify-center">
              <Text className="text-primary font-urbanist text-small">
                Lembrei da minha senha!{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-primary font-urbanist font-bold text-small">
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            {/* Informações adicionais */}
            {emailSent && (
              <View className="mt-8 p-4 bg-white border-2 border-primary border-dotted rounded-button">
                <Text className="text-blue-800 font-urbanist text-tiny text-center">
                  💡 Você receberá um link para criar uma nova senha
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}