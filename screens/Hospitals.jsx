import { useCallback, useState } from "react"
import * as Location from "expo-location"

import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Linking,
  Keyboard,
  Modal,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useChatbot } from "../contexts/ChatbotContext"
import { useFocusEffect } from "@react-navigation/native"
import SideBarNavigation from "../components/SideBarNavigation"
import HospitalCard from "../components/HospitalCard"
import HeaderComponent from "../components/HeaderComponent"

const Hospitals = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const { setChatbotConfig } = useChatbot()
  const phoneNumber = "+918069991061"

  useFocusEffect(
    useCallback(() => {
      setChatbotConfig({ height: "32%" })
    }, []),
  )

  // functionality for header tag

  // const handleSearch = () => {
  //   Alert.alert(`Search Results for: ${searchQuery}`);
  // };
  // const toggleDropdown = () => {
  //   setDropdownVisible(!dropdownVisible);
  // };

  const profileOptions = ["View Profile", "Edit Profile", "Logout"] // Dropdown menu options

  const [selectedMethod, setSelectedMethod] = useState("Card")
  const [country, setCountry] = useState("United States")
  const [Message, setMessage] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    Keyboard.dismiss()
  }

  // Emergency call button

  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`)
  }

  const [visible, setvisible] = useState(false)
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)
  //const [bodyVisible, setbodyVisible] = useState(true);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [locationSuggestions, setLocationSuggestions] = useState([])
  const [bodyVisible, setbodyVisible] = useState(true)

  // Add function to handle location input change
  const handleLocationChange = (text) => {
    setLocation(text)
    if (text.length > 2) {
      // Mock location suggestions - in a real app, this would be an API call
      const mockSuggestions = Array(5)
        .fill(null)
        .map((_, index) => ({
          id: `loc-${index}`,
          name: "Akola, Maharashtra, India",
          fullAddress: "Akola, Maharashtra, India",
        }))
      setLocationSuggestions(mockSuggestions)
      setShowLocationSuggestions(true)
    } else {
      setShowLocationSuggestions(false)
    }
  }

  //For Fetching Current Location

  const getCurrentLocation = async () => {
    setLoading(true)
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        alert("Permission to access location was denied")
        setLoading(false)
        return
      }

      const position = await Location.getCurrentPositionAsync({})
      const address = await Location.reverseGeocodeAsync(position.coords)
      const currentAddress =
        address.length > 0
          ? `${address[0].name}, ${address[0].city}, ${address[0].region}, ${address[0].country}`
          : "Location Not Found"

      setLocation(currentAddress)

      // Generate mock location suggestions based on current location
      const mockSuggestions = Array(5)
        .fill(null)
        .map((_, index) => ({
          id: `loc-${index}`,
          name: currentAddress,
          fullAddress: currentAddress,
        }))
      setLocationSuggestions(mockSuggestions)
      setShowLocationSuggestions(true)
    } catch (error) {
      alert("Failed to get location")
    }
    setLoading(false)
  }

  // Add function to handle location selection
  const handleSelectLocation = (location) => {
    setLocation(location.name)
    setShowLocationSuggestions(false)
    // Here you would typically navigate to the next screen or update the UI
    // For now, we'll just close the modal
    // setvisible(false);
    // setbodyVisible(true);
  }

  // Data of Hospital
  const hospitals = [
    <HospitalCard key={1} style={styles.box} navigation={navigation} />,
    <HospitalCard key={2} style={styles.box} navigation={navigation} />,
    <HospitalCard key={3} style={styles.box} navigation={navigation} />,
    <HospitalCard key={4} style={styles.box} navigation={navigation} />,
    <HospitalCard key={5} style={styles.box} navigation={navigation} />,
    <HospitalCard key={6} style={styles.box} navigation={navigation} />,
    <HospitalCard key={7} style={styles.box} navigation={navigation} />,
    <HospitalCard key={8} style={styles.box} navigation={navigation} />,
    <HospitalCard key={9} style={styles.box} navigation={navigation} />,
    <HospitalCard key={10} style={styles.box} navigation={navigation} />,
    <HospitalCard key={11} style={styles.box} navigation={navigation} />,
  ]
  // For side buttons for to move Hospital Cards

  const [startIndex, setStartIndex] = useState(0)

  const moveLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }

  const moveRight = () => {
    if (startIndex < hospitals.length - 3) {
      setStartIndex(startIndex + 1)
    }
  }

  // For side buttons for to move Hospital Cards

  const [currentIndex, setCurrentIndex] = useState(0)

  const slideLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const slideRight = () => {
    if (currentIndex < hospitals.length - 6) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageBackground source={require("../assets/Images/background.jpg")} style={styles.imageBackground}>
            <View style={[styles.overlay, { backgroundColor: "rgba(13, 12, 12, 0.7)" }]} />

            <View style={styles.parent}>
              <View style={styles.Left}>
                <SideBarNavigation navigation={navigation} />
              </View>
              <View style={styles.Right}>
              <HeaderComponent />
                {/* {bodyVisible && */}(
                <View style={styles.body}>
                  <View style={styles.bodyLeft}>
                    <View style={styles.bodyheading}>
                      <Text style={styles.bodyHeadingText}>Book Hospital</Text>
                    </View>
                    <View style={styles.hospCards}>
                      <View style={styles.hospCards}>
                        {/* Left Button to Move Hospital Card */}
                        <TouchableOpacity onPress={moveLeft} style={styles.arrowButton}>
                          <Text style={styles.arrowText}>{"<"}</Text>
                        </TouchableOpacity>

                        {/* for displaying Hospital Card */}
                        <Pressable style={styles.display} onPress={() => {navigation.navigate("HospitalsInfoWithRating")}}>
                          {hospitals.slice(startIndex, startIndex + 3).map((hospital, index) => (
                            <View key={index} style={styles.box}>
                              {hospital}
                            </View>
                          ))}
                        </Pressable>

                        {/* Right Button to Move Hospital Card */}

                        <TouchableOpacity onPress={moveRight} style={styles.arrowButton}>
                          <Text style={styles.arrowText}>{">"}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {/* Emergency Card */}

                  <View style={styles.bodyRight}>
                    <View style={styles.emergencyCardContainer}>
                      <View style={styles.emergencyCard}>
                        <TouchableOpacity onPress={handleCallPress} style={styles.iconContainer}>
                          <MaterialIcons name="call" size={24} color="red" style={styles.callIcon} />
                        </TouchableOpacity>
                        <Text style={styles.headingEmergencyCard}>Emergency</Text>
                        <Text style={styles.description}>Get Immediate Help Now</Text>
                        <Text>Find the Nearest Hospital</Text>
                        <Text>& Book Instantly</Text>

                        {/* Button to book hospital */}

                        <TouchableOpacity
                          style={styles.EmergenecyButtonContainer}
                          onPress={() => {
                            setvisible(true)
                            setbodyVisible(false)
                          }}
                        >
                          <Text style={styles.EmergenecyButton}>Book Hospital Instantly</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                ){/* } */}
                {/* Screen visible when we click on book hospital Instantly */}
                <Modal visible={visible} animationType="slide" transparent={true}>
                  <View style={styles.modalContainer}>
                    {/* <Text style={styles.modalContainerHeading}>Hospital Booking</Text> */}
                    <View style={styles.modalContent}>
                      <View style={styles.modelHeader}>
                        <Text style={styles.modalText}>Look Like its an Emergency!!</Text>
                        <TouchableOpacity
                          onPress={() => {
                            setvisible(false)
                            setbodyVisible(true)
                            setShowLocationSuggestions(false)
                          }}
                          style={styles.modalButton}
                        >
                          <MaterialIcons name="clear" size={24} color="black" style={styles.clearIcon} />
                        </TouchableOpacity>
                      </View>

                      {!showLocationSuggestions ? (
                        <View style={styles.locationContainer}>
                          <View style={styles.locationinput}>
                            <MaterialIcons
                              name="location-on"
                              size={24}
                              color="black"
                              style={styles.currentLocationIcon}
                            />
                            <TextInput
                              style={styles.inputlocation}
                              placeholder="Enter your location"
                              placeholderTextColor="#aaa"
                              value={location}
                              onChangeText={handleLocationChange}
                            />
                          </View>
                          <View style={styles.currentLocation}>
                            <TouchableOpacity
                              style={styles.locationButton}
                              onPress={getCurrentLocation}
                              disabled={loading}
                            >
                              {loading ? (
                                <ActivityIndicator color="#000" />
                              ) : (
                                <Text style={styles.buttonText}>Use Current Location</Text>
                              )}
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : (
                        <View style={styles.suggestionsContainer}>
                          <FlatList
                            data={locationSuggestions}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                              <TouchableOpacity
                                style={styles.suggestionItem}
                                onPress={() => handleSelectLocation(item)}
                              >
                                <MaterialIcons
                                  name="location-on"
                                  size={20}
                                  color="black"
                                  style={styles.suggestionIcon}
                                />
                                <View style={styles.suggestionTextContainer}>
                                  <Text style={styles.suggestionName}>{item.name}</Text>
                                  <Text style={styles.suggestionAddress}>{item.fullAddress}</Text>
                                </View>
                              </TouchableOpacity>
                            )}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </Modal>
                {/* Footer section where more hospital cards are displayed */}
                <View style={styles.footer}>
                  <View style={styles.footerBody}>
                    <TouchableOpacity onPress={slideLeft} style={styles.arrowButton}>
                      <Text style={styles.arrowText}>{"<"}</Text>
                    </TouchableOpacity>

                    {/* Function to display  hospital cards in footer */}

                    {hospitals.slice(currentIndex, currentIndex + 6).map((hospital, index) => (
                      <View key={index} style={styles.box1}>
                        {hospital}
                      </View>
                    ))}

                    <TouchableOpacity onPress={slideRight} style={styles.arrowButton}>
                      <Text style={styles.arrowText}>{">"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
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
    borderWidth: 1,
  },
  Right: {
    height: "100%",
    width: "100%",
   // gap: "2%",
  },
  // header: {
  //   height: "10%",
  //   width: "60%",
  //   marginTop: "2%",
  //   marginLeft: "2%",
  //   backgroundColor: "#fff",
  //   // borderColor:"red",
  //   // borderWidth:"2px",
  // },
  body: {
    height: "30%",
    width: "100%",
    marginLeft: "2%",
    flexDirection: "row",
   // gap: "3%",
    marginBottom:"0%",
  },
  bodyLeft: {
    width: "40%",
    height: "100%",
    gap: 2,
    // borderColor:"red",
    // borderWidth:"2px",
  },
  bodyheading: {
    height: "10%",
    width: "100%",
    // borderColor:"red",
    // borderWidth:"2px",
  },

  bodyHeadingText: {
    fontSize: 20,
    color: "#fff",
    marginLeft:"6%",
  },
  hospCards: {
    height: "100%",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",

    // justifyContent:"flex-end",
  },

  display: {
    height: "100%",
    width: "85%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },

  arrowButton: {
    padding: 3,
    backgroundColor: "#ddd",
    // marginLeft:"10%",
    borderRadius: 40,
    marginHorizontal: 5,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  box: {
    flex: 1,
    height: "90%",
    width: "30%",
    justifyContent: "center",
    marginHorizontal: 10,
    flexShrink: 0,
  },

  bodyRight: {
    width: "25%",
    height: "100%",
    alignItems: "flex-end",
  },
  emergencyCardContainer: {
    width: "70%",
    height: "80%",
    marginLeft: "20%",
    paddingTop: "5%",
    paddingBottom: "20%",
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  emergencyCard: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingBottom: "10%",
    marginLeft: "4%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#fdecea",
  },
  callIcon: {
    alignSelf: "center",
  },
  headingEmergencyCard: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  description: {
    fontWeight: "bold",
  },
  EmergenecyButtonContainer: {
    marginTop: "5%",
    backgroundColor: "red",
    padding: "2%",
    borderRadius: 2,
  },
  EmergenecyButton: {
    color: "#fff",
  },

  modalContainer: {
    height: "100%",
    width: "100%",
    marginLeft: "14.9%",
    paddingTop: "10%",
    // paddingRight:"20%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: "1",

    //  alignItems: "center",
    //  flexDirection:"end"
    //  justifyContent: "center",
  },
  modalContainerHeading: {
    fontSize: 26,
    color: "#fff",
    marginRight: "45%",
    marginLeft: "5%",
  },

  modalContent: {
    width: "40%",
    height: "60%",
    marginLeft: "15%",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    borderRadius: 2,
    shadowOffset: "10",
  },
  modelHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modalText: {
    width: "100%",
    height: "30%",
    textAlign: "center",
    justifyContent: "center",
    marginTop: "5%",
    fontSize: 25,
    fontWeight: "bold",
  },
  locationContainer: {
    height: "55%",
    width: "100%",
    gap: 10,
  },
  locationinput: {
    width: "80%",
    height: "20%",
    marginLeft: "10%",
    marginRight: "10%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "white",
  },
  currentLocationIcon: {
    marginRight: 10,
  },
  inputlocation: {
    fontSize: 14,
    color: "black",
    // justifyContent:"center",
    alignItems: "center",
    padding: "1%",
  },
  currentLocation: {
    flexDirection: "row",
    width: "40%",
    height: "20%",
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "30%",

    borderWidth: 1,
    borderColor: "#black",
    borderRadius: 8,
  },

  footer: {
    height: "30%",
    width: "80%",
    marginLeft: "2%",
  },
  footerBody: {
    height: "100%",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  box1: {
    height: "90%",
    width: "16%",
    justifyContent: "center",
  },
  suggestionsContainer: {
    flex: 1,
    width: "100%",
    height:"50%",
    paddingHorizontal: 10,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionIcon: {
    marginRight: 10,
  },
  suggestionTextContainer: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  suggestionAddress: {
    fontSize: 12,
    color: "#666",
  },
  locationButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
  },
})

export default Hospitals

