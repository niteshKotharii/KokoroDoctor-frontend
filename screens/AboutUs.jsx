import React, { useState } from "react";
import {
  ImageBackground,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  Alert,
  Pressable,
} from "react-native";
import SideBarNavigation from "../components/SideBarNavigation";
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import LoginSignUp from "../components/LoginSignUp";
import Title from "../components/Title";

const AboutUs = ({ navigation, route }) => {

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
              <View style={styles.header}><LoginSignUp navigation={navigation}/></View>
              <View style={styles.title}><Title/></View>

              <View style={styles.textBox}>
                <Text style={styles.About}>About Us</Text>
                <Text style={styles.text}>
                  Welcome to Metafied’s Kokoro.doctor, your 24/7 heart doctor,
                  providing full cardiac care for your parents anytime, anywhere.
                  Incubated by Harvard Innovation Labs, Kokoro.doctor is dedicated
                  to transforming cardiac care through cutting-edge AI and 3D
                  technologies, ensuring personalized, efficient, and affordable
                  healthcare for all. Our mission is to enhance the quality of
                  cardiac care by integrating AI diagnostics, 3D angiography models,
                  and real-time monitoring, making top-tier heart health solutions
                  accessible to everyone. Acting as a personal heart doctor,
                  Kokoro.doctor is a heart health-focused application designed to
                  support individuals across all demographics. With advanced
                  features such as 3D visualization of angiography reports, it
                  offers a seamless and comprehensive experience for managing heart
                  health. Beyond diagnostics, the app provides valuable insights,
                  guidance, and support to patients, caregivers, and medical
                  professionals, ensuring a holistic approach to cardiac care.
                </Text>
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
  textBox: {
    height: "52%",
    width: "54%",
    // borderWidth: 1,
    borderColor: "#000000",
    alignSelf: "center",
    marginVertical: "2%",
    marginRight: "18%",
  },
  About: {
    fontSize: 34,
    fontWeight: 700,
    alignSelf: "center",
    color: "#FFFFFF",
  },
  text: {
    fontFamily: "Noticia Text",
    fontSize: 19,
    fontWeight: 600,
    textAlign: "center",
    color: "#FFFFFF",
    marginVertical: "3%",
    lineHeight: 23,
  },
});

export default AboutUs;
