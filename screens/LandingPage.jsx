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
  useWindowDimensions,
} from "react-native";
import SideBarNavigation from "../components/SideBarNavigation";
import { useChatbot } from "../contexts/ChatbotContext";
import { useFocusEffect } from "@react-navigation/native";
import LoginSignUp from "../components/LoginSignUp";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";

const LandingPage = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const { setChatbotConfig, isChatExpanded, setIsChatExpanded } = useChatbot();
  const [selectedButton, setSelectedButton] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setChatbotConfig({ height: "57%" });
    }, [])
  );

  return (
    <>
      {(Platform.OS==='web' && width > 1000) && (
        <View style={styles.webContainer}>
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
                      <TouchableOpacity style={styles.cardStyle} onPress={() => (navigation.navigate("Doctors"))}>
                        <Image
                          source={require("../assets/Images/Consultation.png")}
                          style={styles.image}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.cardStyle} onPress={() => (navigation.navigate("Medilocker"))}>
                        <Image
                          source={require("../assets/Images/Medilocker.png")}
                          style={styles.image}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.cardStyle} onPress={() => (navigation.navigate("Hospitals"))}>
                        <Image
                          source={require("../assets/Images/BookHospital.png")}
                          style={styles.image}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.cardStyle} onPress={() => (navigation.navigate("Second"))}>
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
      )}

      {(Platform.OS!=='web' || width < 1000 ) && (
        <View style={styles.appContainer}>

            <View style={styles.header}>
              <LoginSignUp navigation={navigation}/>
            </View>

            <View style={styles.searchBar}>
              <SearchBar/>
            </View>

            <View style={styles.cards}>

              <View style={styles.cardsRow}>
                <TouchableOpacity style={styles.cardStyle} onPress={() => (navigation.navigate("Doctors"))}>
                  <Image
                    source={require("../assets/Images/Consultation.png")}
                    style={styles.image}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardStyle} onPress={() => (navigation.navigate("Medilocker"))}>
                  <Image
                    source={require("../assets/Images/Medilocker.png")}
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.cardsRow}>
                <TouchableOpacity style={styles.cardStyle} onPress={() => (navigation.navigate("Hospitals"))}>
                  <Image
                    source={require("../assets/Images/BookHospital.png")}
                    style={styles.image}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardStyle} onPress={() => (navigation.navigate("Second"))}>
                  <Image
                    source={require("../assets/Images/twenty-four_Support.png")}
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>

            </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  appContainer:{
    flex: 1,
    height: "100%",
    width: "100%",
    // backgroundColor: "pink",
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
    ...Platform.select({
      web:{
        width:"12%",
        marginLeft: "70%",
        marginTop: 15,
      }
    })
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
  cardStyle: {
    height: "100%",
    width: "45%",
    ...Platform.select({
      web: {
        width: "23%",
        borderColor: "#FFFFFF",
      }
    })
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 17,
    resizeMode: "contain",
  },
  searchBar:{
    
  },
  cards:{
    height: "60%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  cardsRow:{
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: "40%",
  },
});

export default LandingPage;
