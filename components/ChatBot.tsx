import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  TextInput,
  Keyboard,
  Text,
  FlatList
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useChatbot } from '../constants/ChatbotContext';
import { Audio } from 'expo-av';

type Message = {
    sender: 'user' | 'bot';
    text: string;
    audio?: string;
};

type ChatbotConfig = {
    height?: number;
    left?: number;
};

const ChatBot = () => {
    const { chatbotConfig }: { chatbotConfig: ChatbotConfig } = useChatbot();
    const [messages, setMessages] = useState<Message[]>([]); 
    const [userMessage, setUserMessage] = useState<string>("");
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [playingMessage, setPlayingMessage] = useState<number | null>(null);
    const [audioHistory, setAudioHistory] = useState<{ index: number; audioUrl: string }[]>([]);

    useEffect(() => {
        setMessages([{ sender: 'bot', text: "Hello, How may I help you today?" }]);
    }, []);

    const sendMessageToBot = async () => {
        if (!userMessage.trim()) return;
    
        const messageIndex = messages.length; // Store the index of the user message
        const messageToSend = userMessage;
        setUserMessage("");
    
        setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'user', text: messageToSend }
        ]);
    
        try {
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: messageToSend, language: "en" }),
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
            const botReply = await response.json(); // Expecting { audio: 'url', text: 'response' }
    
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'bot', text: botReply.text, audio: botReply.audio }
            ]);
    
            // Store new audio in history
            setAudioHistory(prev => [...prev, { index: messageIndex + 1, audioUrl: botReply.audio }]);
    
        } catch (error) {
            console.error("Error communicating with Bot:", error);
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'bot', text: "Error: Unable to connect to the bot." },
            ]);
        }
    
        Keyboard.dismiss();
    };    
    
    const playPauseAudio = async (index: number) => {
        const audioEntry = audioHistory.find(entry => entry.index === index);
        if (!audioEntry) return;
    
        if (playingMessage === index) {
            if (sound) {
                await sound.pauseAsync();
            }
            setPlayingMessage(null);
        } else {
            if (sound) {
                await sound.unloadAsync(); // Immediately stop old audio
            }
    
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioEntry.audioUrl });
            setSound(newSound);
            setPlayingMessage(index);
    
            /**  Add a small delay to ensure the state updates before playing **/
            setTimeout(async () => {
                await newSound.playAsync();
            }, 50);  // 50ms delay ensures the state updates before playback
        }
    };
          

    const renderItem = ({ item, index }: { item: Message; index: number }) => (
        <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Image 
                source={item.sender === 'user' ? require("../assets/Images/profile.jpeg") : require("../assets/Images/NewLogo.png")}
                style={styles.avatar}
            />
            <View style={item.sender === 'user' ? styles.userMessageBox : styles.botMessageBox}>
                <Text style={item.sender === 'user' ? styles.userMessageText : styles.botMessageText}>{item.text}</Text>
                {item.sender === 'bot' && (
                    <View style={styles.botIcons}>
                        <TouchableOpacity onPress={() => playPauseAudio(index)}>
                            <MaterialIcons name={playingMessage === index ? "pause" : "volume-up"} size={16} color="gray" />
                        </TouchableOpacity>
                        <TouchableOpacity><MaterialIcons name="thumb-up" size={16} color="gray" /></TouchableOpacity>
                        <TouchableOpacity><MaterialIcons name="thumb-down" size={16} color="gray" /></TouchableOpacity>
                        <TouchableOpacity><MaterialIcons name="share" size={16} color="gray" /></TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
    
    

    return (
        <View style={[styles.chatContainer, { height: chatbotConfig.height || 150, left: chatbotConfig.left || 280 }]}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.messageList}
            />
            <View style={styles.chatBox}>
                <TouchableOpacity onPress={() => Alert.alert("Voice recording started")}> 
                    <MaterialIcons name="mic" size={24} color="black" style={styles.voiceIcon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert("Attach Photo")}> 
                    <Image source={require("../assets/Icons/photo.png")} style={styles.chatIcon}/>
                </TouchableOpacity>
                <TextInput
                    value={userMessage}
                    onChangeText={setUserMessage}
                    style={styles.input}
                    placeholderTextColor={"#aaa"}
                    placeholder="Type your message..."
                    onSubmitEditing={sendMessageToBot} 
                    returnKeyType="send"
                />
                <TouchableOpacity onPress={sendMessageToBot}> 
                    <Image source={require("../assets/Icons/send.png")} style={styles.sendIcon}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        width: "78%",
        // height: 150,
        borderWidth: 3,
        borderColor: "#6495ed",
        backgroundColor: "#fff",
        position: "absolute",
        // left: 280,
        bottom: 10,
        borderRadius: 15,
        padding: 10,
    },
    messageList: {
        flexGrow: 1,
        paddingBottom: 60,  
    },
    chatBox: {
        height: 50,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        paddingHorizontal: 15,
        backgroundColor: "#f8f8f8",
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
    iconContainer: {
        padding: 5,
    },
    icon: {
        height: 24,
        width: 24,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: "flex-start",
        marginBottom: 10,
        gap: 10,
    },
    botMessage: {
        alignSelf: 'flex-start',
    },
    userMessage: {
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
    },
    userMessageBox: {
        maxWidth: '75%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "pink",
    },
    botMessageBox: {
        maxWidth: '75%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#f9f9f9",
    },
    userMessageText: {
        fontSize: 14,
        color: "#000",
    },
    botMessageText: {
        fontSize: 14,
        color: "#333",
    },
    botIcons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 5,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
    },
    voiceIcon: {
        height: 25,
        width: 25,
    },
    chatIcon: {
        height: 20,
        width: 20,
    },
    input: {
        flex: 1,
        height: 40,
        width : "60%",
        fontSize: 16,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        ...Platform.select({
            web: { outlineStyle: 'none' },
        }),
    },
    sendIcon: {
        height: 30,
        width: 30,
    },
});

export default ChatBot;
