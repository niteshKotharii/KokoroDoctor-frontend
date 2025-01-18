import React, { createContext, useContext, useState } from 'react';

type ChatbotContextType = {
  isChatbotVisible: boolean;
  toggleChatbot: () => void;
};

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => setChatbotVisible((prev) => !prev);

  return (
    <ChatbotContext.Provider value={{ isChatbotVisible, toggleChatbot }}>
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