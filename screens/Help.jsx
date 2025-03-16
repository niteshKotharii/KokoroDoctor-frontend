import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import SideBarNavigation from "../components/SideBarNavigation";
import Header from "../components/Header";
import Title from "../components/Title";

const Help = ({ navigation, route }) => {

  return (
    <View style={styles.container}>
      <SideBarNavigation
        navigation={navigation}
      />

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
              <View style={styles.header}><Header navigation={navigation}/></View>
              <View style={styles.title}><Title/></View>

              <View style={styles.imageBox}>
                <Image
                    source={require("../assets/Images/coming_soon.png")}
                    style={styles.comingSoon}
                />
              </View>
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
    //borderWidth: 3,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  imageContainer: {
    //borderWidth: 2,
    borderColor: "#00ffff",
    height: "100%",
    width: "100%",
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
    //borderWidth: 1,
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
  imageBox: {
    height: "52%",
    width: "54%",
    // borderWidth: 10,
    // borderColor: "#000000",
    alignSelf: "center",
    marginRight: "18%",
  },
  comingSoon: {
    height: "100%",
    width: "100%",
    //borderWidth: 1,
    resizeMode: "contain",
  },
});

export default Help;
