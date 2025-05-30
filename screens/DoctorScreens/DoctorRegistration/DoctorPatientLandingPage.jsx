import React, { useEffect, useState, useRef } from "react";
import NewSideNav from "../../../components/DoctorsPortalComponents/NewSideNav";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  FlatList,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRole } from "../../../contexts/RoleContext";

const DoctorPatientLandingPage = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const { setRole, role } = useRole();

  // useEffect(() => {
  //   if (!role) return; // Don't run on initial render

  //   if (role === "doctor") {
  //     navigation.navigate("DoctorsSignUp");
  //   } else if (role === "patient") {
  //     navigation.navigate("LandingPage");
  //   }
  // }, [role]);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeoutRef = useRef(null);

  // Use this flag to control navigation with debounce to prevent double-clicks
  const navigateToRolePage = (selectedRole) => {
    // Prevent multiple clicks
    if (isNavigating) return;
    
    // Set navigating state to prevent further clicks
    setIsNavigating(true);
    setRole(selectedRole);
    
    // Clear any existing timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
    
    // Navigate after a short delay to prevent double navigation
    navigationTimeoutRef.current = setTimeout(() => {
      if (selectedRole === "doctor") {
        navigation.navigate("DoctorsSignUp");
      } else if (selectedRole === "patient") {
        navigation.navigate("LandingPage");
      }
    }, 300);
  };

  // Reset navigation flag when component mounts (e.g., when coming back)
  useEffect(() => {
    setIsNavigating(false);
    
    // Add event listener for back button/navigation
    const unsubscribe = navigation.addListener('focus', () => {
      // When this screen gets focus (including when back button is pressed)
      setIsNavigating(false);
      
      // Clear any pending navigation timeouts
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
      }
    });
    
    // Clean up on unmount
    return () => {
      unsubscribe();
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [navigation]);


  return (
    <>
      <View style={styles.wrapper}>
        <NewSideNav />
        <View style={styles.content}>
          <View style={styles.cloud_Image1}>
            <Image
              source={require("../../../assets/DoctorsPortal/Icons/cloudIcon1.png")}
            />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.cloud_Image2}>
              <Image
                source={require("../../../assets/DoctorsPortal/Icons/cloudIcon2.png")}
              />
            </View>
            <View style={styles.content_box}>
              <View style={styles.contentHeading}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "600",
                    color: "#444444",
                    textAlign: "center",
                    fontStyle: "Poppins",
                  }}
                >
                  Register as a Patient or Doctor
                </Text>
              </View>
              <View style={styles.content_body}>
                <View style={styles.box}>
                  {/* <TouchableOpacity style={styles.touchableBox}> */}
                  <Pressable
                    // onPress={() => {
                    //   setRole("patient");
                    //   //navigation.navigate("LandingPage");
                    // }}
                    onPress={() => navigateToRolePage("patient")}
                    style={({ hovered, pressed }) => [
                      styles.touchableBox,
                      hovered || pressed ? styles.selectedBox : null,
                    ]}
                  >
                    <Text style={styles.boxText}>Patient</Text>
                    <Image
                      source={require("../../../assets/DoctorsPortal/Icons/patientIcon.png")}
                      style={styles.box_Icon}
                    />
                  </Pressable>
                  {/* </TouchableOpacity> */}
                </View>

                <View style={styles.box}>
                  <Pressable
                    // onPress={() => {
                    //   setRole("doctor");
                    //   //navigation.navigate('DoctorsSignUp');
                    // }}
                    onPress={() => navigateToRolePage("doctor")}
                    style={({ hovered, pressed }) => [
                      styles.touchableBox,
                      hovered || pressed ? styles.selectedBox : null,
                    ]}
                  >
                    <Text style={styles.boxText}>Doctor</Text>
                    <Image
                      source={require("../../../assets/DoctorsPortal/Icons/DoctorIcon.png")}
                      style={styles.box_Icon}
                    />
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={styles.cloud_Image3}>
              <Image
                source={require("../../../assets/DoctorsPortal/Icons/cloudIcon3.png")}
              />
            </View>
          </View>
          <View style={styles.imageConatiner2}>
            <View style={styles.imageConatiner2_upper}>
              <Image
                source={require("../../../assets/DoctorsPortal/Icons/icon1.png")}
                // style={styles.icondesign}
              />
              <View style={styles.innerImageContainer}>
                <Image
                  source={require("../../../assets/DoctorsPortal/Icons/icon2.png")}
                  style={styles.icondesign}
                />
                <Image
                  source={require("../../../assets/DoctorsPortal/Icons/icon3.png")}
                  style={styles.icondesign}
                />
              </View>
              <Image
                source={require("../../../assets/DoctorsPortal/Icons/icon4.png")}
                // style={styles.icondesign}
              />
              <Image
                source={require("../../../assets/DoctorsPortal/Icons/icon5.png")}
                // style={styles.icondesign}
              />
              <Image
                source={require("../../../assets/DoctorsPortal/Icons/icon6.png")}
                style={styles.icondesign}
              />
              <Image
                source={require("../../../assets/DoctorsPortal/Icons/icon7.png")}
                // style={styles.icondesign}
              />
              <Image
                source={require("../../../assets/DoctorsPortal/Icons/icon8.png")}
                style={styles.icondesign}
              />
              <Image
                source={require("../../../assets/DoctorsPortal/Icons/icon9.png")}
                style={styles.icondesign}
              />
              <Image
                source={require("../../../assets/DoctorsPortal/Icons/icon10.png")}
                style={styles.icondesign}
              />
            </View>
            <View style={styles.imageConatiner2_lower}>
              <Image
                source={require("../../../assets/DoctorsPortal/Images/rectanglebase.png")}
                style={styles.rectanglebase}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
  },
  content: {
    width: "85%",
    height: "100%",
    backgroundColor: "#FCF5F7",
    overflow: "hidden",
  },
  cloud_Image1: {
    height: "20%",
    width: "100%",
    paddingLeft: "15%",
  },
  contentContainer: {
    width: "100%",
    height: "50%",

    flexDirection: "row",
    alignItems: "center",
  },

  cloud_Image2: {
    width: "15%",
    height: "100%",
    paddingTop: "5%",
  },
  content_box: {
    width: "65%",
    height: "90%",

    backgroundColor: "#FFFFFF",
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  contentHeading: {
    height: "30%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content_body: {
    height: "80%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  box: {
    width: "40%",
    height: "60%",
    //paddingLeft:"5%",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,

    shadowColor: "#00000040",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
    cursor: "pointer",
  },
  touchableBox: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "5%",
  },
  selectedBox: {
    backgroundColor: "#FF606033",
    borderRadius: 14,
  },
  boxText: {
    fontStyle: "Montserrat",
    fontSize: 20,
    fontWeight: "400",
    color: "#000000",
  },
  box_Icon: {
    height: 160,
    resizeMode: "contain",
  },

  cloud_Image3: {
    width: "20%",
    height: "100%",
    marginLeft: "2%",
    justifyContent: "flex-end",
    paddingBottom: "5%",
  },
  imageConatiner2: {
    width: "100%",
    height: "30%",
  },
  imageConatiner2_upper: {
    height: "70%",
    width: "95%",
    flexDirection: "row",
    alignItems: "flex-end",
    marginLeft: "5%",
    justifyContent: "space-between",
  },
  innerImageContainer: {
    flexDirection: "row",
  },
  icondesign: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  imageConatiner2_lower: {
    height: "30%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rectanglebase: {
    width: "90%",
    height: "100%",

    alignItems: "flex-end",
  },
});

export default DoctorPatientLandingPage;
