// import React, { useCallback, useState } from "react";
// import {
//   Alert,
//   Image,
//   Text,
//   ImageBackground,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   TextInput,
//   Linking,
//   Keyboard,
//   Platform,
//   useWindowDimensions,
// } from "react-native";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { Picker } from "@react-native-picker/picker";
// import { useChatbot } from "../contexts/ChatbotContext";
// import { useFocusEffect } from "@react-navigation/native";
// import SideBarNavigation from "../components/SideBarNavigation";
// import Header from "../components/Header";
// import SearchBar from "../components/SearchBar";

// const Hospitals = ({ navigation, route }) => {
//   const {width} = useWindowDimensions();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const { setChatbotConfig } = useChatbot();
//   const phoneNumber = "+918069991061";

//   useFocusEffect(
//     useCallback(() => {
//       setChatbotConfig({ height: "32%"});
//     }, [])
//   );

//   const handleSearch = () => {
//     Alert.alert(`Search Results for: ${searchQuery}`);
//   };
//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   const profileOptions = ["View Profile", "Edit Profile", "Logout"]; // Dropdown menu options

//   const [selectedMethod, setSelectedMethod] = useState("Card");
//   const [country, setCountry] = useState("United States");
//   const [Message, setMessage] = useState("");
//   const [isFocused, setIsFocused] = useState(false);

//   const handleFocus = () => {
//     setIsFocused(true);
//   };

//   const handleBlur = () => {
//     setIsFocused(false);
//     Keyboard.dismiss();
//   };

//   const handleCallPress = () => {
//     Linking.openURL(`tel:${phoneNumber}`);
//   };

//   return (
//     <>
//       {(Platform.OS==='web' && width>900) && (
//         <View style={styles.container}>
//           <View style={styles.imageContainer}>
//             <ImageBackground
//               source={{
//                 uri: "https://s3-alpha-sig.figma.com/img/a87a/3ace/8a094e276846c4e13df3a43f65f0d04f?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DxcA~LinUKvodODvPVUZXbxemW5QAUBIh7RMQDc1~VLSV7T0m2E9RlXxSahOpbPhnGXdmGTY97O6DYOtz0CI9NpIwfDlMl-8W8IJJq0ezUFZGscjVaEB3-wEsT8dstoZn8ctXncyzbxJluHOJfF48Fa8ivo8KLX3V4FVKqgChUhXdlJQjmxlfZ17HWol4oJTIx18ggIohcRwt1yp2i9Ocbj~sGMTXj3siSMwhKK7PTy2LDe11UZc1F8JDTbgztNNjFuGK0jCsJv~jPktrFz3g5I-2tsu0XefSBDPfKVS-Jdy0SadGTWcsGBnFW3Ne2xuP8~g4stTHpOD1z9zsMxAAw__",
//               }}
//               style={styles.imageBackground}
//             >
//               <View
//                 style={[
//                   styles.overlay,
//                   { backgroundColor: "rgba(16, 16, 16, 0.7)" },
//                 ]}
//               />

//               <View style={styles.parent}>
//                 <View style={styles.Left}>
//                   <SideBarNavigation navigation={navigation} />
//                 </View>
//                 <View style={styles.Right}>

//                   {/* <View style={styles.center}>
//                     <View style={styles.center_textbar}>
//                       <Text style={styles.centerText}>Welcome!</Text>
//                       <Text style={styles.lowertext}>
//                         Here is your sales Medical dashboard
//                       </Text>
//                     </View>
//                     <View style={styles.search_bar}>
//                       <TouchableOpacity onPress={handleSearch}>
//                         <Image
//                           source={require("../assets/Icons/search.png")}
//                           style={styles.chatIcon}
//                         />
//                       </TouchableOpacity>
//                       <TextInput
//                         style={styles.searchInput}
//                         placeholder="Search your query"
//                         placeholderTextColor="#aaa"
//                         value={searchQuery}
//                         onChangeText={setSearchQuery}
//                         onFocus={handleFocus}
//                         onBlur={handleBlur}
//                       />
//                     </View>
//                     <View style={styles.notification}>
//                       <TouchableOpacity
//                         onPress={() => Alert.alert("Notification")}
//                       >
//                         <Image
//                           source={require("../assets/Icons/notification1.png")}
//                           style={styles.bellIcon}
//                         />
//                       </TouchableOpacity>
//                     </View>
//                     <View style={styles.profileContainer}>
//                       <TouchableOpacity
//                         style={styles.profileHeader}
//                         onPress={toggleDropdown}
//                       >
//                         <Image
//                           source={require("../assets/Icons/profile1.png")}
//                           style={styles.profileIcon}
//                         />
//                         <MaterialIcons
//                           name={
//                             dropdownVisible ? "arrow-drop-up" : "arrow-drop-down"
//                           }
//                           size={24}
//                           color="#fff"
//                         />
//                       </TouchableOpacity> */}
//                       {/* Dropdown Menu */}
//                       {/* {dropdownVisible && (
//                         <View style={styles.dropdownMenu}>
//                           {profileOptions.map((option, index) => (
//                             <TouchableOpacity
//                               key={index}
//                               style={styles.dropdownItem}
//                               onPress={() => Alert.alert(option)}
//                             >
//                               <Text style={styles.dropdownText}>{option}</Text>
//                             </TouchableOpacity>
//                           ))}
//                         </View>
//                       )} */}
//                     {/* </View>
//                   </View> */}

