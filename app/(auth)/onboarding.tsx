import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Pressable, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ONBOARDING_DATA = {
  tiposViajante: [
    { id: 1, nome: "Sozinho" },
    { id: 2, nome: "Casal" },
    { id: 3, nome: "Família" },
    { id: 4, nome: "Amigos" },
    { id: 5, nome: "Mochileiro" },
    { id: 6, nome: "Criança" },
    { id: 7, nome: "Corporativo" },
    { id: 8, nome: "Idosos" }
  ],
  experiencias: [
    { id: 101, nome: "Praias" },
    { id: 102, nome: "Mirantes" },
    { id: 103, nome: "Cachoeiras" },
    { id: 104, nome: "Parques Naturais" },
    { id: 105, nome: "Trilhas" },
    { id: 106, nome: "Lagoas" },
    { id: 201, nome: "Museus" },
    { id: 202, nome: "Centros Históricos" },
    { id: 203, nome: "Igrejas e Templos" },
    { id: 204, nome: "Monumentos" },
    { id: 205, nome: "Arquitetura Local" },
    { id: 206, nome: "Sítios Históricos" },
    { id: 301, nome: "Bares e Pubs" },
    { id: 302, nome: "Botecos Locais" },
    { id: 303, nome: "Baladas" },
    { id: 304, nome: "Casas de Show" },
    { id: 305, nome: "Rooftops" },
    { id: 306, nome: "Vida Noturna" },
    { id: 401, nome: "Restaurantes Típicos" },
    { id: 402, nome: "Feiras Gastronômicas" },
    { id: 403, nome: "Mercados Locais" },
    { id: 404, nome: "Cafeterias" },
    { id: 405, nome: "Food Trucks" },
    { id: 406, nome: "Comida de Rua" },
    { id: 501, nome: "Festivais e Eventos" },
    { id: 502, nome: "Shows ao Vivo" },
    { id: 503, nome: "Teatro" },
    { id: 504, nome: "Artesanato Local" },
    { id: 505, nome: "Galerias de Arte" },
    { id: 506, nome: "Espaços Culturais" },
    { id: 601, nome: "Esportes e Aventura" },
    { id: 602, nome: "Mergulho" },
    { id: 603, nome: "Surf" },
    { id: 604, nome: "Passeios de Barco" },
    { id: 605, nome: "Cicloturismo" },
    { id: 606, nome: "Ecoturismo" }
  ],
  infraestrutura: [
    { id: 801, nome: "Acessibilidade" },
    { id: 802, nome: "Pet Friendly" },
    { id: 803, nome: "Wi-Fi Gratuito" },
    { id: 804, nome: "Estacionamento" },
    { id: 805, nome: "Guia Local" },
    { id: 806, nome: "Instagramável" },
    { id: 807, nome: "Transporte Público" },
    { id: 808, nome: "Segurança 24h" },
    { id: 809, nome: "Ar Condicionado" },
    { id: 810, nome: "Aceita Cartão" },
    { id: 811, nome: "Ambiente Familiar" },
    { id: 812, nome: "Espaço Kids" },
    { id: 813, nome: "Ar Livre" },
    { id: 814, nome: "Cobertura" },
    { id: 815, nome: "Banheiros Limpos" },
    { id: 816, nome: "Água Potável" },
    { id: 817, nome: "Sombra" },
    { id: 818, nome: "Vista Panorâmica" },
    { id: 819, nome: "Silencioso" },
    { id: 820, nome: "Animado" },
    { id: 821, nome: "Inglês Falado" },
    { id: 822, nome: "Gratuito" },
    { id: 823, nome: "Desconto Estudante" },
    { id: 824, nome: "Reserva Online" }
  ]
};

const STEPS = [
  { 
    key: 'welcome',
    title: 'Queremos te conhecer melhor',
    subtitle: 'Vamos personalizar sua experiência para encontrar os melhores lugares para você',
    isWelcome: true,
    image: require('@/assets/concept_art/ilust_05.png')
  },
  { 
    key: 'tiposViajante', 
    title: 'Como você prefere viajar?', 
    subtitle: 'Escolha uma ou mais opções',
    min: 1,
    image: require('@/assets/concept_art/ilust_11.png')
  },
  { 
    key: 'experiencias', 
    title: 'Que tipo de lugar te atrai?', 
    subtitle: 'Escolha os pontos de interesse',
    min: 3,
    image: require('@/assets/concept_art/ilust_08.png')
  },
  { 
    key: 'infraestrutura', 
    title: 'O que é essencial para você?', 
    subtitle: 'Escolha os recursos importantes',
    min: 1,
    image: require('@/assets/concept_art/ilust_02.png')
  }
];

type SelectionState = {
  tiposViajante: number[];
  experiencias: number[];
  infraestrutura: number[];
};

