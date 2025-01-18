import React, { useState } from 'react';
import { ThemeProvider } from './constants/ThemeContext';
import AppNavigation from './navigation/Navigation';
import { ChatbotProvider, useChatbot } from './constants/ChatbotContext';
import ChatBot from './components/ChatBot';
import { Platform } from 'react-native';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function App(): React.JSX.Element {
  // const [isChatbotVisible, setChatbotVisible] = useState(false);

  return (
    <ThemeProvider>
      <ChatbotProvider>
        <AppNavigation />
        <ChatBotOverlay />
      </ChatbotProvider>

      {/* <TouchableOpacity
        style={styles.chatbotToggle}
        onPress={() => setChatbotVisible(!isChatbotVisible)}
      >
        <Image
          source={require('./assets/Images/chaticon.png')}
          style={styles.chatIcon}
        />
      </TouchableOpacity>

      {isChatbotVisible && (
        <View style={styles.chatbotContainer}>
          <ChatBot setChatbotVisible={setChatbotVisible} />
        </View>
      )} */}

    </ThemeProvider>
  );
}

function ChatBotOverlay() {
  const { isChatbotVisible, toggleChatbot } = useChatbot();

  return (
    <>
      <TouchableOpacity
        style={styles.chatbotToggle}
        onPress={toggleChatbot}
      >
        <Image
          source={require('./assets/Images/chaticon.png')}
          style={styles.chatIcon}
        />
      </TouchableOpacity>

      {/* Chatbot */}
      {isChatbotVisible && (
        <View style={styles.chatbotContainer}>
          <ChatBot setChatbotVisible={toggleChatbot} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  chatbotToggle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 10,
  },
  chatIcon: {
    width: 36,
    height: 36,
  },
  chatbotContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? 50 : 20,
    right: Platform.OS === 'web' ? 20 : 10, 
    width: Platform.OS === 'web' ? '25%' : 400,
    height: Platform.OS === 'web' ? '50%' : 400, 
    maxWidth: "30%", 
    maxHeight: "45%", 
    backgroundColor: 'rgba(20, 30, 48, 0.95)', 
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 20,
  },
});

// const styles = StyleSheet.create({
//   chatbotToggle: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//   },
//   chatIcon: {
//     width: 36,
//     height: 36,
//   },
//   chatbotContainer: {
//     position: 'absolute',
//     bottom: 50,
//     right: 20,
//     width: "30%",
//     height: "50%",
//     zIndex: 10,
//   },
// });

export default App;
