import React, { useRef } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import AppNavigation from './navigation/Navigation';
import { ChatbotProvider } from './contexts/ChatbotContext';
import ChatBotOverlay from './components/ChatbotOverlay';
import {AuthProvider} from './contexts/AuthContext';

const App = () => {
  const navigationRef = useRef(null);

  return (
    <AuthProvider>
      <ThemeProvider>
        <ChatbotProvider>
          <AppNavigation navigationRef={navigationRef} />
          <ChatBotOverlay navigationRef={navigationRef} />
        </ChatbotProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
