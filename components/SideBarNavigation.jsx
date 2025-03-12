import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

const SideBarNavigation = ({
  navigation,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    { name: "Home", icon: require("../assets/Icons/HomeProfile.png") },
    { name: "Sr.Doctors", icon: require("../assets/Icons/doctorTool.png") },
    {
      name: "Book Hospital",
      icon: require("../assets/Icons/Medical Shield.png"),
    },
    {
      name: "Medilocker",
      icon: require("../assets/Icons/medilockerIcon.png"),
    },

    {
      name: "24/7 Cardiac Support",
      icon: require("../assets/Icons/cardiacHealth.png"),
    },

    { name: "About Us", icon: require("../assets/Icons/CirclesFour.png") },
  ];
  const lowerMenuItems = [
    { name: "Settings", icon: require("../assets/Icons/GearSix.png") },
    { name: "Contact Us", icon: require("../assets/Icons/cloudcheck.png") },
    { name: "Help", icon: require("../assets/Icons/help.png") },
  ];

  const handleSidebarClick = (menu) => {
    if (menu === "Home") {
      navigation.navigate("LandingPage");
    } else if (menu === "About Us") {
      navigation.navigate("AboutUs");
    } else if (menu === "Sr.Doctors") {
      navigation.navigate("Doctors");
    } else if (menu === "Book Hospital") {
      navigation.navigate("Hospitals");
    } else if (menu === "24/7 Cardiac Support") {
      navigation.navigate("Second");
    } else if (menu === "Contact Us") {
      navigation.navigate("ContactUs");
    } else {
      navigation.navigate(menu);
    }
    // setSelectedItem(menu);
    // onItemPress(menu);
  };

  return (
    <View style={styles.sidebar_content}>
      <View style={styles.top_sidebar}>
        <View style={styles.topimage_sidebar}>
          <Image
            source={require("../assets/Images/KokoroLogo.png")}
            style={styles.heartImage}
          />
        </View>

        <Text style={styles.title}>Kokoro.Doctor</Text>
      </View>
      <View style={styles.upper_sidebar}>
        {/* Dynamic Menu Items with Icons */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            style={[
              styles.menuItemContainer,
              selectedItem === item.name ? styles.selectedMenuItem : null, // Apply selected style
              { borderWidth: 0 },
              ,
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
      <View style={styles.lower_sidebar}>
        {lowerMenuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            style={[
              styles.menuItemContainer,
              selectedItem === item.name ? styles.selectedMenuItem : null, // Apply selected style
              { borderWidth: 0 },
              ,
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
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar_content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f5f5f5",
    flexDirection: "column",
    paddingVertical: 20,
  },
  top_sidebar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    marginBottom: 20,
  },
  topimage_sidebar: {
    height: "90%",
    width: "15%",
    marginVertical: "1%",
    //borderWidth: 1,
    flexDirection: "row",
  },
  heartImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    width:"85%",
    fontSize: 18,
    color: "rgba(0, 0, 0, 0.46)",
    fontWeight: "bold",
    marginLeft: 10,
  },
  upper_sidebar: {
    flex: 1,
    justifyContent: "center",
  },
  lower_sidebar: {
    paddingBottom: 20,
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: "contain",
  },
  menuText: {
    width:"85%",
    fontSize: 16,
    color: "#333",
  },
  selectedMenuItem: {
    backgroundColor: "#ff6347",
  },
  selectedMenuText: {
    color: "#ffffff",
  },
});


export default SideBarNavigation;
