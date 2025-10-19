import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useState, useRef } from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const mapRef = useRef<MapView>(null);

  const recentlyViewed = [
    { id: 1, name: 'Praia do Futuro', image: '🏖️', rating: 4.8 },
    { id: 2, name: 'Dragão do Mar', image: '🎭', rating: 4.9 },
    { id: 3, name: 'Beach Park', image: '🎢', rating: 4.7 },
  ];

  const highlights = [
    { id: 1, name: 'Centro Histórico', category: 'Cultura', image: '🏛️' },
    { id: 2, name: 'Mercado Central', category: 'Gastronomia', image: '🍽️' },
  ];

  const nearby = [
    { id: 1, name: 'Café Colonial', distance: '0.8 km', image: '☕', latitude: -3.7319, longitude: -38.5267 },
    { id: 2, name: 'Museu da Imagem', distance: '1.2 km', image: '🖼️', latitude: -3.7289, longitude: -38.5197 },
    { id: 3, name: 'Parque Ibirapuera', distance: '2.5 km', image: '🌳', latitude: -3.7419, longitude: -38.5367 },
  ];

  const handleZoomIn = () => {
    mapRef.current?.getCamera().then((cam) => {
      if (cam.zoom !== undefined) {
        mapRef.current?.animateCamera({
          center: cam.center,
          zoom: cam.zoom + 1,
        });
      }
    });
  };

  const handleZoomOut = () => {
    mapRef.current?.getCamera().then((cam) => {
      if (cam.zoom !== undefined) {
        mapRef.current?.animateCamera({
          center: cam.center,
          zoom: cam.zoom - 1,
        });
      }
    });
  };

  const renderMap = (fullscreen = false) => (
    <View style={{ height: fullscreen ? '100%' : 200 }} className="relative">
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -3.7319,
          longitude: -38.5267,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
        showsMyLocationButton={false}
        zoomEnabled
        zoomControlEnabled={false}
        scrollEnabled
        pitchEnabled
        rotateEnabled
      >
        {nearby.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            title={place.name}
            description={place.distance}
          >
            <View className="bg-primary w-10 h-10 rounded-full items-center justify-center shadow-md border-2 border-white">
              <Text className="text-xl">{place.image}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Map Controls */}
      <View className="absolute right-3 top-3 gap-2">
        {fullscreen && (
          <TouchableOpacity 
            onPress={() => setIsMapFullscreen(false)}
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-md"
          >
            <Ionicons name="close" size={24} color="#1238b4" />
          </TouchableOpacity>
        )}
        
        {!fullscreen && (
          <TouchableOpacity 
            onPress={() => setIsMapFullscreen(true)}
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-md"
          >
            <Ionicons name="expand" size={20} color="#1238b4" />
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          onPress={handleZoomIn}
          className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-md"
        >
          <Ionicons name="add" size={24} color="#1238b4" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={handleZoomOut}
          className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-md"
        >
          <Ionicons name="remove" size={24} color="#1238b4" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => {
            mapRef.current?.animateToRegion({
              latitude: -3.7319,
              longitude: -38.5267,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
          }}
          className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-md"
        >
          <Ionicons name="locate" size={20} color="#1238b4" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      {/* Fullscreen Map Modal */}
      <Modal
        visible={isMapFullscreen}
        animationType="slide"
        statusBarTranslucent
      >
        <SafeAreaView className="flex-1 bg-secondary">
          {renderMap(true)}
        </SafeAreaView>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-small text-primary/60">Olá,</Text>
              <Text className="text-h2 text-primary font-bold">João Silva</Text>
            </View>
            <TouchableOpacity className="w-12 h-12 rounded-full bg-white items-center justify-center shadow-sm">
              <Ionicons name="notifications-outline" size={24} color="#1238b4" />
              <View className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="mb-4">
            <Text className="text-h1 text-primary font-bold mb-4">Aonde você quer ir?</Text>
            <View className="flex-row items-center bg-white rounded-input px-4 py-3 shadow-card">
              <Ionicons name="search" size={20} color="#1238b4" />
              <TextInput
                placeholder="Ex: Ceará, Fortaleza"
                placeholderTextColor="#1238b480"
                className="flex-1 ml-3 text-body text-primary"
              />
            </View>
          </View>

          {/* Date Picker */}
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-white rounded-input px-4 py-3 shadow-sm">
              <Text className="text-tiny text-primary/60 mb-1">Data</Text>
              <Text className="text-small text-primary font-semibold">dd/mm/aa</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white rounded-input px-4 py-3 shadow-sm">
              <Text className="text-tiny text-primary/60 mb-1">Data</Text>
              <Text className="text-small text-primary font-semibold">dd/mm/aa</Text>
            </TouchableOpacity>
          </View>

          {/* CTA Button */}
          <TouchableOpacity className="bg-primary rounded-button py-4 mt-4 shadow-md active:bg-primary/90">
            <Text className="text-secondary font-bold text-center text-body">Começar a planejar</Text>
          </TouchableOpacity>
        </View>

        {/* Propaganda Banner */}
        <View className="px-6 pb-6">
          <View className="w-full h-40 bg-primary/10 rounded-card items-center justify-center">
            <Text className="text-primary/40 font-bold text-h3">propaganda</Text>
          </View>
        </View>

        {/* Recently Viewed */}
        <View className="pb-6">
          <View className="px-6 flex-row items-center justify-between mb-4">
            <Text className="text-h3 text-primary font-bold">Visto recentemente</Text>
            <TouchableOpacity>
              <Text className="text-small text-primary/60 font-semibold">Ver todos</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {recentlyViewed.map((place) => (
              <TouchableOpacity 
                key={place.id} 
                className="bg-white rounded-card shadow-card mr-4"
                style={{ width: SCREEN_WIDTH * 0.5 }}
              >
                <View className="h-32 bg-primary/10 rounded-t-card items-center justify-center">
                  <Text className="text-6xl">{place.image}</Text>
                </View>
                <View className="p-4">
                  <Text className="text-body text-primary font-bold mb-1">{place.name}</Text>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="star" size={14} color="#ff6a32" />
                    <Text className="text-tiny text-primary/60 font-semibold">{place.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Highlights */}
        <View className="px-6 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-h3 text-primary font-bold">Destaques e Oportunidades na Sua Região</Text>
          </View>

          <View className="gap-3">
            {highlights.map((place) => (
              <TouchableOpacity 
                key={place.id} 
                className="bg-white rounded-card shadow-card overflow-hidden active:bg-primary/5"
              >
                <View className="flex-row">
                  <View className="w-24 h-24 bg-primary/10 items-center justify-center">
                    <Text className="text-5xl">{place.image}</Text>
                  </View>
                  <View className="flex-1 p-4 justify-center">
                    <Text className="text-body text-primary font-bold mb-1">{place.name}</Text>
                    <Text className="text-tiny text-primary/60">{place.category}</Text>
                  </View>
                  <View className="px-4 justify-center">
                    <Ionicons name="chevron-forward" size={20} color="#1238b4" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nearby with Map */}
        <View className="px-6 pb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-h3 text-primary font-bold">Próximo a você</Text>
          </View>

          {/* Map */}
          <View className="bg-white rounded-card shadow-card overflow-hidden mb-4">
            {renderMap(false)}
          </View>

          {/* List */}
          <View className="bg-white rounded-card shadow-card p-4">
            {nearby.map((place, idx) => (
              <TouchableOpacity 
                key={place.id}
                className={`flex-row items-center py-3 active:bg-primary/5 ${idx !== nearby.length - 1 ? 'border-b border-primary/5' : ''}`}
              >
                <View className="w-14 h-14 bg-primary/10 rounded-full items-center justify-center mr-3">
                  <Text className="text-3xl">{place.image}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-body text-primary font-bold mb-0.5">{place.name}</Text>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="navigate" size={12} color="#68c7d1" />
                    <Text className="text-tiny text-primary/60">{place.distance}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#1238b4" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}