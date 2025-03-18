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
import Header from "../../components/Header";

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

const DoctorsInfoWithRating = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setChatbotConfig } = useChatbot();
  const phoneNumber = "+918069991061";
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  useFocusEffect(
    useCallback(() => {
      // Reset chatbot height when this screen is focused
      setChatbotConfig({ height: "32%" });
    }, [])
  );

  const handleSearch = () => {
    Alert.alert(`Search Results for: ${searchQuery}`);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const requestLocation = () => {
    setLoading(true);
    setLocation(null);
    setError(null);

    GetLocationPolyfill.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
    })
      .then((newLocation) => {
        setLoading(false);
        setLocation(newLocation);
        Alert.alert(
          "Location detected",
          `Lat: ${newLocation.latitude.toFixed(
            4
          )}, Lng: ${newLocation.longitude.toFixed(4)}`
        );
      })
      .catch((ex) => {
        if (isLocationError(ex)) {
          const { code, message } = ex;
          console.warn(code, message);
          setError(code);
          Alert.alert("Location Error", `Could not get location: ${message}`);
        } else {
          console.warn(ex);
          Alert.alert(
            "Error",
            "An unknown error occurred while getting location"
          );
        }
        setLoading(false);
        setLocation(null);
      });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTimeSlot(time);
  };

  // Function to handle redirection for booking
  const handleBooking = (timeSlot, doctorData, clinicData) => {
    setSelectedTimeSlot(timeSlot);
    // Navigate to a payment page passing the data through the route params
    navigation.navigate("DoctorsPaymentScreen"
      //EXAMPLE OF HOW TO PASS DATA AS A ROUTE PARAM
      // , {
      // doctorName: doctorData.name,
      // doctorCredentials: doctorData.credentials,
      // clinicName: clinicData.name,
      // date: selectedDate,
      // timeSlot: timeSlot,
      // fee: clinicData.fee,
    // }
  );
  };

  const doctorData = {
    name: "Dr Kislay Shrivasatva",
    credentials: "MD,MS",
    experience: "22 Years Experience",
    rating: 4.5,
    profileImage: require("../../assets/Images/dr_kislay.jpg"),
    bio: "Dr Kislay Shrivasatva, MD (Cardiology), is a seasoned cardiologist with over 22 years of experience in treating heart conditions. Based in Bhopal, he specializes in coronary artery diseases, hypertension, heart failure, arrhythmias, and preventive cardiology. Dr Shrivasatva is skilled in interventional procedures such as angioplasty, CABG, valve repairs, and angiographies. After completing his MBBS and MD in Cardiology from top medical institutions, he developed expertise in both surgical and non-surgical heart care. Known for his comprehensive approach, he emphasizes heart disease detection, prevention, and lifestyle modifications. He is an active member of leading cardiology associations.",
    reviews: [
      { id: 1, rating: 5, text: "Very good Doctor", reviewer: "Mr Donald" },
      { id: 2, rating: 5, text: "Very good Doctor", reviewer: "Mr Donald" },
      { id: 3, rating: 5, text: "Very good Doctor", reviewer: "Mr Donald" },
    ],
  };

  const clinicData = {
    name: "Wisdom Clinics",
    fee: "$499 fee",
    waitTime: "Max 15 min wait",
    layout: "Hsr Layout",
  };

  const availableDates = [
    { id: "today", label: "Today", slotsAvailable: 0 },
    { id: "tomorrow", label: "Tomorrow", slotsAvailable: 2 },
    { id: "dayAfter", label: "Mon, 2 feb", slotsAvailable: 2 },
  ];

  const timeSlots = {
    morning: { label: "Morning (1 slot)", slots: ["10:30 AM"] },
    afternoon: { label: "Afternoon (1 slot)", slots: ["12:30 PM"] },
  };

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
            {/* Keeping the existing sidebar navigation as requested */}
            <View style={styles.Left}>
              <SideBarNavigation navigation={navigation} />
            </View>

            <View style={styles.Right}>
              <View style={styles.header}>
                {/* Welcome header section */}
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
                      color="#555"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.profileButton}
                    onPress={toggleDropdown}
                  >
                    <Image
                      // source={require("../assets/Images/user-profile.png")} // Ensure this image exists
                      style={styles.profileImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.contentContainer}>
                {/* Doctor profile card */}
                <View style={styles.doctorProfileCard}>
                  <View style={styles.doctorLeftSection}>
                    <Image
                      source={doctorData.profileImage}
                      style={styles.doctorImage}
                    />
                    <View style={styles.ratingContainer}>
                      <MaterialIcons name="star" size={20} color="#FFD700" />
                      <Text style={styles.ratingText}>{doctorData.rating}</Text>
                    </View>
                  </View>

                  <View style={styles.doctorInfoSection}>
                    <Text style={styles.doctorName}>{doctorData.name}</Text>
                    <Text style={styles.doctorCredentials}>
                      {doctorData.credentials}
                    </Text>
                    <Text style={styles.doctorExperience}>
                      {doctorData.experience}
                    </Text>
                    <Text style={styles.doctorBio}>{doctorData.bio}</Text>

                    <View style={styles.reviewsSection}>
                      <Text style={styles.reviewsTitle}>User Reviews</Text>
                      <View style={styles.reviewsList}>
                        {doctorData.reviews.map((review) => (
                          <View key={review.id} style={styles.reviewCard}>
                            <Text style={styles.reviewText}>{review.text}</Text>
                            <View style={styles.reviewerContainer}>
                              <MaterialIcons name="star" size={16} color="#FFD700"/>
                              <MaterialIcons name="star" size={16} color="#FFD700"/>
                              <MaterialIcons name="star" size={16} color="#FFD700"/>
                              <MaterialIcons name="star" size={16} color="#FFD700"/>
                              <MaterialIcons name="star" size={16} color="#FFD700"/>
                              <Text style={styles.reviewerName}>
                                {review.reviewer}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>

                {/* Appointment booking section */}
                <View style={styles.appointmentSection}>
                  <View style={styles.appointmentHeader}>
                    <Text style={styles.appointmentTitle}>
                      Clinic Appointment
                    </Text>
                    <Text style={styles.appointmentFee}>{clinicData.fee}</Text>
                  </View>

                  <View style={styles.clinicDetails}>
                    <Text style={styles.clinicName}>{clinicData.name}</Text>
                    <Text style={styles.clinicWaitTime}>
                      {clinicData.waitTime}
                    </Text>
                    <Text style={styles.clinicLocation}>
                      {clinicData.layout}
                    </Text>
                  </View>

                  <View style={styles.dateSelector}>
                    {availableDates.map((date) => (
                      <TouchableOpacity
                        key={date.id}
                        style={[
                          styles.dateOption,
                          selectedDate === date.label && styles.selectedDate,
                        ]}
                        onPress={() => handleDateSelect(date.label)}
                      >
                        <Text style={styles.dateLabel}>{date.label}</Text>
                        <Text style={styles.slotsAvailable}>
                          {date.slotsAvailable > 0
                            ? `${date.slotsAvailable} slots Available`
                            : "No slot today"}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.timeSlotSection}>
                    <View style={styles.timeSlotsGroup}>
                      <Text style={styles.timeGroupLabel}>
                        {timeSlots.morning.label}
                      </Text>
                      <View style={styles.timeSlotsContainer}>
                        {timeSlots.morning.slots.map((time) => (
                          <TouchableOpacity
                            key={time}
                            style={[
                              styles.timeSlot,
                              selectedTimeSlot === time &&
                                styles.selectedTimeSlot,
                            ]}
                            onPress={() => handleBooking(time, doctorData, clinicData)}
                          >
                            <Text style={styles.timeSlotText}>{time}</Text>
                            <Text style={styles.bookNowText}>Book Now</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    <View style={styles.timeSlotsGroup}>
                      <Text style={styles.timeGroupLabel}>
                        {timeSlots.afternoon.label}
                      </Text>
                      <View style={styles.timeSlotsContainer}>
                        {timeSlots.afternoon.slots.map((time) => (
                          <TouchableOpacity
                            key={time}
                            style={[styles.timeSlot, selectedTimeSlot === time && styles.selectedTimeSlot,]}
                            onPress={() => handleBooking(time, doctorData, clinicData)}
                          >
                            <Text style={styles.timeSlotText}>{time}</Text>
                            <Text style={styles.bookNowText}>Book Now</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </View>
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
    width: 36,
    height: 36,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(138, 112, 255, 0.8)",
    marginBottom: "10%",
    borderRadius: 20,
    overflow: "hidden",
  },
  doctorProfileCard: {
    width: "60%",
    height: "80%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    margin: 10,
  },
  doctorLeftSection: {
    width: "20%",
    alignItems: "center",
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  doctorInfoSection: {
    width: "80%",
    paddingLeft: 20,
  },
  doctorName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  doctorCredentials: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  doctorExperience: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
    marginBottom: 10,
  },
  doctorBio: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 15,
  },
  reviewsSection: {
    marginTop: 10,
  },
  reviewsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewsList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewCard: {
    width: "30%",
    backgroundColor: "#ffebee",
    borderRadius: 10,
    padding: 10,
  },
  reviewText: {
    fontSize: 12,
    color: "#333",
    marginBottom: 5,
  },
  reviewerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  reviewerName: {
    fontSize: 10,
    color: "#666",
    marginLeft: 5,
  },
  appointmentSection: {
    width: "35%",
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: 10,
    padding: 20,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff7072",
  },
  appointmentFee: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff7072",
  },
  clinicDetails: {
    marginBottom: 20,
  },
  clinicName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  clinicWaitTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  clinicLocation: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateOption: {
    width: "30%",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  selectedDate: {
    borderBottomColor: "#ff7072",
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  slotsAvailable: {
    fontSize: 12,
    color: "#388e3c",
    marginTop: 5,
  },
  timeSlotSection: {
    marginTop: 10,
  },
  timeSlotsGroup: {
    marginBottom: 20,
  },
  timeGroupLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  timeSlotsContainer: {
    flexDirection: "row",
  },
  timeSlot: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedTimeSlot: {
    backgroundColor: "#e0f2f1",
    borderWidth: 1,
    borderColor: "#80cbc4",
  },
  timeSlotText: {
    fontSize: 14,
    color: "#333",
  },
});

export default DoctorsInfoWithRating;