//                   <View style={styles.header}><Header navigation={navigation}/></View>
                  
//                   <View style={styles.middlepart}>

//                     <View style={styles.hospitalSection}>
//                       <View style={styles.hospitalProfile}>
//                         <View style={styles.hospital}>
//                           <Image
//                             source={require("../assets/Images/apollo.png")}
//                             style={styles.hospitalImage}
//                           />
//                           <Text style={styles.hospitalRating}>⭐ 4.5</Text>
//                         </View>

//                         <View style={styles.hospitalDetails}>
//                           <Text style={styles.hospitalName}>Apollo hospital</Text>
//                           <Text style={styles.specialist}>
//                             Cardialogy Department
//                           </Text>
//                           <Text style={styles.workingExperience}>
//                             Trust of more than 41 years with 10000+ and 73+
//                             hospital network
//                           </Text>
//                         </View>
//                       </View>
//                       <TouchableOpacity
//                         style={styles.appointmentButton}
//                         onPress={handleCallPress}
//                       >
//                         <Text style={styles.appointmentButtonText}>
//                           Book Online Video Chat
//                         </Text>
//                       </TouchableOpacity>
//                     </View>  

//                     <View style={styles.paymentSection}>

//                       {/* Payment Methods */}
//                       <View style={styles.paymentMethods}>
//                         {["Card", "EPS", "Giropay"].map((method) => (
//                           <TouchableOpacity
//                             key={method}
//                             style={[
//                               styles.paymentOption,
//                               selectedMethod === method && styles.selectedOption,
//                             ]}
//                             onPress={() => setSelectedMethod(method)}
//                           >
//                             <Text style={styles.paymentText}>{method}</Text>
//                           </TouchableOpacity>
//                         ))}
//                       </View>

//                       {/* Card Details */}
//                       <View style={styles.inputContainer}>
//                         <View style={styles.inputBox}>
//                           <TextInput
//                             placeholder="1234-1234-1234-1234"
//                             style={styles.input}
//                           />
//                         </View>
//                         <View style={styles.row}>
//                           <TextInput
//                             placeholder="MM / YY"
//                             style={[styles.input, styles.half]}
//                           />
//                           <TextInput
//                             placeholder="CVC"
//                             style={[styles.input, styles.half]}
//                           />
//                         </View>
//                         <View style={styles.row}>
//                           <Picker
//                             selectedValue={country}
//                             onValueChange={(value) => setCountry(value)}
//                             style={[styles.input, styles.half]}
//                           >
//                             <Picker.Item
//                               label="United States"
//                               value="United States"
//                             />
//                             <Picker.Item label="Canada" value="Canada" />
//                             <Picker.Item
//                               label="United Kingdom"
//                               value="United Kingdom"
//                             />
//                           </Picker>
//                           <TextInput
//                             placeholder="Postal code"
//                             style={[styles.input, styles.half]}
//                           />
//                         </View>
//                         <TouchableOpacity
//                           style={styles.booknowButton}
//                           onPress={handleCallPress}
//                         >
//                           <Text style={styles.booknowButtonText}>
//                             Book In-person Appointment
//                           </Text>
//                         </TouchableOpacity>
//                       </View>
//                     </View>

//                     <View style={styles.boxAds}>
//                       <Text style={styles.adsText}>
//                         We can put some ads if there are any
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </ImageBackground>
//           </View>
//         </View>
//       )}

//       {(Platform.OS!=='web' || width < 900 ) && (
//         <View style={styles.appContainer}>

