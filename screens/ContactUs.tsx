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
  Linking,
} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/Navigation"

type ContactUsprops = NativeStackScreenProps<RootStackParamList, 'ContactUs'>

const ContactUs = ({ navigation, route }: ContactUsprops) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const menuItems = [
    { name: "Home", icon: require("../assets/Icons/home (1).png") },
    { name: "Sr.Doctors", icon: require("../assets/Icons/profile.png") },
    {
      name: "Book Hospital",
      icon: require("../assets/Icons/medicalshield.png"),
    },
    { name: "24/7 Cardiac Support", icon: require("../assets/Icons/mail.png") },
    { name: "About Us", icon: require("../assets/Icons/category.png") },
  ];

  const lowermenuItems = [
    { name: "Settings", icon: require("../assets/Icons/gear.png") },
    { name: "Contact Us", icon: require("../assets/Icons/cloudcheck.png") },
    { name: "Help", icon: require("../assets/Icons/help.png") },
  ];

  function handleLogin(event: GestureResponderEvent): void {
    navigation.navigate("Login");
  }

  function handleSignup(event: GestureResponderEvent): void {
    navigation.navigate("Login");
  }

  const handleSidebarClick = (menu: any) => {
    if (menu === "Home") {
      navigation.navigate("LandingPage");
    } else if(menu === "About Us"){
      navigation.navigate("AboutUs");
    }else{
      console.log(menu);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ImageContainer}>
        <ImageBackground
          source={{
            uri: "https://s3-alpha-sig.figma.com/img/4bdd/4136/41ca97640d221cca9917c6dcaba41477?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=p6yfBSv0eEBikSRS319NPHIH9sTQ1~B6VhrjvdPyyCgMNqebE6q4tVnbpKDjchYXe2YFJNOkWJJ-xdLoUF0umt3HaXuLhUEGrQDE8qCGJm-NjlChCsyRnbNNA2WMVHB9nucX9Q~w5OtqroGsIKgaSAfMH4bRqMGWLn90BmUBDs6fyL43NmcH0GdqhLQfIf3weiQe-82AeeKti9vZg9Y~keJNSXUlX5N9UVx5nPXTIiwTyEFP7CuHFD7-HX7DmvLMuZjiffTNKngXeD~sxEP3l25fqNap3tEHflQsJN62Hvkx7tAhIfDhBLyzm3ep3WG4q-bqG9jPILHCTBhsrZKhPw__",
          }}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View
            style={[
              styles.overlay,
              { backgroundColor: "rgba(15, 15, 15, 0.6)" },
            ]}
          />
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
          {/* Center-Content */}
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
                  start={{ x: 0, y: 0 }}
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
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFillObject}
                />
              </View>
            </MaskedView>
          </View>
          <View style={styles.Contactbox}>
            <Text style={styles.Contact}>Contact Us</Text>
            <Text style={styles.website}>Website:</Text>
            <Text style={styles.contact}>Phone:</Text>
            <View style={styles.socialmedia}>
              <Text style={styles.socialtext}>Social:</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      "https://www.instagram.com/kokoro.doc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==;"
                    )
                  }
                >
                  <Image
                    source={require("../assets/Icons/instagram.png")}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(";")}>
                  <Image
                    source={require("../assets/Icons/twitter.png")}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(";")}>
                  <Image
                    source={require("../assets/Icons/youtube.png")}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.sidebar_content}>
        <View style={styles.top_sidebar}>
          <View style={styles.topimage_sidebar}>
            <Image
              source={require("../assets/Icons/heart.png")}
              style={styles.heartImage}
            />
            <Image
              source={require("../assets/Icons/heartbeat.png")}
              style={styles.heartbeat}
            />
          </View>

          <Text style={styles.title}>Kokoro.Doctor</Text>
        </View>
        <View style={styles.upper_sidebar}>
          {/* Dynamic Menu Items with Icons */}
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItemContainer,
                selectedItem === item.name ? styles.selectedMenuItem : null, // Apply selected style
              ]}
              onPress={() => {
                handleSidebarClick(item.name);
              }}
            >
              <Image source={item.icon} style={styles.menuIcon} />
              <Text
                style={[
                  styles.menuText,
                  selectedItem === item.name ? styles.selectedMenuText : null, // Change text color
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.lowersidebar}>
          {lowermenuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItemContainer,
                selectedItem === item.name ? styles.selectedMenuItem : null, // Apply selected style
              ]}
              onPress={() => {
                setSelectedItem(item.name); // Update state on click
                Alert.alert(`You clicked on ${item.name}`);
              }}
            >
              <Image source={item.icon} style={styles.menuIcon} />
              <Text
                style={[
                  styles.menuText,
                  selectedItem === item.name ? styles.selectedMenuText : null, // Change text color
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    borderWidth: 2,
    borderColor: "#00ffff",
    overflow: "hidden",
    flexDirection: "row",
  },
  ImageContainer: {
    height: "100%",
    width: "87%",
    left: 200,
    // borderWidth: 4,
    // borderColor: "#000000",
  },
  imageBackground: {
    height: "100%",
    width: "auto",
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
    marginLeft: 1100,
    marginRight: 20,
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
  sidebar_content: {
    borderWidth: 1,
    right: 1333,
    height: "100%",
    width: 200,
    backgroundColor: "#dcdcdc",
  },
  top_sidebar: {
    height: 30,
    width: 172,
    left: 13,
    top: 15,
    // borderWidth: 1,
    // borderColor: "#aaa",
    flexDirection: "row",
    gap: 10,
  },
  topimage_sidebar: {
    position: "relative",
  },
  heartImage: {
    height: 25,
    width: 25,
  },
  heartbeat: {
    height: 16,
    width: 20,
    top: 6,
    left: 2,
    position: "absolute",
  },
  title: {
    fontSize: 18,
    color: "#696969",
    fontWeight: "900",
    lineHeight: 20,
    top: 2,
  },
  upper_sidebar: {
    height: 320,
    width: 195,
    top: 100,
    left: 1,
    // borderWidth:1,
    // borderColor:"#aaa"
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  menuIcon: {
    width: 19,
    height: 19,
    marginRight: 10,
  },
  menuText: {
    fontSize: 14,
    color: "#333",
  },
  lowersidebar: {
    height: 165,
    width: 130,
    top: 160,
    // borderWidth:1,
    // borderColor:"#aaa"
  },
  selectedMenuItem: {
    backgroundColor: "#f08080",
  },
  selectedMenuText: {
    color: "#ffffff",
  },
  center: {
    width: 900,
    height: 205,
    textAlign: "center",
    // borderWidth: 1,
    // borderColor: "#000",
    top: 20,
    left: 340,
  },
  Upper_text: {
    //fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "#ffb6c1",
    bottom: 1,
    left:7
    //color: "black",
  },
  Middle_text: {
    fontSize: 90,
    fontWeight: 700,
    //fontFamily: "Montserrat",
    color: "#f0f8ff",
    bottom: 30,
  },
  Lower_text: {
    //fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: 20,
    color: "#ffb6c1",
    textAlign: "right",
    right: 290,
    bottom: 40,
  },
  Contactbox: {
    height: 270,
    width: 850,
    left: 250,
    top: 30,
    borderRadius: 20,
    backgroundColor: "#dcdcdc",
  },
  Contact: {
    //fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 40,
    color: "#000000",
    top: 30,
    left: 40,
  },
  website: {
    color: "#000000",
    //fontFamily: "Montserrat",
    fontSize: 22,
    fontWeight: 600,
    top: 70,
    left: 40,
  },
  contact: {
    color: "#000000",
    //fontFamily: "Montserrat",
    fontSize: 22,
    fontWeight: 600,
    top: 80,
    left: 40,
  },
  socialmedia: {
    height: 30,
    width: 300,
    top: 90,
    left: 40,
    flexDirection: "row",
  },
  socialtext: {
    color: "#000000",
    fontSize: 22,
    fontWeight: 600,
    bottom: 2,
  },
  iconContainer: {
    flexDirection: "row",
    height: 25,
    width: 120,
    left: 5,
    top: 5,
    justifyContent: "space-around",
  },
  socialIcon: {
    height: 20,
    width: 20,
    top: 1,
    backgroundColor: "#c0c0c0",
    borderRadius: 18,
  },
});

export default ContactUs;
