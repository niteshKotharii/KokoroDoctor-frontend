import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
const MyLinearGradient = ({ children, style }) => {
  return (
    
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.8)', 'rgba(138, 112, 255, 0.8)']} 
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 0 }}   
      style={style}
    >
      {children}
    </LinearGradient>
    
  );
};

export default MyLinearGradient;