type StepKey = keyof SelectionState;

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<SelectionState>({
    tiposViajante: [],
    experiencias: [],
    infraestrutura: []
  });

  const currentStepData = STEPS[currentStep];
  const isWelcomeStep = currentStepData.isWelcome;
  const isLastStep = currentStep === STEPS.length - 1;

  const toggleSelection = (stepKey: StepKey, itemId: number) => {
    setSelections(prev => {
      const current = prev[stepKey] || [];
      const exists = current.includes(itemId);
      
      return {
        ...prev,
        [stepKey]: exists 
          ? current.filter(id => id !== itemId)
          : [...current, itemId]
      };
    });
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleComplete = () => {
    console.log('Preferências salvas:', selections);
    router.push("/home");
  };

  const handleSkip = () => {
    router.push("/home");
  };

  const renderWelcome = () => {
    return (
      <View className="flex-1 px-6 justify-center">
        <View className="items-center justify-center mb-8" style={{ height: SCREEN_WIDTH * 0.8 }}>
          <Image 
            source={currentStepData.image} 
            className="w-full h-full rounded-3xl"
            resizeMode="cover"
          />
        </View>

        <View className="mb-8">
          <Text className="text-primary font-bold text-3xl mb-3">
            {currentStepData.title}
          </Text>
          <Text className="text-gray-500 text-lg leading-6">
            {currentStepData.subtitle}
          </Text>
        </View>
      </View>
    );
  };

  const renderCard = ({ id, nome }: { id: number; nome: string }) => {
    const stepKey = currentStepData.key as StepKey;
    const isSelected = selections[stepKey]?.includes(id);

    return (
      <Pressable
        key={id}
        onPress={() => toggleSelection(stepKey, id)}
        style={{ 
          minWidth: '28%', 
          maxWidth: '48%',
          flexGrow: 1,
          flexShrink: 0
        }}
        className={`px-5 py-3 rounded-full border-2 mb-3 ${
          isSelected 
            ? 'bg-primary border-primary' 
            : 'bg-white border-gray-200'
        }`}
      >
        <Text className={`font-semibold text-sm text-center ${
          isSelected ? 'text-secondary' : 'text-primary'
        }`}>
          {nome}
        </Text>
      </Pressable>
    );
  };

  const renderContent = () => {
    if (isWelcomeStep) {
      return renderWelcome();
    }

    const data = currentStepData.key === 'experiencias'
      ? ONBOARDING_DATA.experiencias 
      : currentStepData.key === 'tiposViajante' 
        ? ONBOARDING_DATA.tiposViajante 
        : ONBOARDING_DATA.infraestrutura;

    return (
      <View className="px-6">
        <View className="items-center justify-center mb-8" style={{ height: 360 }}>
          <Image 
            source={currentStepData.image} 
            className="w-full h-full rounded-3xl"
            resizeMode="cover"
          />
        </View>

        <View className="flex-row flex-wrap">
          {data.map(item => renderCard(item))}
        </View>
      </View>
    );
  };

  const selectedCount = !isWelcomeStep 
    ? selections[currentStepData.key as StepKey]?.length || 0 
    : 0;
  const minSelected = isWelcomeStep || (currentStepData.min ? selectedCount >= currentStepData.min : selectedCount > 0);

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-1">
        {!isWelcomeStep && (
          <View className="px-6 pt-4 pb-6">
            <View className="flex-row justify-between items-center mb-6">
              <View className="flex-1 flex-row gap-2">
                {STEPS.slice(1).map((_, idx) => (
                  <View 
                    key={idx}
                    className={`flex-1 h-1 rounded-full ${
                      idx < currentStep ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </View>
              <TouchableOpacity onPress={handleSkip} className="ml-4">
                <Text className="text-cyan font-semibold text-base">Pular</Text>
              </TouchableOpacity>
            </View>

            <View className="mb-6">
              <Text className="text-primary font-bold text-2xl mb-2">
                {currentStepData.title}
              </Text>
              <Text className="text-gray-500 text-base">
                {currentStepData.subtitle}
              </Text>
            </View>
          </View>
        )}

        {isWelcomeStep ? (
          <View className="flex-1">
            {renderContent()}
          </View>
        ) : (
          <ScrollView 
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 140 }}
          >
            {renderContent()}
          </ScrollView>
        )}

        <View className="absolute bottom-0 left-0 right-0 bg-secondary/95 backdrop-blur-xl border-t border-gray-100 px-6 py-6">
          <View className="flex-row items-center gap-4">
            {currentStep > 0 && (
              <TouchableOpacity
                onPress={() => setCurrentStep(prev => prev - 1)}
                className="w-14 h-14 bg-white border border-gray-200 rounded-2xl items-center justify-center"
              >
                <Text className="text-primary text-xl">←</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              onPress={isLastStep ? handleComplete : handleNext}
              disabled={!minSelected}
              className={`flex-1 h-14 rounded-2xl items-center justify-center ${
                minSelected 
                  ? 'bg-primary' 
                  : 'bg-gray-200'
              }`}
            >
              <Text className={`font-bold text-lg ${
                minSelected ? 'text-secondary' : 'text-gray-400'
              }`}>
                {isWelcomeStep ? 'Começar' : isLastStep ? 'Concluir' : 'Continuar'}
              </Text>
            </TouchableOpacity>
          </View>

          {!minSelected && !isWelcomeStep && currentStepData.min && (
            <Text className="text-center text-gray-400 text-sm mt-3">
              Selecione pelo menos {currentStepData.min} {currentStepData.min === 1 ? 'opção' : 'opções'}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}