import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  GestureResponderEvent,
  Keyboard,
  Platform,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
//import { blur } from "@react-native-community/blur";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/Navigation"
import { useChatbot } from "../constants/ChatbotContext";
import { useFocusEffect } from "@react-navigation/native";

type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>

const Dashboard = ({ navigation, route }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to toggle dropdown visibility
  const { setChatbotConfig } = useChatbot();

  useFocusEffect(
    useCallback(() => {
      // Reset chatbot height when this screen is focused
      setChatbotConfig({ height: 150, left:240 });
    }, [])
  );

  const handleSearch = () => {
    Alert.alert(`Search Results for: ${searchQuery}`);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const profileOptions = ["View Profile", "Edit Profile", "Logout"]; // Dropdown menu options

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
  const [selectedMethod, setSelectedMethod] = useState("Card");
  const [country, setCountry] = useState("United States");
  const [Message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  //   function handleSearch(event: GestureResponderEvent): void {
  //     throw new Error("Function not implemented.");
  //   }

  //   function setSearchQuery(text: string): void {
  //     throw new Error("Function not implemented.");
  //   }

  const handleSidebarClick = (menu: any) => {
    if(menu==='Home'){
      navigation.navigate("LandingPage");
    }else{
      navigation.navigate(menu);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  return (
    <>
      <ImageBackground
        source={{
          uri: "https://s3-alpha-sig.figma.com/img/a87a/3ace/8a094e276846c4e13df3a43f65f0d04f?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DxcA~LinUKvodODvPVUZXbxemW5QAUBIh7RMQDc1~VLSV7T0m2E9RlXxSahOpbPhnGXdmGTY97O6DYOtz0CI9NpIwfDlMl-8W8IJJq0ezUFZGscjVaEB3-wEsT8dstoZn8ctXncyzbxJluHOJfF48Fa8ivo8KLX3V4FVKqgChUhXdlJQjmxlfZ17HWol4oJTIx18ggIohcRwt1yp2i9Ocbj~sGMTXj3siSMwhKK7PTy2LDe11UZc1F8JDTbgztNNjFuGK0jCsJv~jPktrFz3g5I-2tsu0XefSBDPfKVS-Jdy0SadGTWcsGBnFW3Ne2xuP8~g4stTHpOD1z9zsMxAAw__",
        }}
        style={styles.imageBackground}
      >
        <View
          style={[styles.overlay, { backgroundColor: "rgba(16, 16, 16, 0.7)" }]}
        />
        <View style={styles.sidebar_content}>
          <View style={styles.upper_sidebar}>
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
          </View>
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
        <View style={styles.center}>
          <View style={styles.center_textbar}>
            <View style={styles.upper_text}>
              <Text style={styles.centerText}>Welcome!</Text>
            </View>
            <View style={styles.lower_text}>
              <Text style={styles.lowertext}>
                Here is your sales Medical dashboard
              </Text>
            </View>
          </View>
          <View style={styles.search_bar}>
            <TouchableOpacity onPress={handleSearch}>
              <Image
                source={require("../assets/Icons/search.png")}
                style={styles.chatIcon}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Search your query"
              placeholderTextColor="#aaa"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>
          <View style={styles.notification}>
            <TouchableOpacity onPress={() => Alert.alert("Notification")}>
              <Image
                source={require("../assets/Icons/notification.png")}
                style={styles.bellIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={styles.profileHeader}
              onPress={toggleDropdown}
            >
              <Image
                source={require("../assets/Icons/profiledashboard.png")} // Profile image/icon
                style={styles.profileIcon}
              />
              <MaterialIcons
                name={dropdownVisible ? "arrow-drop-up" : "arrow-drop-down"}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            {/* Dropdown Menu */}
            {dropdownVisible && (
              <View style={styles.dropdownMenu}>
                {profileOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => Alert.alert(option)}
                  >
                    <Text style={styles.dropdownText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={styles.middlepart}>
          {/* <blur style={styles.blurView} blurType="light" blurAmount={10} /> */}
          <View style={styles.doctorProfile}>
            <Image
              source={require("../assets/Icons/dr_kislay.jpg")}
              style={styles.doctorImage}
            />
            <Text style={styles.doctorName}>Dr. Kislay Shrivastava (MBBS, MD, DND Cardiology AIIMS and Apollo hospital)</Text>
            <Text style={styles.specialist}>Cardiologist</Text>
            <Text style={styles.workingExperience}>20+ Years</Text>
            <Text style={styles.doctorRating}>⭐ 4.5</Text>
          </View>

          <TouchableOpacity
            style={styles.appointmentButton}
            onPress={() => Alert.alert("Proceed to Video Call Appointment")}
          >
            <Text style={styles.appointmentButtonText}>
              Book Online Video Chat
            </Text>
          </TouchableOpacity>
          <View style={styles.paymentSection}>
            <View style={styles.paymentMethods}>
              {["Card", "EPS", "Giropay"].map((method) => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.paymentOption,
                    selectedMethod === method && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedMethod(method)}
                >
                  <Text style={styles.paymentText}>{method}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Card Details */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="1234-1234-1234-1234"
                style={styles.input}
              />
              <View style={styles.row}>
                <TextInput
                  placeholder="MM / YY"
                  style={[styles.input, styles.half]}
                />
                <TextInput
                  placeholder="CVC"
                  style={[styles.input, styles.half]}
                />
              </View>
              <View style={styles.row}>
                <Picker
                  selectedValue={country}
                  onValueChange={(value: React.SetStateAction<string>) =>
                    setCountry(value)
                  }
                  style={[styles.input, styles.half]}
                >
                  <Picker.Item label="United States" value="United States" />
                  <Picker.Item label="Canada" value="Canada" />
                  <Picker.Item label="United Kingdom" value="United Kingdom" />
                </Picker>
                <TextInput
                  placeholder="Postal code"
                  style={[styles.input, styles.half]}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.booknowButton}
              onPress={() => Alert.alert("Proceed to Book Appointment")}
            >
              <Text style={styles.booknowButtonText}>Book In-person Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.boxAds}>
          <Text style={styles.adsText}>
            We can put some ads if there are any
          </Text>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    borderWidth: 1,
    opacity: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  sidebar_content: {
    borderWidth: 1,
    position: "absolute",
    height: "100%",
    width: 205,
    backgroundColor: "#dcdcdc",
  },
  upper_sidebar: {
    height: 364,
    width: 134,
    top: 110,
    left: 1,
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  menuText: {
    fontSize: 14,
    color: "#333",
  },
  lowersidebar: {
    height: 101,
    width: 130,
    top: 180,
  },
  center: {
    marginLeft: 240, // Move to the right of the sidebar
    marginTop: 30, // Adjust as per your layout
    padding: 20,
    //borderWidth: 2,
    borderRadius: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "62%",
    height: 80,
    flexDirection: "row",
  },
  center_textbar: {
    //borderWidth: 1,
    height: 74,
    width: "40%",
    right: 105,
    bottom: 3,
  },
  upper_text: {
    //borderWidth: 2,
    borderColor: "yellow",
    width: "auto",
    height: 50,
  },
  centerText: {
    fontWeight: 500,
    fontSize: 42,
    fontFamily: "Inter",
    color: "white",
    top: 6,
  },
  lower_text: {
    //borderWidth: 1,
    width: "82%",
    height: 22,
  },
  lowertext: {
    color: "#FFFFFF",
    left: 10,
    top: 5,
  },
  search_bar: {
    flexDirection: "row",
    height: 40,
    width: 250,
    borderWidth: 1,
    borderColor: "#aaa",
    right: 60,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    alignItems: "flex-end",
    //borderWidth: 1,
    color: "#FFF",
    ...Platform.select({
      web:{
          outlineStyle: 'none',
          borderWidth: 0,
      }
  }),
  },
  chatIcon: {
    width: 20,
    height: 20,
    marginLeft: 0,
  },
  notification: {
    height: 22,
    width: 22,
    //borderWidth:1,
    borderColor: "#fff",
    left: 60,
  },
  bellIcon: {
    height: 22,
    width: 22,
  },
  profileContainer: {
    height: 52,
    width: 100,
    // borderWidth: 1,
    borderColor: "#fff",
    left: 120,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    //backgroundColor: "#333",
    borderRadius: 8,
  },
  profileIcon: {
    width: 40,
    height: 45,
    marginRight: 10,
    bottom: 8,
    //borderWidth:1,
    borderRadius: 20,
  },
  dropdownMenu: {
    marginTop: 5,
    backgroundColor: "#f8f8ff",
    borderRadius: 8,
    padding: 6,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  dropdownItem: {
    paddingVertical: 1,
  },
  dropdownText: {
    color: "#000000",
    fontSize: 14,
  },
  middlepart: {
    position: "relative",
    height: 310,
    width: 1200,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#d3d3d3",
    left: 230,
    top: 80,
    overflow: "hidden",
  },
  blurView: {
    ...StyleSheet.absoluteFillObject, // Cover the entire `middlepart`
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black
  },
  doctorProfile: {
    height: 175,
    width: 450,
    //borderWidth: 1,
    borderColor: "#fff",
    left: 10,
    top: 10,
    flexDirection: "column",
  },
  doctorImage: {
    height: 140,
    width: 160,
    borderRadius: 15,
  },
  doctorName: {
    color: "#fff",
    left: 190,
    fontWeight: 300,
    fontSize: 20,
    fontFamily: "Poppins",
    bottom: 140,
  },
  specialist: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 20,
    fontFamily: "Poppins",
    bottom: 135,
    left: 190,
  },
  workingExperience: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 20,
    fontFamily: "Poppins",
    bottom: 125,
    left: 190,
  },
  doctorRating: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 18,
    fontFamily: "Poppins",
    bottom: 90,
    left: 50,
  },
  appointmentButton: {
    height: 50,
    width: 290,
    borderWidth: 1,
    borderColor: "#ff6347",
    backgroundColor: "#FF7072",
    top: 70,
    left: 10,
    borderRadius: 15,
  },
  appointmentButtonText: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 22,
    fontFamily: "Poppins",
    textAlign: "center",
    position: "relative",
    top: 10,
  },
  paymentSection: {
    height: 240,
    width: 400,
    //borderWidth: 1,
    borderColor: "#fff",
    left: 580,
    bottom: 200,
    flexDirection: "row",
  },
  paymentMethods: {
    height: 200,
    width: 337,
    //borderWidth: 1,
    borderColor: "#fff",
    top: 10,
    left: 40,
    flexDirection: "row",
  },
  paymentOption: {
    height: 45,
    width: 105,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 5,
    backgroundColor: "#fff",
    textAlign: "left",
    left: -4,
  },
  paymentText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  selectedOption: {
    borderColor: "#007BFF",
  },
  inputContainer: {
    width: "90%",
    height: 150,
    padding: 15,
    //backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    right: 308,
    top: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  half: {
    width: "48%",
  },
  booknowButton: {
    height: 50,
    width: "40%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ff6347",
    backgroundColor: "#FF7072",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 220,
    position: "relative",
    right: 560,
  },
  booknowButtonText: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 22,
    fontFamily: "Poppins",
  },
  boxAds: {
    height: 306,
    width: 160,
    left: 1268,
    bottom: 228,
    borderWidth: 2,
    borderColor: "#F4B442",
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: "#F4B442",
  },
  adsText: {
    fontWeight: 500,
    fontSize: 25,
    fontFamily: "Poppins",
    top: 30,
    left: 15,
  },
});

export default Dashboard;