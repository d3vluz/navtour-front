import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useState, useRef } from 'react';

export interface MapLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  distance?: string;
  image?: string;
}

interface InteractiveMapProps {
  locations: MapLocation[];
  initialRegion?: Region;
  height?: number;
  showControls?: boolean;
  onMarkerPress?: (location: MapLocation) => void;
}

export function InteractiveMap({
  locations,
  initialRegion = {
    latitude: -3.7319,
    longitude: -38.5267,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  },
  height = 200,
  showControls = true,
  onMarkerPress,
}: InteractiveMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef<MapView>(null);

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

  const handleRecenter = () => {
    mapRef.current?.animateToRegion(initialRegion);
  };

  const renderMap = (fullscreen = false) => (
    <View style={{ height: fullscreen ? '100%' : height }} className="relative">
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton={false}
        zoomEnabled
        zoomControlEnabled={false}
        scrollEnabled
        pitchEnabled
        rotateEnabled
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
            description={location.distance}
            onPress={() => onMarkerPress?.(location)}
          >
            <View className="bg-primary w-10 h-10 rounded-full items-center justify-center shadow-md border-2 border-white">
              <Text className="text-xl">{location.image || '📍'}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {showControls && (
        <View className="absolute right-3 top-3 gap-2">
          {fullscreen && (
            <TouchableOpacity 
              onPress={() => setIsFullscreen(false)}
              className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-md"
            >
              <Ionicons name="close" size={24} color="#1238b4" />
            </TouchableOpacity>
          )}
          
          {!fullscreen && (
            <TouchableOpacity 
              onPress={() => setIsFullscreen(true)}
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
            onPress={handleRecenter}
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-md"
          >
            <Ionicons name="locate" size={20} color="#1238b4" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <>
      <Modal
        visible={isFullscreen}
        animationType="slide"
        statusBarTranslucent
      >
        <SafeAreaView className="flex-1 bg-secondary">
          {renderMap(true)}
        </SafeAreaView>
      </Modal>

      {renderMap(false)}
    </>
  );
}