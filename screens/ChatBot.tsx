import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons from expo
import { LinearGradient } from 'expo-linear-gradient'; // Importing LinearGradient from expo
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/Navigation";

type FirstProps = NativeStackScreenProps<RootStackParamList, 'First'>;

type ChatBotProps = FirstProps & {
    setChatbotVisible: (visible: boolean) => void;
};

const ChatBot = ({ setChatbotVisible }: ChatBotProps) => {
    const [messages, setMessages] = useState<{ id: string; text: string; sender: 'user' | 'bot' }[]>([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        debugger;
        if (input.trim()) {
            const userMessage = { id: Date.now().toString(), text: input, sender: 'user' as 'user' };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            const userInput = input;
            setInput('');
    
            // Fetch bot response from Hugging Face API
            try {
                const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer hf_XXXXXXXXXXXXXXXXXXXX', // Replace with your Hugging Face API token
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ inputs: userInput }),
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                const botResponse = data?.generated_text || "I'm sorry, I couldn't understand that.";
                const botMessage = { id: Date.now().toString(), text: botResponse, sender: 'bot' as 'bot' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } catch (error) {
                const botMessage = { id: Date.now().toString(), text: 'Sorry, I am having trouble understanding you right now.', sender: 'bot' as 'bot' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
                console.error('Error:', error);
            }
        }
    };
    

    return (
        <LinearGradient colors={['#141E30', '#243B55']} style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setChatbotVisible(false)}>
                <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type a message"
                    placeholderTextColor="#888"
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
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
