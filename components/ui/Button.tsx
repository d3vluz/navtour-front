import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'google';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false,
  disabled = false,
  icon 
}: ButtonProps) {
  const baseStyles = "rounded-button py-4 px-6 flex-row items-center justify-center";
  
  const variantStyles = {
    primary: "bg-primary text-secondary border-2 border-primary hover:bg-secondary hover:text-primary transition-colors  duration-300",
    secondary: "bg-secondary",
    outline: "border-2 border-gray-300 bg-transparent",
    google: "border border-primary bg-transparent"
  };
  
  const textStyles = {
    primary: "text-white font-urbanist font-semibold text-body",
    secondary: "text-primary font-urbanist font-semibold text-body",
    outline: "text-primary font-urbanist font-semibold text-body",
    google: "text-primary font-urbanist font-semibold text-body"
  };
  
  const isDisabled = disabled || loading;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`${baseStyles} ${variantStyles[variant]} ${isDisabled ? 'opacity-50' : ''}`}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#0f1419'} />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon && icon}
          <Text className={textStyles[variant]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}