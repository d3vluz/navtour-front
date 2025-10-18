import React from 'react';
import { View, Text } from 'react-native';

interface DividerProps {
  text?: string;
}

export function Divider({ text = 'OU' }: DividerProps) {
  return (
    <View className="flex-row items-center my-6">
      <View className="flex-1 h-px bg-primary" />
      <Text className="mx-4 text-primary font-urbanist text-small font-bold">
        {text}
      </Text>
      <View className="flex-1 h-px bg-primary" />
    </View>
  );
}