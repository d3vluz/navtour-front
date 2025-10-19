import { View, Text, ScrollView, TouchableOpacity, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function PrivacySecurityScreen() {
  const router = useRouter();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);
  const [activityVisible, setActivityVisible] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const securityOptions = [
    {
      icon: 'finger-print',
      title: 'Autenticação Biométrica',
      subtitle: 'Use impressão digital ou Face ID',
      value: biometricEnabled,
      onToggle: setBiometricEnabled,
      color: '#1238b4',
    },
    {
      icon: 'shield-checkmark',
      title: 'Autenticação de Dois Fatores',
      subtitle: 'Adicione uma camada extra de segurança',
      value: twoFactorEnabled,
      onToggle: setTwoFactorEnabled,
      color: '#ff6a32',
    },
  ];

  const privacyOptions = [
    {
      icon: 'location',
      title: 'Compartilhar Localização',
      subtitle: 'Permitir recomendações baseadas em localização',
      value: locationSharing,
      onToggle: setLocationSharing,
      color: '#68c7d1',
    },
    {
      icon: 'eye',
      title: 'Atividade Visível',
      subtitle: 'Outros usuários podem ver suas viagens',
      value: activityVisible,
      onToggle: setActivityVisible,
      color: '#1238b4',
    },
    {
      icon: 'mail',
      title: 'E-mails Promocionais',
      subtitle: 'Receber ofertas e novidades',
      value: marketingEmails,
      onToggle: setMarketingEmails,
      color: '#ff6a32',
    },
  ];

  const accountActions = [
    { icon: 'key', title: 'Alterar Senha', color: '#1238b4', route: null },
    { icon: 'document-text', title: 'Termos de Uso', color: '#1238b4', route: null },
    { icon: 'shield', title: 'Política de Privacidade', color: '#1238b4', route: null },
    { icon: 'trash', title: 'Excluir Conta', color: '#EF4444', route: null },
];

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
            <Text className="text-h2 text-primary font-bold flex-1">Privacidade & Segurança</Text>
          </View>

          {/* Security Section */}
          <View className="mb-6">
            <Text className="text-body text-primary font-bold mb-3">SEGURANÇA</Text>
            <View className="bg-white rounded-card shadow-card overflow-hidden">
              {securityOptions.map((option, idx) => (
                <View 
                  key={idx}
                  className={`flex-row items-center p-4 ${idx !== securityOptions.length - 1 ? 'border-b border-primary/5' : ''}`}
                >
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: option.color + '15' }}>
                    <Ionicons name={option.icon as any} size={22} color={option.color} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-body text-primary font-medium">{option.title}</Text>
                    <Text className="text-tiny text-primary/60 mt-1">{option.subtitle}</Text>
                  </View>
                  <Switch
                    value={option.value}
                    onValueChange={option.onToggle}
                    trackColor={{ false: '#d1d5db', true: '#1238b480' }}
                    thumbColor={option.value ? '#1238b4' : '#f3f4f6'}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Privacy Section */}
          <View className="mb-6">
            <Text className="text-body text-primary font-bold mb-3">PRIVACIDADE</Text>
            <View className="bg-white rounded-card shadow-card overflow-hidden">
              {privacyOptions.map((option, idx) => (
                <View 
                  key={idx}
                  className={`flex-row items-center p-4 ${idx !== privacyOptions.length - 1 ? 'border-b border-primary/5' : ''}`}
                >
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: option.color + '15' }}>
                    <Ionicons name={option.icon as any} size={22} color={option.color} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-body text-primary font-medium">{option.title}</Text>
                    <Text className="text-tiny text-primary/60 mt-1">{option.subtitle}</Text>
                  </View>
                  <Switch
                    value={option.value}
                    onValueChange={option.onToggle}
                    trackColor={{ false: '#d1d5db', true: '#1238b480' }}
                    thumbColor={option.value ? '#1238b4' : '#f3f4f6'}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Account Actions */}
          <View className="mb-6">
            <Text className="text-body text-primary font-bold mb-3">CONTA</Text>
            <View className="bg-white rounded-card shadow-card overflow-hidden">
              {accountActions.map((action, idx) => (
                <Pressable 
                  key={idx}
                  className={`flex-row items-center p-4 active:bg-primary/5 ${idx !== accountActions.length - 1 ? 'border-b border-primary/5' : ''}`}
                >
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: action.color + '15' }}>
                    <Ionicons name={action.icon as any} size={22} color={action.color} />
                  </View>
                  <Text className="text-body font-medium flex-1" style={{ color: action.color }}>
                    {action.title}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color={action.color} />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Warning Card */}
          <View className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
            <View className="flex-row items-start gap-3">
              <Ionicons name="warning" size={24} color="#EF4444" />
              <View className="flex-1">
                <Text className="text-red-800 font-bold text-sm mb-1">Atenção</Text>
                <Text className="text-red-700 text-sm">
                  A exclusão da conta é permanente e não pode ser desfeita. 
                  Todos os seus dados serão removidos.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}