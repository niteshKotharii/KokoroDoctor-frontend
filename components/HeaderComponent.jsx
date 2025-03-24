import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HeaderComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Alex!</Text>
        <Text style={styles.subText}>
          Here is your sales Medical dashboard
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image
          source={require("../assets/Icons/search.png")}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your query"
          placeholderTextColor="rgba(255, 255, 255, 1)"
        />
      </View>

      {/* Notification and Profile Section */}
      <View style={styles.iconsContainer}>
      
        <Image
          source={require("../assets/Icons/notification1.png")}
          style={styles.notificationIcon}
          resizeMode="contain"
        />
        
      </View>
      
      {/* Profile Dropdown */}
      <View style={styles.profileWrapper}>
        <TouchableOpacity
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          style={styles.profileContainer}
        >
          <Image
            source={require("../assets/Icons/profile1.png")}
            style={styles.profileIcon}
            resizeMode="contain"
          />
          <Icon
            name={isDropdownOpen ? "caret-up" : "caret-down"}
            size={14}
            color="white"
            style={styles.caretIcon}
          />
        </TouchableOpacity>

        {/* Dropdown Content */}
        {isDropdownOpen && (
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: "10%",
    width: "70%",
    borderColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "3%",
    marginHorizontal: "5%",
  },
  welcomeContainer: {},
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    fontSize: 14,
    color: "#ddd",
    marginTop: "1%",
  },
  searchContainer: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: "50%",  // Use fixed height
    width: "30%",
    marginHorizontal: "10%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.66)",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Light background for visibility
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1, // Makes input fill available space
    color: "#fff",
    fontSize: 16,
    borderWidth: 0,  // Prevent extra border from appearing
    backgroundColor: "transparent", // Ensures no extra background
    paddingVertical: 0, // Prevents extra height
    outlineStyle: "none", // Prevents blue outline on Web
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    marginRight: 20,
  },
  profileWrapper: {
    height: "60%",
    width: "10%",
    borderColor: "#fff",
    alignSelf: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 8,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  caretIcon: {
    marginLeft: 1,
  },
  dropdownContainer: {
    width: "100%",
    alignItems: "center",
  },
  dropdownMenu: {
    marginBottom: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    paddingVertical: "2%",
    width: "100%",
    marginLeft: "100%",
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
});

export default HeaderComponent;