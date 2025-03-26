import { useCallback, useState, useEffect } from "react"
import {
  Alert,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useChatbot } from "../../contexts/ChatbotContext"
import { useFocusEffect } from "@react-navigation/native"
import SideBarNavigation from "../../components/SideBarNavigation"

// Custom hook for responsive width
const useWindowWidth = () => {
  const [width, setWidth] = useState(Dimensions.get("window").width)

  useEffect(() => {
    const updateWidth = () => {
      setWidth(Dimensions.get("window").width)
    }

    if (Platform.OS === "web") {
      // For web, we need to listen to window resize events
      window.addEventListener("resize", updateWidth)
      return () => window.removeEventListener("resize", updateWidth)
    } else {
      // For native, use Dimensions event listener
      const subscription = Dimensions.addEventListener("change", updateWidth)
      return () => subscription.remove()
    }
  }, [])

  return width
}

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
              })
            },
            (error) => {
              reject({
                code: error.code,
                message: error.message,
              })
            },
            options,
          )
        } else {
          reject({
            code: "UNAVAILABLE",
            message: "Geolocation not available on this browser",
          })
        }
      })
    } else {
      // For native platforms, we would import the actual module
      // This will never run in web bundling
      console.warn("Native GetLocation used in non-native environment")
      return Promise.reject({
        code: "PLATFORM_NOT_SUPPORTED",
        message: "Platform not supported",
      })
    }
  },
}

// Keep the helper function for location error
const isLocationError = (error) => {
  return error && typeof error.code === "string" && typeof error.message === "string"
}

const DoctorsPaymentScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [patientName, setPatientName] = useState("")
  const { setChatbotConfig } = useChatbot()
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const width = useWindowWidth() // Use our custom hook

  useFocusEffect(
    useCallback(() => {
      // Reset chatbot height when this screen is focused
      setChatbotConfig({ height: "32%" })
    }, []),
  )

  const handleSearch = () => {
    Alert.alert(`Search Results for: ${searchQuery}`)
  }

  const handleContinuePayment = () => {
    Alert.alert("Processing Payment", "Redirecting to payment gateway...")
  }

  // Doctor data for the verified cardiologists
  const doctors = [
    { id: 1, image: require("../../assets/Images/dr_kislay.jpg") },
    { id: 2, image: require("../../assets/Images/Dr_Ritesh_Singh.jpg") },
    { id: 3, image: require("../../assets/Images/Dr_Sandip_Rungta.jpg") },
    { id: 4, image: require("../../assets/Images/Dr_Vinesh_Jain.jpg") },
  ]

  return (
    <>
      {Platform.OS === "web" && width > 1000 && (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../../assets/Images/MedicineBackground.png")}
              style={styles.imageBackground}
            >
              <View style={[styles.overlay, { backgroundColor: "rgba(16, 16, 16, 0.3)" }]} />

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
                      <Text style={styles.welcomeSubtext}>Here is your sales Medical dashboard</Text>
                    </View>

                    {/* Search bar */}
                    <View style={styles.searchBarContainer}>
                      <MaterialIcons name="search" size={20} color="#888" style={styles.searchIcon} />
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
                        <MaterialIcons name="notifications" size={24} color="#fff" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.profileButton}>
                        <Image source={require("../../assets/Images/dr_kislay.jpg")} style={styles.profileImage} />
                        <MaterialIcons name="arrow-drop-down" size={24} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Main content area */}
                  <View style={styles.contentContainer}>
                    {/* Payment confirmation card */}
                    <View style={styles.paymentCard}>
                      <View style={styles.paymentHeader}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                          <MaterialIcons name="arrow-back" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.paymentTitle}>Confirm and Pay</Text>
                      </View>

                      <View style={styles.doctorSection}>
                        <Text style={styles.sectionLabel}>Verified cardiologist online now</Text>
                        <View style={styles.doctorAvatars}>
                          {doctors.map((doctor) => (
                            <View key={doctor.id} style={styles.doctorAvatar}>
                              <Image source={doctor.image} style={styles.doctorAvatarImage} />
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

                      <TouchableOpacity style={styles.paymentButton} onPress={handleContinuePayment}>
                        <Text style={styles.paymentButtonText}>Continue to payment</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      )}

      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.mobileContainerWrapper}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.mobileContainer}>
              {/* Header with back button and title */}
              <View style={styles.doctorInfoContainer}>
                <TouchableOpacity style={styles.profileButton}>
                  <Image source={require("../../assets/Images/dr_kislay.jpg")} style={styles.profileImagei} />
                  <MaterialIcons name="arrow-drop-down" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.doctorName}>Dr Kislay Shrivasatva</Text>
                <Text style={styles.doctorSpecialty}>(Cardiologist)</Text>
              </View>

              {/* Doctor Info Section */}
              <View style={styles.mobileHeader}>
                <Text style={styles.sectionTitle}>Appointment</Text>
              </View>

              {/* Patient Info Section */}
              <View style={styles.patientInfoCard}>
                <Text style={styles.sectionTitle}>Patient Info</Text>
                <View style={styles.patientInfo}>
                  <View style={styles.patientInfoRow}>
                    <Image source={require("../../assets/Images/Patient.jpg")} style={styles.patientImage} />
                    <View style={styles.patientDetails}>
                      <Text style={styles.patientName}>McKinney (24)</Text>
                      <Text style={styles.noteText}>Note: Please Upload Patient Details In the Drop Link</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.uploadButton}>
                  <Image
                      source={require("../../assets/Images/Medilockerfile.jpg")}
                      style={{ width: 18, height: 18 }}
                    />
                    
                    <Text style={styles.uploadButtonText}>Upload from Medilocker</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Schedule Section */}
              <Text style={styles.sectionTitleOutside}>Schedule</Text>
              <View style={styles.scheduleContainer}>
                <View style={styles.scheduleHeader}>
                  <Text style={styles.scheduleHeaderText}>Time</Text>
                  <Text style={styles.scheduleHeaderText}>Date</Text>
                </View>
                <View style={styles.scheduleContent}>
                  <View style={styles.scheduleTimeContainer}>
                    <MaterialIcons name="access-time" size={18} color="#555" />
                    <Text style={styles.scheduleTimeText}>07:00</Text>
                  </View>
                  <View style={styles.scheduleDateContainer}>
                    <MaterialIcons name="event" size={18} color="#555" />
                    <Text style={styles.scheduleDateText}>17 Feb,2025</Text>
                  </View>
                </View>
              </View>

              {/* Payment Section */}
              <Text style={styles.sectionTitleOutside}>Payment</Text>
              <View style={styles.billDetails}>
                <Text style={styles.billTitle}>Bill Details</Text>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Consultation fees:</Text>
                  <Text style={styles.billValue}>$400</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Booking Fee</Text>
                  <Text style={styles.billValue}>$10</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Promo Applied:</Text>
                  <Text style={styles.billValue}>$0</Text>
                </View>
                <View style={[styles.billRow, styles.totalRow]}>
                  <Text style={[styles.billLabel, styles.totalLabel]}>Total Pay</Text>
                  <Text style={[styles.billValue, styles.totalValue]}>$410</Text>
                </View>
              </View>

              {/* Continue Button */}
              <TouchableOpacity style={styles.continueButton} onPress={handleContinuePayment}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  )
}

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
  profileImagei: {
    width: 50,
    height: 50,
    borderRadius: 25,
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

  // Mobile styles
  mobileContainerWrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  mobileContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingHorizontal: "5%",
    paddingTop: "1%",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  mobileHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "1%",
    paddingHorizontal: "2%",
    width: "100%",
    marginBottom: "1%",
  },
  mobileHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "4%",
  },
  doctorInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "5%",
    width: "100%",
  },
  doctorName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  patientInfoCard: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: "4%",
    marginBottom: "2.5%",
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#00000040",
    overflow: "hidden",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 3,
    shadowRadius: 3,
    elevation: 1,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "3%",
    color: "#333",
  },
  sectionTitleOutside: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "2%",
    marginTop: "2%",
    color: "#333",
  },
  patientInfoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: "3%",
  },
  patientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  patientDetails: {
    flex: 1,
    justifyContent: "center",
  },
  patientInfo: {
    display: "flex",
    flexDirection: "column",
    padding: "2.5%",
    width: "100%",
  },
  noteText: {
    fontSize: 14,
    color: "#ff7a7a",
    marginTop: "2%",
    width: "100%",
  },
  uploadButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "2.5%",
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: " #DADADA",
    marginTop: "1.5%",
    width: "90%",
  },
  uploadButtonText: {
    color: "#333",
    marginLeft: 8,
    fontSize: 14,
  },
  scheduleContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: "2.5%",
    shadowColor: "#00000040",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 3,
    shadowRadius: 3,
    elevation: 1,
    backgroundColor: "#fff",
  },
  scheduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    backgroundColor: "#fff",
  },
  scheduleHeaderText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  scheduleContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    backgroundColor: "#fff",
  },
  scheduleTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleTimeText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
  },
  scheduleDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleDateText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
  },
  billDetails: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "2.5%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 15,
    overflow: "hidden",
    width: "100%",
    shadowColor: "#00000040",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 3,
    shadowRadius: 3,
    elevation: 1,
    backgroundColor: "#fff"
  },
  billTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: "3%",
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  billRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "3%",
    paddingVertical: "2.5%",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    width: "100%",
  },
  billLabel: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  billValue: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
  },

  totalRow: {
    marginTop: 0,
    paddingTop: "2.5%",
    paddingBottom: "2.5%",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  continueButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff7a7a",
    padding: "2%",
    borderRadius: 10,
    marginVertical: "6%",
    marginHorizontal: "5%",
    width: "90%",
    alignSelf: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default DoctorsPaymentScreen;

