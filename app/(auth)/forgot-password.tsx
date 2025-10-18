import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Logo } from '@/components/ui/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email: string): boolean => {
    if (!email) {
      Alert.alert('Erro', 'E-mail é obrigatório');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Erro', 'E-mail inválido');
      return false;
    }
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateEmail(email)) return;

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
        error.response?.data?.message || 'Não foi possível enviar o e-mail.'
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
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 py-8">
            {/* Logo */}
            <View className="items-center mb-8">
              <Logo variant="long" color="primary" size={240} />
            </View>

            {/* Título */}
            <View className="mb-6">
              <Text className="text-primary font-bold text-3xl mb-2">
                Esqueceu sua senha?
              </Text>
              <Text className="text-primary text-base">
                {emailSent 
                  ? 'E-mail enviado! Verifique sua caixa de entrada.'
                  : 'Informe seu email abaixo para redefinir senha.'
                }
              </Text>
            </View>

            {!emailSent ? (
              <>
                {/* Formulário */}
                <View className="w-full gap-4 mb-8">
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

                  <Button
                    onPress={handleResetPassword}
                    disabled={loading}
                    className="bg-primary h-12 mt-2"
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff5dc" />
                    ) : (
                      <Text className="text-secondary font-semibold">Redefinir senha</Text>
                    )}
                  </Button>
                </View>
              </>
            ) : (
              <View className="mb-8 gap-4">
                {/* Success Message */}
                <View className="bg-cyan/20 border-2 border-cyan rounded-lg p-4">
                  <Text className="text-primary text-base text-center">
                    ✉️ E-mail enviado com sucesso!
                  </Text>
                </View>

                <Button
                  onPress={() => router.push('/login')}
                  className="bg-primary h-12"
                >
                  <Text className="text-secondary font-semibold">Voltar para Login</Text>
                </Button>

                {/* Info Box */}
                <View className="mt-4 p-4 bg-white border-2 border-primary border-dashed rounded-lg">
                  <Text className="text-primary text-sm text-center">
                    💡 Você receberá um link para criar uma nova senha
                  </Text>
                </View>
              </View>
            )}

            {/* Link para login */}
            <View className="flex-row items-center justify-center">
              <Text className="text-primary text-sm">
                Lembrei da minha senha!{' '}
              </Text>
              <TouchableOpacity 
                onPress={() => router.push('/login')}
                disabled={loading}
              >
                <Text className="text-primary font-bold text-sm">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}