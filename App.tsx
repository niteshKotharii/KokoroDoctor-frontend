import React, { useRef } from 'react';
import { ThemeProvider } from './constants/ThemeContext';
import AppNavigation from './navigation/Navigation';
import { ChatbotProvider } from './constants/ChatbotContext';
import ChatBotOverlay from './components/ChatbotOverlay';
import { NavigationContainerRef } from '@react-navigation/native';

const App: React.FC = () => {
  const navigationRef = useRef<NavigationContainerRef<any>>(null); // Create navigation ref

  return (
    <ThemeProvider>
      <ChatbotProvider>
        <AppNavigation navigationRef={navigationRef} />
        <ChatBotOverlay navigationRef={navigationRef} />
      </ChatbotProvider>
    </ThemeProvider>
  );
};

export default App;
