import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Speech from "expo-speech";
import { AuthContext } from "../contexts/AuthContext";

const BASE_URL = "MY_URL";

const MobileChatbot = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "bot",
      text: "Hello, How may I help you today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [userId, setUserId] = useState("dummy_user@gmail.com");
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [playingMessage, setPlayingMessage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { user, setUser } = useContext(AuthContext);

  // Set userID
  useEffect(() => {
    if (user) {
      setUserId(user?.email);
    }
  }, [user]);

  // Stop speaking when user refreshes the page
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const sendMessageToBot = async () => {
    if (!userMessage.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setUserMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          userId: "dummy_user@gmail.com",
        }),
      });
      const data = await response.json();
      const botMessage = {
        id: Date.now().toString(),
        sender: "bot",
        text: data.response || "Sorry, I couldn’t process that.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "An error occurred.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getChatHistory = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/chat/history/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const botReply = await response.json();

      // console.log(botReply);
    } catch (error) {
      console.error("Error communicating with Bot:", error);
    }
  };

  const toggleTTS = (index, text) => {
    if (playingMessage === index) {
      Speech.stop();
      setPlayingMessage(null);
    } else {
      Speech.speak(text, {
        language: selectedLanguage,
        onDone: () => setPlayingMessage(null),
        onStopped: () => setPlayingMessage(null),
      });
      setPlayingMessage(index);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.messageBubble, item.sender === "bot" ? styles.botMessage : styles.userMessage,]}>
  
      <Image 
        source={item.sender === 'user' ? require("../assets/Images/user-icon.jpg") : require("../assets/Images/NewLogo.png")}
        style={styles.avatar}
      />
      
      <View style={item.sender === 'user' ? styles.userMessageBox : styles.botMessageBox}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        {item.sender === "bot" && !isLoading && (
          <View style={styles.botIcons}>
            <TouchableOpacity onPress={() => toggleTTS(index, item.text)}>
              <MaterialIcons
                name={playingMessage === index ? "pause" : "volume-up"}
                size={16}
                color="gray"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="thumb-up" size={16} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="thumb-down" size={16} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="share" size={16} color="gray" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ask anything</Text>
      </View>
      <FlatList
        data={
          isLoading
            ? [...messages, { id: "loading", sender: "bot", text: "..." }]
            : messages
        }
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <View style={styles.inputIcons}>
          <TouchableOpacity>
            <MaterialIcons name="mic" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="camera-alt" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <TextInput
          value={userMessage}
          onChangeText={setUserMessage}
          style={styles.input}
          placeholder="Type message"
          placeholderTextColor="#aaa"
          multiline
          onSubmitEditing={sendMessageToBot}
          enterKeyHint="send"
        />
        <TouchableOpacity onPress={sendMessageToBot}>
          <MaterialIcons
            name="send"
            size={24}
            color="#333"
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 25,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: "auto",
  },
  messageList: {
    padding: 10,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  messageBubble: {
    marginVertical: 5,
    maxWidth: "80%",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  botMessage: {
    // Align bot messages to the left
  },
  userMessage: {
    flexDirection: 'row-reverse',
    alignSelf: "flex-end",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
  },
  userMessageBox: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: "pink",
  },
  botMessageBox: {
      maxWidth: '80%',
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: "#f9f9f9",
  },
  messageContent: {
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 5,
  },
  botIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderWidth: 2,
    borderColor: "#577CEF",
    borderRadius: 5,
  },
  inputIcons: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    minHeight: 40,
    maxHeight: 100,
    ...Platform.select({
      web:{
          outlineStyle: 'none',
          borderWidth: 0,
      }
    })
  },
  sendIcon: {
    borderRadius: 12,
    padding: 5,
  },
});

export default MobileChatbot;
