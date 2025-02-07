import React, { useCallback, useState } from "react";
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
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/Navigation"
import { useChatbot } from "../constants/ChatbotContext";
import { useFocusEffect } from "@react-navigation/native";

type LandingPageProps = NativeStackScreenProps<RootStackParamList, 'LandingPage'>

const LandingPage = ({ navigation, route }: LandingPageProps) => {
  const { setChatbotConfig } = useChatbot();

  useFocusEffect(
    useCallback(() => {
      setChatbotConfig({ height: 400 });
    }, [])
  );
  const [Message, setMessage] = useState("");
  const menuItems = [
    { name: "Home", icon: require("../assets/Icons/home (1).png") },
    { name: "Sr. Doctors", icon: require("../assets/Icons/profile.png") },
    { name: "24x7 Cardiac Support", icon: require("../assets/Icons/mail.png") }, 
    { name: "Book Hospital", icon: require("../assets/Icons/dashboard.png") },
    { name: "About Us", icon: require("../assets/Icons/category.png") },
  ];

  const lowermenuItems = [
    // { name: "Settings", icon: require("../assets/Icons/gear.png") },
    { name: "Contact Us", icon: require("../assets/Icons/cloudcheck.png") },
    // { name: "Help", icon: require("../assets/Icons/help.png") },
  ];

  const handleSidebarClick = (menu: any) => {
    if(menu==='Home'){
      navigation.navigate("LandingPage");
    }else if(menu==='About Us'){
      navigation.navigate("AboutUs");
    }else if(menu==='Sr. Doctors'){
      navigation.navigate("Dashboard");
    }else if(menu==='Book Hospital'){
      navigation.navigate("Dashboard");
    }
    else if(menu==='24x7 Cardiac Support'){
      navigation.navigate("Second");
    }
    else{
      navigation.navigate(menu);
    }
  };

  const handleLowerSidebarClick = (menu: any) => {
    if(menu==='Contact Us'){
      navigation.navigate("ContactUs");
    }else{
      navigation.navigate(menu);
    }
  }

  function handleLogin(event: GestureResponderEvent): void {
    navigation.navigate("Login");
  }

  function handleSignup(event: GestureResponderEvent): void {
    navigation.navigate("Login");
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
                Harvard Innovation Lab's I-Member presents
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
                onPress={() => handleSidebarClick(item.name)}
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
                  onPress={() => handleLowerSidebarClick(item.name)}
                >
                  <Image source={item.icon} style={styles.menuIcon} />
                  <Text style={styles.menuText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
    width: "100%",
    height: "100%",
    opacity: 80,
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
    width: 150,
    //borderWidth: 1,
    left: 3,
    top: 20,
    textAlign: "left",
  },
});

export default LandingPage;