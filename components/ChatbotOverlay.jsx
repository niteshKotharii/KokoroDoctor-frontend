import React, { useEffect, useState } from 'react';
import { useChatbot } from '../contexts/ChatbotContext';
import ChatBot from "./ChatBot";
import { Platform, Pressable, Text, useWindowDimensions, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ChatBotOverlay = ({ navigationRef }) => {
  const {chatbotConfig, openChatbot, closeChatbot} = useChatbot();
  const [currentRoute, setCurrentRoute] = useState(null);
  const {width} = useWindowDimensions();

  const handlePress = () => {
    navigationRef.current?.navigate("MobileChatbot");
  };

  // Update route state when navigation changes
  useEffect(() => {
      const updateRoute = () => {
      const routeName = navigationRef.current?.getCurrentRoute()?.name || null;
      setCurrentRoute(routeName);
      };

      const interval = setInterval(updateRoute, 500); // Check every 500ms

      return () => clearInterval(interval); // Cleanup on unmount
  }, [navigationRef]);

  // Screens where chatbot SHOULD be visible
  const visibleScreens = ['LandingPage', 'Doctors', 'Hospitals', 'Pricing']; // List of screens where chatbot appears

  // If current screen is NOT in the list, don't show chatbot
  if (!currentRoute || !visibleScreens.includes(currentRoute)) {
    return null;
  }
    return (  
      <>
        {(Platform.OS==='web' && width>900) && (
          <ChatBot/>
        )} 

        {(Platform.OS!=='web' || width<900) && (
          <Pressable onPress={handlePress} style={styles.pressable}>
            <Text style={styles.pressableText}>Ask me Anything....</Text>
            <MaterialIcons name="send" size={24} color="#000" />
          </Pressable>
        )}
      
      </>
    );
  }

const styles = StyleSheet.create({
  pressable: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#6495ed",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pressableText: {
    color: "#aaa",
    fontSize: 16,
  },
});

export default ChatBotOverlay;