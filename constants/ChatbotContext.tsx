import React, { createContext, useContext, useState } from "react";

const ChatbotContext = createContext({
  chatbotConfig: {},
  setChatbotConfig: (config: any) => {},
});

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  
  // Store multiple customization options
  const [chatbotConfig, setChatbotConfig] = useState({
    
  });

  const toggleChatbot = () => {
    setChatbotVisible((prev) => !prev);
  };

  return (
    <ChatbotContext.Provider value={{chatbotConfig, setChatbotConfig}}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
}; 