//             <View style={[styles.header, {height: "12%"}]}>
//               <Header navigation={navigation}/>
//             </View>
//         </View>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "row",
//     height: "100%",
//     width: "100%",
//   },
//   appContainer:{
//     flex: 1,
//     height: "100%",
//     width: "100%",
//     // backgroundColor: "pink",
//   },
//   imageContainer: {
//     height: "100%",
//     width: "100%",
//     // borderWidth: 1,
//     // borderColor: "#ff0000",
//   },
//   imageBackground: {
//     flex: 1,
//     height: "100%",
//     width: "100%",
//     borderWidth: 1,
//     opacity: 1,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   parent: {
//     flexDirection: "row",
//     height: "100%",
//     width: "100%",
//   },
//   Left: {
//     height: "100%",
//     width: "15%",
//     //borderWidth: 1,
//   },
//   Right: {
//     height: "100%",
//     width: "100%",
//   },
//   header: {
//     ...Platform.select({
//       web:{
//         width:"12%",
//         marginLeft: "70%",
//         marginTop: 15,
//       }
//     })
//   },
//   center: {
//     marginHorizontal: "2%",
//     marginTop: "3%",
//     padding: "1.2%",
//     // borderWidth: 2,
//     // borderRadius: 1,
//     alignItems: "center",
//     //justifyContent: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     width: "80%",
//     height: "12%",
//     flexDirection: "row",
//     zIndex:10,
//   },
//   center_textbar: {
//     //borderWidth: 1,
//     height: "200%",
//     width: "40%",
//     marginRight: "11.5%",
//     marginVertical: "2%",
//     flexDirection: "column",
//   },
//   centerText: {
//     fontWeight: 500,
//     fontSize: 42,
//     fontFamily: "Inter",
//     color: "white",
//     paddingTop: "1%",
//   },
//   lowertext: {
//     color: "#FFFFFF",
//     paddingLeft: "3%",
//   },
//   search_bar: {
//     flexDirection: "row",
//     height: 40,
//     width: 250,
//     borderWidth: 1,
//     borderColor: "#aaa",
//     right: 60,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     alignItems: "center",
//   },
//   searchInput: {
//     flex: 1,
//     alignItems: "flex-end",
//     //borderWidth: 1,
//     color: "#FFF",
//     ...Platform.select({
//       web: {
//         outlineStyle: "none",
//         borderWidth: 0,
//       },
//     }),
//   },
//   chatIcon: {
//     width: 20,
//     height: 20,
//     marginLeft: 0,
//   },
//   notification: {
//     height: 22,
//     width: 22,
//     //borderWidth:1,
//     borderColor: "#fff",
//     marginLeft: "3%",
//   },
//   bellIcon: {
//     height: 22,
//     width: 22,
//   },
//   profileContainer: {
//     height: "130%",
//     width: "10%",
//     //borderWidth: 1,
//     borderColor: "#fff",
//     marginLeft: "6%",
//   },
//   profileHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     //backgroundColor: "#333",
//     borderRadius: 8,
//   },
//   profileIcon: {
//     width: 40,
//     height: 45,
//     marginRight: 10,
//     bottom: 8,
//     //borderWidth:1,
//     borderRadius: 20,
//   },
//   dropdownMenu: {
//     marginTop: 2,
//     backgroundColor: "#f8f8ff",
//     borderRadius: 8,
//     padding: 6,
//     width: 150,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//   },
//   dropdownItem: {
//     paddingVertical: 1,
//   },
//   dropdownText: {
//     color: "#000000",
//     fontSize: 14,
//   },
//   middlepart: {
//     height: "50%",
//     width: "80%",
//     borderWidth: 3,
//     borderRadius: 20,
//     borderColor: "#d3d3d3",
//     marginLeft: "2%",
//     overflow: "hidden",
//     marginVertical: "3%",
//     flexDirection: "row",
//     justifyContent:"space-between",
//     zIndex:1,
//   },
//   blurView: {
//     ...StyleSheet.absoluteFillObject, // Cover the entire `middlepart`
//     backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black
//   },
//   hospitalSection:{
//     width:"40%",
//     height:"100%",
//   },
//   hospitalProfile: {
//     height: "62%",
//     width: "100%",
//     //borderWidth: 1,
//     borderColor: "#fff",
//     marginLeft: "1%",
//     marginTop: "1%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   hospital: {
//     height: "100%",
//     width: "30%",
//     //borderWidth: 1,
//     borderColor: "#FFFFFF",
//     flexDirection: "column",
//   },
//   hospitalImage: {
//     height: "60%",
//     width: "100%",
//     borderRadius: 15,
//     resizeMode: "cover",
//   },
//   hospitalRating: {
//     color: "#fff",
//     fontWeight: 300,
//     fontSize: 18,
//     fontFamily: "Poppins",
//     marginVertical: "4%",
//     marginHorizontal: "27%",
//   },
//   hospitalDetails: {
//     height: "100%",
//     width: "70%",
//     //borderWidth: 1,
//     borderColor: "#FFFFFF",
//   },
//   hospitalName: {
//     color: "#fff",
//     marginLeft: "36%",
//     fontWeight: 300,
//     fontSize: 20,
//     fontFamily: "Poppins",
//     marginVertical: "2%",
//     width: "60%",
//     marginRight: "65%",
//     alignSelf: "center",
//   },
//   specialist: {
//     color: "#fff",
//     fontWeight: 300,
//     fontSize: 20,
//     fontFamily: "Poppins",
//     marginLeft: "5%",
//     marginVertical: "1%",
//   },
//   workingExperience: {
//     color: "#fff",
//     fontWeight: 300,
//     fontSize: 20,
//     fontFamily: "Poppins",
//     marginLeft: "5%",
//     marginVertical: "1%",
//   },
//   appointmentButton: {
//     height: "15%",
//     width: "60%",
//     borderWidth: 1,
//     borderColor: "#ff6347",
//     backgroundColor: "#FF7072",
//     left: "1%",
//     borderRadius: 15,
//   },
//   appointmentButtonText: {
//     color: "#fff",
//     fontWeight: 300,
//     fontSize: 22,
//     fontFamily: "Poppins",
//     textAlign: "center",
//     //position: "relative",
//     top: "24%",
//   },
//   paymentSection: {
//     height: "100%",
//     width: "35%",
//     flexDirection: "column",
//     marginTop:10,
//   },
//   paymentMethods: {
//     height: "65%",
//     width: "83%",
//     //borderWidth: 1,
//     borderColor: "#fff",
//     paddingTop: "1%",
//     // left: 40,
//     flexDirection: "row",
//     alignSelf:"center",
//   },
//   paymentOption: {
//     height: "20%",
//     width: "31%",
//     padding: "5%",
//     //borderWidth: 2,
//     borderColor: "#ccc",
//     marginHorizontal: 5,
//     backgroundColor: "#fff",
//     textAlign: "left",
//     borderRadius: 4,
//     marginLeft: "1%",
//   },
//   paymentText: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   selectedOption: {
//     borderColor: "#007BFF",
//   },
//   inputContainer: {
//     width: "81%",
//     padding: 15,
//     //backgroundColor: "#fff",
//     borderRadius: 10,
//     elevation: 5,
//     marginLeft: "12.5%",
//     marginVertical: "-42%",
//     //borderWidth: 1,
//     borderColor: "#00ffff",
//   },
//   inputBox: {
//     //borderWidth:2,
//     // width: "110%",
//     marginBottom: "1%",
//     right: "5%",
//   },
//   input: {
//     borderColor: "#000000",
//     padding: "3%",
//     borderWidth: 1,
//     borderRadius: 4,
//     backgroundColor: "#fff",
//     width: "auto",
//     paddingTop: "2%",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     height: "38%",
//     //borderWidth: 2,
//     right: "6%",
//     gap: 8,
//     padding: "1.5%",
//   },
//   half: {
//     width: "60%",
//     //borderWidth: 2,
//     padding: "3%",
//   },
//   booknowButton: {
//     height: "30%",
//     width: "80%",
//     borderWidth: 1,
//     borderRadius: 15,
//     borderColor: "#ff6347",
//     backgroundColor: "#FF7072",
//     justifyContent: "center",
//     marginTop: 10,
//     marginLeft: "5%",
//     paddingHorizontal: 5,
//   },
//   booknowButtonText: {
//     color: "#fff",
//     fontWeight: 300,
//     fontSize: 20,
//     fontFamily: "Poppins",
//     textAlign: "center",
//   },
//   boxAds: {
//     width: "25%",
//     borderWidth: 25,
//     borderColor: "#F4B442",
//     borderTopRightRadius: 18,
//     borderBottomRightRadius: 18,
//     backgroundColor: "#F4B442",
//   },
//   adsText: {
//     fontWeight: 500,
//     fontSize: 25,
//     fontFamily: "Poppins",
//   },
// });

