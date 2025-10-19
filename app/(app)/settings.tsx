import { View, Text, ScrollView, TouchableOpacity, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);

  const generalSettings = [
    {
      icon: 'notifications',
      title: 'Notificações',
      subtitle: 'Receber alertas e atualizações',
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
      color: '#ff6a32',
    },
    {
      icon: 'moon',
      title: 'Modo Escuro',
      subtitle: 'Tema escuro para a interface',
      value: darkModeEnabled,
      onToggle: setDarkModeEnabled,
      color: '#1238b4',
    },
    {
      icon: 'volume-high',
      title: 'Sons',
      subtitle: 'Efeitos sonoros do aplicativo',
      value: soundEnabled,
      onToggle: setSoundEnabled,
      color: '#68c7d1',
    },
    {
      icon: 'phone-portrait',
      title: 'Vibração',
      subtitle: 'Feedback tátil nas interações',
      value: vibrationEnabled,
      onToggle: setVibrationEnabled,
      color: '#ff6a32',
    },
    {
      icon: 'cloud-download',
      title: 'Atualização Automática',
      subtitle: 'Baixar atualizações automaticamente',
      value: autoUpdateEnabled,
      onToggle: setAutoUpdateEnabled,
      color: '#1238b4',
    },
  ];

  const appSettings = [
    { icon: 'language', title: 'Idioma', value: 'Português (BR)', color: '#1238b4' },
    { icon: 'map', title: 'Unidade de Distância', value: 'Quilômetros', color: '#68c7d1' },
    { icon: 'cloud', title: 'Armazenamento', value: '2.3 GB usado', color: '#ff6a32' },
    { icon: 'refresh', title: 'Limpar Cache', value: '', color: '#1238b4' },
  ];

  const aboutItems = [
    { icon: 'information-circle', title: 'Sobre o App', value: 'Versão 1.0.0', color: '#1238b4' },
    { icon: 'star', title: 'Avaliar App', value: '', color: '#ff6a32' },
    { icon: 'share-social', title: 'Compartilhar', value: '', color: '#68c7d1' },
    { icon: 'help-circle', title: 'Central de Ajuda', value: '', color: '#1238b4' },
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
            <Text className="text-h1 text-primary font-bold flex-1">Configurações</Text>
          </View>

          {/* General Settings */}
          <View className="mb-6">
            <Text className="text-body text-primary font-bold mb-3">GERAL</Text>
            <View className="bg-white rounded-card shadow-card overflow-hidden">
              {generalSettings.map((setting, idx) => (
                <View 
                  key={idx}
                  className={`flex-row items-center p-4 ${idx !== generalSettings.length - 1 ? 'border-b border-primary/5' : ''}`}
                >
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: setting.color + '15' }}>
                    <Ionicons name={setting.icon as any} size={22} color={setting.color} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-body text-primary font-medium">{setting.title}</Text>
                    <Text className="text-tiny text-primary/60 mt-1">{setting.subtitle}</Text>
                  </View>
                  <Switch
                    value={setting.value}
                    onValueChange={setting.onToggle}
                    trackColor={{ false: '#d1d5db', true: '#1238b480' }}
                    thumbColor={setting.value ? '#1238b4' : '#f3f4f6'}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* App Settings */}
          <View className="mb-6">
            <Text className="text-body text-primary font-bold mb-3">APLICATIVO</Text>
            <View className="bg-white rounded-card shadow-card overflow-hidden">
              {appSettings.map((item, idx) => (
                <Pressable 
                  key={idx}
                  className={`flex-row items-center p-4 active:bg-primary/5 ${idx !== appSettings.length - 1 ? 'border-b border-primary/5' : ''}`}
                >
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: item.color + '15' }}>
                    <Ionicons name={item.icon as any} size={22} color={item.color} />
                  </View>
                  <Text className="text-body text-primary flex-1 font-medium">{item.title}</Text>
                  {item.value ? (
                    <Text className="text-tiny text-primary/60 mr-2">{item.value}</Text>
                  ) : null}
                  <Ionicons name="chevron-forward" size={20} color="#1238b4" />
                </Pressable>
              ))}
            </View>
          </View>

          {/* About */}
          <View className="mb-6">
            <Text className="text-body text-primary font-bold mb-3">SOBRE</Text>
            <View className="bg-white rounded-card shadow-card overflow-hidden">
              {aboutItems.map((item, idx) => (
                <Pressable 
                  key={idx}
                  className={`flex-row items-center p-4 active:bg-primary/5 ${idx !== aboutItems.length - 1 ? 'border-b border-primary/5' : ''}`}
                >
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: item.color + '15' }}>
                    <Ionicons name={item.icon as any} size={22} color={item.color} />
                  </View>
                  <Text className="text-body text-primary flex-1 font-medium">{item.title}</Text>
                  {item.value ? (
                    <Text className="text-tiny text-primary/60 mr-2">{item.value}</Text>
                  ) : null}
                  <Ionicons name="chevron-forward" size={20} color="#1238b4" />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Info Card */}
          <View className="bg-blue-50 border-l-4 border-primary rounded-lg p-4">
            <View className="flex-row items-start gap-3">
              <Ionicons name="information-circle" size={24} color="#1238b4" />
              <View className="flex-1">
                <Text className="text-primary font-bold text-sm mb-1">Dica</Text>
                <Text className="text-primary text-sm">
                  Mantenha o aplicativo atualizado para ter acesso às últimas funcionalidades e melhorias de segurança.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}