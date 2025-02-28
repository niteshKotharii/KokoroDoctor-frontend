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
  Linking,
  Keyboard,
  Platform,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { useChatbot } from "../contexts/ChatbotContext";
import { useFocusEffect } from "@react-navigation/native";
import SideBarNavigation from "../components/SideBarNavigation";

const Doctors = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to toggle dropdown visibility
  const { setChatbotConfig } = useChatbot();
  const phoneNumber = "+918069991061";

  useFocusEffect(
    useCallback(() => {
      // Reset chatbot height when this screen is focused
      setChatbotConfig({ height: "23%"});
    }, [])
  );

  const handleSearch = () => {
    Alert.alert(`Search Results for: ${searchQuery}`);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const profileOptions = ["View Profile", "Edit Profile", "Logout"]; // Dropdown menu options

  const [selectedMethod, setSelectedMethod] = useState("Card");
  const [country, setCountry] = useState("United States");
  const [Message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{
              uri: "https://s3-alpha-sig.figma.com/img/a87a/3ace/8a094e276846c4e13df3a43f65f0d04f?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DxcA~LinUKvodODvPVUZXbxemW5QAUBIh7RMQDc1~VLSV7T0m2E9RlXxSahOpbPhnGXdmGTY97O6DYOtz0CI9NpIwfDlMl-8W8IJJq0ezUFZGscjVaEB3-wEsT8dstoZn8ctXncyzbxJluHOJfF48Fa8ivo8KLX3V4FVKqgChUhXdlJQjmxlfZ17HWol4oJTIx18ggIohcRwt1yp2i9Ocbj~sGMTXj3siSMwhKK7PTy2LDe11UZc1F8JDTbgztNNjFuGK0jCsJv~jPktrFz3g5I-2tsu0XefSBDPfKVS-Jdy0SadGTWcsGBnFW3Ne2xuP8~g4stTHpOD1z9zsMxAAw__",
            }}
            style={styles.imageBackground}
          >
            <View
              style={[
                styles.overlay,
                { backgroundColor: "rgba(16, 16, 16, 0.7)" },
              ]}
            />

            <View style={styles.parent}>
              <View style={styles.Left}>
                <SideBarNavigation navigation={navigation} />
              </View>
              <View style={styles.Right}>

                <View style={styles.center}>
                  <View style={styles.center_textbar}>
                    <Text style={styles.centerText}>Welcome!</Text>
                    <Text style={styles.lowertext}>
                      Here is your sales Medical dashboard
                    </Text>
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
                    <TouchableOpacity
                      onPress={() => Alert.alert("Notification")}
                    >
                      <Image
                        source={require("../assets/Icons/notification1.png")}
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
                        source={require("../assets/Icons/profile1.png")}
                        style={styles.profileIcon}
                      />
                      <MaterialIcons
                        name={
                          dropdownVisible ? "arrow-drop-up" : "arrow-drop-down"
                        }
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

                  <View style={styles.hospitalSection}>
                    <View style={styles.hospitalProfile}>
                      <View style={styles.hospital}>
                        <Image
                          source={require("../assets/Images/dr_kislay.jpg")}
                          style={styles.hospitalImage}
                        />
                        <Text style={styles.hospitalRating}>⭐ 4.5</Text>
                      </View>

                      <View style={styles.hospitalDetails}>
                        <Text style={styles.hospitalName}>Dr. Kislay Shrivastava (MBBS, MD, DND Cardiology AIIMs and Apollo hospital)
                        </Text>
                        <Text style={styles.specialist}>
                          Cardialogy Department
                        </Text>
                        <Text style={styles.workingExperience}>
                          Trust of more than 41 years with 10000+ and 73+
                          hospital network
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.appointmentButton}
                      onPress={handleCallPress}
                    >
                      <Text style={styles.appointmentButtonText}>
                        Book Online Video Chat
                      </Text>
                    </TouchableOpacity>
                  </View>  

                  <View style={styles.paymentSection}>

                    {/* Payment Methods */}
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
                      <View style={styles.inputBox}>
                        <TextInput
                          placeholder="1234-1234-1234-1234"
                          style={styles.input}
                        />
                      </View>
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
                          onValueChange={(value) => setCountry(value)}
                          style={[styles.input, styles.half]}
                        >
                          <Picker.Item
                            label="United States"
                            value="United States"
                          />
                          <Picker.Item label="Canada" value="Canada" />
                          <Picker.Item
                            label="United Kingdom"
                            value="United Kingdom"
                          />
                        </Picker>
                        <TextInput
                          placeholder="Postal code"
                          style={[styles.input, styles.half]}
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.booknowButton}
                        onPress={handleCallPress}
                      >
                        <Text style={styles.booknowButtonText}>
                          Book In-person Appointment
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.boxAds}>
                    <Text style={styles.adsText}>
                      We can put some ads if there are any
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    // borderWidth: 1,
    // borderColor: "#ff0000",
  },
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
  center: {
    marginHorizontal: "2%",
    marginTop: "3%",
    padding: "1.2%",
    // borderWidth: 2,
    // borderRadius: 1,
    alignItems: "center",
    //justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
    height: "12%",
    flexDirection: "row",
    zIndex:10,
  },
  center_textbar: {
    //borderWidth: 1,
    height: "200%",
    width: "40%",
    marginRight: "11.5%",
    marginVertical: "2%",
    flexDirection: "column",
  },
  centerText: {
    fontWeight: 500,
    fontSize: 42,
    fontFamily: "Inter",
    color: "white",
    paddingTop: "1%",
  },
  lowertext: {
    color: "#FFFFFF",
    paddingLeft: "3%",
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
      web: {
        outlineStyle: "none",
        borderWidth: 0,
      },
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
    marginLeft: "3%",
  },
  bellIcon: {
    height: 22,
    width: 22,
  },
  profileContainer: {
    height: "130%",
    width: "10%",
    //borderWidth: 1,
    borderColor: "#fff",
    marginLeft: "6%",
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
    marginTop: 2,
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
    height: "50%",
    width: "80%",
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#d3d3d3",
    marginLeft: "2%",
    overflow: "hidden",
    marginVertical: "3%",
    flexDirection: "row",
    justifyContent:"space-between",
    zIndex:1,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject, // Cover the entire `middlepart`
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black
  },
  hospitalSection:{
    width:"40%",
    height:"100%",
  },
  hospitalProfile: {
    height: "62%",
    width: "100%",
    //borderWidth: 1,
    borderColor: "#fff",
    marginLeft: "1%",
    marginTop: "1%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hospital: {
    height: "100%",
    width: "30%",
    //borderWidth: 1,
    borderColor: "#FFFFFF",
    flexDirection: "column",
  },
  hospitalImage: {
    height: "60%",
    width: "100%",
    borderRadius: 15,
    resizeMode: "cover",
  },
  hospitalRating: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 18,
    fontFamily: "Poppins",
    marginVertical: "4%",
    marginHorizontal: "27%",
  },
  hospitalDetails: {
    height: "100%",
    width: "100%",
    //borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  hospitalName: {
    color: "#fff",
    marginLeft: "36%",
    fontWeight: 300,
    fontSize: 20,
    fontFamily: "Poppins",
    marginVertical: "2%",
    width: "60%",
    marginRight: "65%",
    alignSelf: "center",
  },
  specialist: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 20,
    fontFamily: "Poppins",
    marginLeft: "5%",
    marginVertical: "1%",
  },
  workingExperience: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 20,
    fontFamily: "Poppins",
    marginLeft: "5%",
    marginVertical: "1%",
  },
  appointmentButton: {
    height: "15%",
    width: "60%",
    borderWidth: 1,
    borderColor: "#ff6347",
    backgroundColor: "#FF7072",
    left: "1%",
    borderRadius: 15,
  },
  appointmentButtonText: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 22,
    fontFamily: "Poppins",
    textAlign: "center",
    //position: "relative",
    top: "24%",
  },
  paymentSection: {
    height: "100%",
    width: "35%",
    flexDirection: "column",
    marginTop:10,
  },
  paymentMethods: {
    height: "70%",
    width: "83%",
    //borderWidth: 1,
    borderColor: "#fff",
    paddingTop: "1%",
    // left: 40,
    flexDirection: "row",
    alignSelf:"center",
  },
  paymentOption: {
    height: "20%",
    width: "31%",
    padding: "5%",
    //borderWidth: 2,
    borderColor: "#ccc",
    marginHorizontal: 5,
    backgroundColor: "#fff",
    textAlign: "left",
    borderRadius: 4,
    marginLeft: "1%",
  },
  paymentText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  selectedOption: {
    borderColor: "#007BFF",
  },
  inputContainer: {
    width: "81%",
    padding: 15,
    //backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    marginLeft: "12.5%",
    marginVertical: "-42%",
    //borderWidth: 1,
    borderColor: "#00ffff",
  },
  inputBox: {
    //borderWidth:2,
    // width: "110%",
    marginBottom: "1%",
    right: "5%",
  },
  input: {
    borderColor: "#000000",
    padding: "3%",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#fff",
    width: "auto",
    paddingTop: "2%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "38%",
    //borderWidth: 2,
    right: "6%",
    gap: 8,
    padding: "1.5%",
  },
  half: {
    width: "60%",
    //borderWidth: 2,
    padding: "3%",
  },
  booknowButton: {
    height: "30%",
    width: "80%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ff6347",
    backgroundColor: "#FF7072",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: "5%",
    paddingHorizontal: 5,
  },
  booknowButtonText: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 20,
    fontFamily: "Poppins",
    textAlign: "center",
  },
  boxAds: {
    width: "25%",
    borderWidth: 25,
    borderColor: "#F4B442",
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: "#F4B442",
  },
  adsText: {
    fontWeight: 500,
    fontSize: 25,
    fontFamily: "Poppins",
  },
});

export default Doctors;