// export default Hospitals;


// "use client"

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
    <HospitalCard key={1} style={styles.box} />,
    <HospitalCard key={2} style={styles.box} />,
    <HospitalCard key={3} style={styles.box} />,
    <HospitalCard key={4} style={styles.box} />,
    <HospitalCard key={5} style={styles.box} />,
    <HospitalCard key={6} style={styles.box} />,
    <HospitalCard key={7} style={styles.box} />,
    <HospitalCard key={8} style={styles.box} />,
    <HospitalCard key={9} style={styles.box} />,
    <HospitalCard key={10} style={styles.box} />,
    <HospitalCard key={11} style={styles.box} />,
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
                        <View style={styles.display}>
                          {hospitals.slice(startIndex, startIndex + 3).map((hospital, index) => (
                            <View key={index} style={styles.box}>
                              {hospital}
                            </View>
                          ))}
                        </View>

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
    gap: "2%",
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
    borderRadius: "45%",
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
    borderWidth: "2px",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "3%",
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
    fontSize: "90%",
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
    borderRadius: "2%",
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
    fontSize: "160%",

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
    borderRadius: "1%",
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
    fontSize: "150%",
    fontWeight: "bold",
  },
  locationContainer: {
    height: "55%",
    width: "100%",
    gap: "10%",
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

