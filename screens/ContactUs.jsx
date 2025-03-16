import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";
import SideBarNavigation from "../components/SideBarNavigation";
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import Header from "../components/Header";
import Title from "../components/Title";

const ContactUs = ({ navigation, route }) => {

  return (
    <View style={styles.container}>
      <SideBarNavigation navigation={navigation} />

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
              <View style={styles.Contactbox}>
                <Text style={styles.Contact}>Contact Us</Text>

                {/* Clickable Website */}
                <TouchableOpacity onPress={() => Linking.openURL("")}>
                  <Text style={styles.website}>
                    Website: <Text style={styles.linkText}>Kokoro.Doctor</Text>
                  </Text>
                </TouchableOpacity>

                {/* Clickable Phone Number (Optional, if needed) */}
                <TouchableOpacity onPress={() => Linking.openURL("")}>
                  <Text style={styles.contact}>
                    Phone: <Text style={styles.linkText}>7060334160</Text>
                  </Text>
                </TouchableOpacity>

                {/* Social Media Section */}
                <View style={styles.socialmedia}>
                  <Text style={styles.socialtext}>Social:</Text>
                  <View style={styles.iconContainer}>
                    <View style={styles.socialIconBox}>
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            "https://www.linkedin.com/company/metafiedkokoro"
                          )
                        }
                      >
                        <Image
                          source={require("../assets/Icons/LinkedIn.png")}
                          style={styles.socialIcon}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.socialIconBox}>
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            "https://www.instagram.com/kokoro.doc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                          )
                        }
                      >
                        <Image
                          source={require("../assets/Icons/instagram.png")}
                          style={styles.socialIcon}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.socialIconBox}>
                      <TouchableOpacity onPress={() => Linking.openURL("/")}>
                        <Image
                          source={require("../assets/Icons/twitter.png")}
                          style={styles.socialIcon}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.socialIconBox}>
                      <TouchableOpacity onPress={() => Linking.openURL("/")}>
                        <Image
                          source={require("../assets/Icons/youtube.png")}
                          style={styles.socialIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Clickable Email */}
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL("mailto:business.support@kokoro.doctor")
                  }
                >
                  <Text style={styles.Email}>
                    Email:{" "}
                    <Text style={styles.linkText}>
                      business.support@kokoro.doctor
                    </Text>
                  </Text>
                </TouchableOpacity>
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
  Contactbox: {
    height: "37%",
    width: "68%",
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
    marginVertical: "5%",
    marginRight:"18%",
  },
  Contact: {
    fontWeight: 600,
    fontSize: 35,
    color: "rgba(19, 19, 19, 0.8)",
    marginHorizontal: "4%",
    marginVertical: "2%",
  },
  website: {
    color: "#000000",
    fontSize: 19,
    fontWeight: 600,
    marginHorizontal: "5%",
    marginVertical: "0.5%",
  },
  contact: {
    color: "#000000",
    fontSize: 19,
    fontWeight: 600,
    marginHorizontal: "5%",
    marginVertical: "0.5%",
  },
  socialmedia: {
    height: 30,
    width: 300,
    flexDirection: "row",
    marginHorizontal: "5%",
    marginVertical: "0.5%",
  },
  Email: {
    color: "#000000",
    fontSize: 19,
    fontWeight: 600,
    marginHorizontal: "5%",
    marginVertical: "0%",
  },
  socialtext: {
    color: "#000000",
    fontSize: 19,
    fontWeight: 600,
    bottom: 2,
  },
  iconContainer: {
    flexDirection: "row",
    height: "68%",
    width: "40%",
    marginHorizontal: "3%",
    marginVertical: "1%",
    justifyContent: "space-around",
    //borderWidth: 1,
  },
  socialIconBox: {
    height: "100%",
    width: "17%",
    //borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "rgba(174, 173, 173, 0.4)",
  },
  socialIcon: {
    height: 12,
    width: 12,
    marginVertical: "20%",
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
  },
  linkText: {
    fontSize: 18,
    fontWeight: 400,
  },
});

export default ContactUs;
