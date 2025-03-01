import React, { useState, useCallback } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  Text,
  GestureResponderEvent,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import SideBarNavigation from "../components/SideBarNavigation";
import { useChatbot } from "../contexts/ChatbotContext";
import { useFocusEffect } from "@react-navigation/native";
import LoginSignUp from "../components/LoginSignUp";
import Title from "../components/Title";

const { width, height } = Dimensions.get("window"); // Get screen dimensions

const LandingPage = ({ navigation, route }) => {
  const { setChatbotConfig, isChatExpanded, setIsChatExpanded } = useChatbot();
  const [selectedButton, setSelectedButton] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setChatbotConfig({ height: "57%" });
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{
            uri: "https://familypracticecenterpc.com/wp-content/uploads/2019/09/ask-the-doctors-about-heart-health.jpg",
          }}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View
            style={[styles.overlay, { backgroundColor: "rgba(0, 0, 0, 0.6)" }]}
          />
          <View style={styles.parent}>
            <View style={styles.Left}>
              <SideBarNavigation navigation={navigation} />
            </View>
            <View style={styles.Right}>
              <View style={styles.header}><LoginSignUp navigation={navigation}/></View>
              <View style={styles.title}><Title/></View>
              {/* Center Middle */}
              {!isChatExpanded && (
                <View style={styles.centerMiddlePart}>
                <TouchableOpacity style={styles.Consultation} onPress={() => (navigation.navigate("Doctors"))}>
                  <Image
                    source={require("../assets/Images/Consultation.png")}
                    style={styles.image}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.Upload} onPress={() => (navigation.navigate("Medilocker"))}>
                  <Image
                    source={require("../assets/Images/Medilocker.png")}
                    style={styles.image}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.BookHospital} onPress={() => (navigation.navigate("Hospitals"))}>
                  <Image
                    source={require("../assets/Images/BookHospital.png")}
                    style={styles.image}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.HeartHealth} onPress={() => (navigation.navigate("Second"))}>
                  <Image
                      source={require("../assets/Images/twenty-four_Support.png")}
                      style={styles.image}
                    />
                </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  imageContainer: {
    borderColor: "#00ffff",
    height: "100%",
    width: "100%",
  },

  imageBackground: {
    width: "100%",
    height: "100%",
    //transform:[{scale:0.8}],
    opacity: 80,
    //marginVertical:"-5%"
    alignSelf: "center",
    flexDirection: "column",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  parent: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  Left: {
    height: "100%",
    width: "15%",
    //borderWidth: 1,
  },
  Right: {
    height: "100%",
    width: "100%",
  },
  header: {
    width:"12%",
    marginLeft: "70%",
    marginTop: 15,
    // borderColor: "#FFFFFF",
    // borderWidth: 1,
  },
  title: {
    // borderColor: "#FFFFFF",
    // borderWidth: 1,
    marginRight: "18%",
    alignSelf: "center",
  },
  centerMiddlePart: {
    height: "25%",
    width: "47%",
    marginHorizontal: "18%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Upload: {
    height: "100%",
    width: "23%",
    borderColor: "#FFFFFF",
  },
  Consultation: {
    height: "100%",
    width: "23%",
    borderColor: "#FFFFFF",
  },
  BookHospital: {
    height: "100%",
    width: "23%",
    borderColor: "#FFFFFF",
  },
  HeartHealth: {
    height: "100%",
    width: "23%",
    borderColor: "#FFFFFF",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 17,
    resizeMode: "contain",
  },
  CardiacBox: {
    height: "18%",
    width: "23%",
    // borderWidth: 1,
    borderColor: "#FFFFFF",
    marginHorizontal: "13%",
    marginVertical: "25%",
  },
  cardiacImage: {
    height: "100%",
    width: "100%",
  },
  cardiacTextBox: {
    height: "23%",
    width: "81%",
    // borderWidth: 1,
    borderColor: "#FFFFFF",
    marginLeft: "10%",
    marginVertical: "4%",
  },
  UpperText: {
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFFFF",
    // alignSelf: "center",
  },
  BottomText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 700,
  },
});

export default LandingPage;
