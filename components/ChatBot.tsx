import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/Navigation";

type ChatBotProps = Partial<NativeStackScreenProps<RootStackParamList, 'First'>> & {
    setChatbotVisible: (visible: boolean) => void;
};

type Message = {
    sender: 'user' | 'bot';
    text: string;
};

const ChatBot = ({ setChatbotVisible }: ChatBotProps) => {

    const [messages, setMessages] = useState<Message[]>([]); // Messages state
    const [userMessage, setUserMessage] = useState<string>("");

    useEffect(() => {
        // Set initial message when the chatbot is first rendered
        setMessages([{ sender: 'bot', text: "Hello, How may I help you today?" }]);
    }, []);

    const sendMessageToBot = async () => {
        debugger;
        if (!userMessage.trim()) return;
    
        // Add user's message to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'user', text: userMessage },
        ]);
    
        try {
          // Send user's message to the Rasa backend
          const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sender: "user123", message: userMessage }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const botReplies: { text: string }[] = await response.json(); // Expecting an array of responses
    
          // Append bot replies to the chat
          const botMessages = botReplies.map((reply) => ({
            sender: 'bot' as const,
            text: reply.text,
          }));
    
          setMessages((prevMessages) => [...prevMessages, ...botMessages]);
        } catch (error) {
          console.error("Error communicating with Rasa:", error);
    
          // Add error message to chat
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: "Error: Unable to connect to the bot." },
          ]);
        }
    
        // Clear the input field
        setUserMessage("");
        Keyboard.dismiss();
      };

      const renderItem = ({ item }: { item: Message }) => (
        <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
      );
    

    return (
        <LinearGradient colors={['#141E30', '#243B55']} style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setChatbotVisible(false)}>
                <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={userMessage}
                onChangeText={setUserMessage}
                placeholder="Type your message..."
                onSubmitEditing={sendMessageToBot} // Trigger sending message on Enter key
                returnKeyType="send"
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessageToBot}> 
                <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 5,
    },
    message: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#4A90E2',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#50E3C2',
    },
    messageText: {
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderColor: '#555',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        color: 'white',
    },
    sendButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ChatBot;
