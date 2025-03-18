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
import { useChatbot } from "../../contexts/ChatbotContext";
import { useFocusEffect } from "@react-navigation/native";
import SideBarNavigation from "../../components/SideBarNavigation";

// Keep the existing GetLocationPolyfill
const GetLocationPolyfill = {
  getCurrentPosition: (options) => {
    // For web, use the browser's Geolocation API
    if (Platform.OS === "web") {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                altitude: position.coords.altitude || 0,
                accuracy: position.coords.accuracy,
                speed: position.coords.speed || 0,
                time: position.timestamp,
              });
            },
            (error) => {
              reject({
                code: error.code,
                message: error.message,
              });
            },
            options
          );
        } else {
          reject({
            code: "UNAVAILABLE",
            message: "Geolocation not available on this browser",
          });
        }
      });
    } else {
      // For native platforms, we would import the actual module
      // This will never run in web bundling
      console.warn("Native GetLocation used in non-native environment");
      return Promise.reject({
        code: "PLATFORM_NOT_SUPPORTED",
        message: "Platform not supported",
      });
    }
  },
};

// Keep the helper function for location error
const isLocationError = (error) => {
  return (
    error && typeof error.code === "string" && typeof error.message === "string"
  );
};

const DoctorsPaymentScreen = ({ navigation, route}) => {
  //Example of how to take data from route params
  // const {doctorName, doctorCredentials, clinicName, date, timeSlot, fee}  = route.params; //The data is passed using route props
  const [searchQuery, setSearchQuery] = useState("");
  const [patientName, setPatientName] = useState("");
  const { setChatbotConfig } = useChatbot();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Reset chatbot height when this screen is focused
      setChatbotConfig({ height: "32%" });
    }, [])
  );

  const handleSearch = () => {
    Alert.alert(`Search Results for: ${searchQuery}`);
  };

  const handleContinuePayment = () => {
    Alert.alert("Processing Payment", "Redirecting to payment gateway...");
  };

  // Doctor data for the verified cardiologists
  const doctors = [
    { id: 1, image: require("../../assets/Images/dr_kislay.jpg") },
    { id: 2, image: require("../../assets/Images/Dr_Ritesh_Singh.jpg") },
    { id: 3, image: require("../../assets/Images/Dr_Sandip_Rungta.jpg") },
    { id: 4, image: require("../../assets/Images/Dr_Vinesh_Jain.jpg") },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require("../../assets/Images/MedicineBackground.png")}
          style={styles.imageBackground}
        >
          <View
            style={[
              styles.overlay,
              { backgroundColor: "rgba(16, 16, 16, 0.3)" },
            ]}
          />

          <View style={styles.parent}>
            {/* Sidebar navigation */}
            <View style={styles.Left}>
              <SideBarNavigation navigation={navigation} />
            </View>

            <View style={styles.Right}>
              {/* Header section */}
              <View style={styles.header}>
                <View style={styles.welcomeSection}>
                  <Text style={styles.welcomeText}>Welcome Alex!</Text>
                  <Text style={styles.welcomeSubtext}>
                    Here is your sales Medical dashboard
                  </Text>
                </View>

                {/* Search bar */}
                <View style={styles.searchBarContainer}>
                  <MaterialIcons
                    name="search"
                    size={20}
                    color="#888"
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search your query"
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>

                {/* User profile and notification icons */}
                <View style={styles.userControls}>
                  <TouchableOpacity style={styles.notificationIcon}>
                    <MaterialIcons
                      name="notifications"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.profileButton}>
                    <Image
                      source={require("../../assets/Images/dr_kislay.jpg")}
                      style={styles.profileImage}
                    />
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Main content area */}
              <View style={styles.contentContainer}>
                {/* Payment confirmation card */}
                <View style={styles.paymentCard}>
                  <View style={styles.paymentHeader}>
                    <TouchableOpacity style={styles.backButton} 
                      onPress={() => navigation.goBack()}
                    >
                      <MaterialIcons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.paymentTitle}>Confirm and Pay</Text>
                  </View>

                  <View style={styles.doctorSection}>
                    <Text style={styles.sectionLabel}>
                      Verified cardiologist online now
                    </Text>
                    <View style={styles.doctorAvatars}>
                      {doctors.map((doctor) => (
                        <View key={doctor.id} style={styles.doctorAvatar}>
                          <Image
                            source={doctor.image}
                            style={styles.doctorAvatarImage}
                          />
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.formSection}>
                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Patients name</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="Enter your patients name"
                        placeholderTextColor="#aaa"
                        value={patientName}
                        onChangeText={setPatientName}
                      />
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Final Fee</Text>
                      <Text style={styles.feeAmount}>$499</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.paymentButton}
                    onPress={handleContinuePayment}
                  >
                    <Text style={styles.paymentButtonText}>
                      Continue to payment
                    </Text>
                  </TouchableOpacity>
                </View>
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
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: "100%",
    width: "100%",
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
    backgroundColor: "#f5f5f5",
  },
  Right: {
    height: "100%",
    width: "85%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "transparent",
  },
  welcomeSection: {
    flexDirection: "column",
    flex: 1,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  welcomeSubtext: {
    fontSize: 14,
    color: "#f0f0f0",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    width: "40%",
    marginHorizontal: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#333",
    fontSize: 14,
    ...Platform.select({
      web: {
        outlineStyle: "none",
        borderWidth: 0,
      },
    }),
  },
  userControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    marginRight: 16,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(138, 112, 255, 0.8)",
    paddingVertical: 20,
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "10%",
  },
  paymentCard: {
    width: "60%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  doctorSection: {
    marginBottom: "2%",
  },
  sectionLabel: {
    fontSize: 14,
    color: "#000",
    marginBottom: 10,
  },
  doctorAvatars: {
    flexDirection: "row",
  },
  doctorAvatar: {
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#ff7072",
    overflow: "hidden",
  },
  doctorAvatarImage: {
    width: 50,
    height: 50,
  },
  formSection: {
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 14,
  },
  feeAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  paymentButton: {
    backgroundColor: "#ff7072",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default DoctorsPaymentScreen;
