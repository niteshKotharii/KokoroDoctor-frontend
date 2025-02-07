import React, { useEffect, useState } from 'react';
import { useChatbot } from '../constants/ChatbotContext';
import ChatBot from "./ChatBot";
import { NavigationContainerRef } from '@react-navigation/native';

type ChatBotOverlayProps = {
  navigationRef: React.RefObject<NavigationContainerRef<any>>;
};

const ChatBotOverlay: React.FC<ChatBotOverlayProps> = ({ navigationRef }) => {
  const {chatbotConfig} = useChatbot();

  const [currentRoute, setCurrentRoute] = useState<string | null>(null);

// Update route state when navigation changes
    useEffect(() => {
        const updateRoute = () => {
        const routeName = navigationRef.current?.getCurrentRoute()?.name || null;
        setCurrentRoute(routeName);
        };

        const interval = setInterval(updateRoute, 500); // Check every 50ms

        return () => clearInterval(interval); // Cleanup on unmount
    }, [navigationRef]);

  // Screens where chatbot SHOULD be visible
  const visibleScreens = ['LandingPage', 'Dashboard', 'Hospitals']; // List of screens where chatbot appears

  // If current screen is NOT in the list, don't show chatbot
  if (!currentRoute || !visibleScreens.includes(currentRoute)) {
    return null;
  }

    return (  
        <ChatBot/> 
    );
  }

  export default ChatBotOverlay;