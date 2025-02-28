import { Platform } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const MyLinearGradient = ({ children, style }) => {
  let arr1 = ['#FFE5D9', '#FFD6CC', '#E6F3FF', '#CCE7FF']; // Mobile gradient
  let arr2 = [
    '#FFE5D9',
    '#FFD6CC',
    '#FFD6CC',
    '#F0F8FF',
    '#E6F3FF',
    '#E6F3FF',
    '#CCE7FF',
    '#CCE7FF',
  ]; // Web gradient with smoother transition

  return (
    <LinearGradient
      colors={Platform.OS === 'web' ? arr2 : arr1}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

export default MyLinearGradient;
