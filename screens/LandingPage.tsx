import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  GestureResponderEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Icon } from "react-native-vector-icons/Icon";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const LandingPage = () => {
  //   State for the input message
  const [Message, setMessage] = useState("");
  const menuItems = [
    { name: "Home", icon: require("../assets/Icons/home (1).png") },
    { name: "Dashboard", icon: require("../assets/Icons/dashboard.png") },
    { name: "Doctors", icon: require("../assets/Icons/profile.png") },
    { name: "Messages", icon: require("../assets/Icons/mail.png") },
    { name: "Categories", icon: require("../assets/Icons/category.png") },
    { name: "Folders", icon: require("../assets/Icons/files.png") },
  ];

  const lowermenuItems = [
    { name: "Settings", icon: require("../assets/Icons/gear.png") },
    { name: "Backup", icon: require("../assets/Icons/cloudcheck.png") },
  ];

  //Recording state
  const [isRecording, setIsRecording] = useState(false);

  //Initialize voice

  //Handle Speech-to-Text Results
  const onSpeechResults = (e: any) => {
    if (e.value) {
      setMessage((prevMessage) => `${prevMessage} ${e.value[0]}`);
    }
  };

  //Handle Errors
  const onSpeechError = (e: any) => {
    console.log("Speech Error:", e.error);
    Alert.alert("Error", "An error Occured during speech recognition");
    setIsRecording(false);
  };

  const handleSidebarClick = (menu: any) => {
    Alert.alert(`You clicked on ${menu}`);
  };

  function handleLogin(event: GestureResponderEvent): void {
    throw new Error("Function not implemented.");
  }

  function handleSignup(event: GestureResponderEvent): void {
    throw new Error("Function not implemented.");
  }

  return (
    <ImageBackground
      source={require("../assets/Images/Health-heart.jpeg")}
      style={styles.imageBackground}
      //resizeMode="cover"
    >
      <View
        style={[styles.overlay, { backgroundColor: "rgba(0, 0, 0, 0.7)" }]}
      />
      <LinearGradient colors={[]} style={styles.container}>
        {/* {Header} */}
        <View style={styles.header}>
          <View style={styles.authButtons}>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.authText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignup}>
              <Text style={styles.authText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Center-content */}

        <View style={styles.center}>
          <MaskedView
            style={{ flex: 1 }}
            maskElement={
              <Text style={styles.Upper_text}>
                Inccubated with Harvard Innovation Labs
              </Text>
            }
          >
            <View style={{ flex: 1 }}>
              <LinearGradient
                colors={["#ffb6c1", "#FFFFFF"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          </MaskedView>
          <Text style={styles.Middle_text}>Kokoro.Doctor</Text>

          <MaskedView
            style={{ flex: 1 }}
            maskElement={
              <Text style={styles.Lower_text}>
                Transforming Cardiac Care With AI
              </Text>
            }
          >
            <View style={{ flex: 1 }}>
              <LinearGradient
                colors={["#ffb6c1", "#FFFFFF"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          </MaskedView>
        </View>

        {/* {Dashboard Content} */}
        <View style={styles.content}>
          {/* Sidebar */}
          <Image />

          <View style={styles.sidebar}>
            <View style={styles.title_head}>
              <Image
                source={require("../assets/Icons/heart.png")}
                style={styles.heartImage}
              />
              <Text style={styles.title}>Kokoro.Doctor</Text>
            </View>

            {/* Dynamic Menu Items with Icons */}
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItemContainer}
                onPress={() => Alert.alert(`You clicked on ${item.name}`)}
              >
                <Image source={item.icon} style={styles.menuIcon} />
                <Text style={styles.menuText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.lowersidebar}>
              {lowermenuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItemContainer}
                  onPress={() => Alert.alert(`You clicked on ${item.name}`)}
                >
                  <Image source={item.icon} style={styles.menuIcon} />
                  <Text style={styles.menuText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Chat Section */}
        <View style={styles.chatSection}>
          <View style={styles.chatBox}>
            <View style={styles.Voice}>
              <TouchableOpacity
                onPress={() => Alert.alert("Voice recording started")}
              >
                <MaterialIcons
                  name="mic"
                  size={24}
                  color="black"
                  style={styles.voiceIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.ImageIcon}>
              <TouchableOpacity onPress={() => Alert.alert("Attach Photo")}>
                <Image
                  source={require("../assets/Icons/photo.png")}
                  style={styles.ChatIcon}
                />
              </TouchableOpacity>
            </View>

            {/* Text Input */}
            <View style={styles.inputBox}>
              <TextInput
                placeholder="Type a message..."
                value={Message} //controlled input
                onChangeText={(text) => {
                  setMessage(text);
                }}
                style={styles.Input}
                placeholderTextColor={"#aaa"}
              />
            </View>

            {/* Send Icon */}
            <TouchableOpacity
              onPress={() => {
                if (Message.trim() === "") {
                  Alert.alert("Error", "Message cannot be empty");
                } else {
                  Alert.alert("Message Sent", Message);
                  setMessage(""); // Clear input
                }
              }}
            >
              <Image
                source={require("../assets/Icons/send.png")}
                style={styles.sendIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent:"center",
    //alignItems:"center",
    overflow:"hidden"
  },
  imageBackground: {
    flex: 1,
    width: "100%", // Adding pixel value for width
    height: "100%", // Adding pixel value for height
    opacity: 80, // Opacity for background
    position: "absolute",
    overflow:"hidden"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "",
    color: "#fffff",
    marginLeft: 1300,
    marginRight: 20,
  },
  center: {
    width: 973,
    height: 205,
    left: 550,
    textAlign: "center",
    top: 60,
  },
  Upper_text: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "#ffb6c1",
    bottom: 30,
    //color: "black",
  },
  Middle_text: {
    fontSize: 100,
    fontWeight: 700,
    fontFamily: "Montserrat",
    color: "#f0f8ff",
    bottom: 60,
  },
  Lower_text: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "#ffb6c1",
    textAlign: "right",
    right: 335,
    bottom: 60,
  },
  title: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
    height: 137,
    width: 192,
    left: 8,
    margin: -30,
    padding: 17,
    alignItems: "baseline",
  },
  title_head: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  heartImage: {
    width: 20,
    height: 28,
    left: 1,
    top: -12,
  },
  authButtons: {
    flexDirection: "row",
    gap: 10,
  },
  authText: {
    color: "#FFFFFF",
    marginHorizontal: 10,
    fontSize: 24,
    fontFamily: "Montserrat",
    fontWeight: 900,
  },
  content: {
    flex: 1,
    height: "100%",
    width: 235,
    marginTop: -270,
    //right:50,
    backgroundColor: "#c0c0c0",
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    // backgroundColor: "#FFFFFF",
    marginTop: 10,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  sidebar: {
    width: "auto",
    backgroundColor: "#f8f9fa",
    padding: 20,
    paddingTop: 37,
    height: 800,
  },
  sidebarItem: {
    marginVertical: 10,
    color: "#333",
    fontSize: 16,
    top: 50,
  },
  sidebarItemActive: {
    marginVertical: 10,
    color: "#6200EE",
    fontWeight: "bold",
    fontSize: 16,
  },
  lowersidebar: {
    height: 120,
    width: 110,
    //borderWidth: 1,
    left: 3,
    top: 80,
    textAlign: "left",
  },
  chatSection: {
    height: 80,
    width: "78%",
    borderWidth: 3,
    borderColor: "#6495ed",
    backgroundColor: "#fff",
    position: "absolute",
    left: 280,
    top: 650,
    borderRadius: 15,
  },
  chatBox: {
    height: 50,
    width: "93%",
   // borderWidth: 1,
    left: 40,
    top: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  Voice: {
    height: 25,
    width: 25,
    //borderWidth: 1,
    left: 20,
    //top: 1,
    bottom: 1,
  },
  voiceIcon: {
    height: 20,
    width: 20,
  },
  ImageIcon: {
    height: 25,
    width: 25,
    //borderWidth: 1,
    left: 25,
    padding: 2,
    bottom: 1,
  },
  ChatIcon: {
    height: 20,
    width: 20,
    alignItems: "center",
  },
  inputBox: {
    height: 25,
    width: "80%",
    //borderWidth: 1,
    left: 30,
    bottom: 1,
    padding: 0.4,
  },
  Input: {
    height: 25,
    width: "auto",
    fontSize: 16,
    //borderWidth: 1,
  },
  sendIcon: {
    height: 30,
    width: 30,
    bottom: 2,
    left: 5,
  },
});

export default LandingPage;