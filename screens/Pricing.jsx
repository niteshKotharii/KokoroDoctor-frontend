import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SideBarNavigation from "../components/SideBarNavigation";
import HealthCarePlan from "../components/HealthCarePlan";
import Header from "../components/Header";

const Pricing = ({ navigation, route }) => {
  const {width} = useWindowDimensions();
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const profileOptions = ["View Profile", "Edit Profile", "Logout"]; // Dropdown menu options

  return (
    <>
      {(Platform.OS==='web' || width > 1000 ) && (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../assets/Images/MedicineBackground.png")}
              style={styles.imageBackground}
            >
              <View style={[ styles.overlay,]}/>

              <View style={styles.parent}>
                <View style={styles.Left}>
                  <SideBarNavigation navigation={navigation} />
                </View>
                <View style={styles.Right}>
                  <View style={styles.header}>
                    <Header navigation={navigation} />
                  </View>
                  <View style={styles.titleBox}>
                    <Text style={styles.titleText}>Kokoro.Doctor Premium Healthcare Plans</Text>
                  </View>
                  <View style={styles.middlepart}>
                    <HealthCarePlan />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      )}

      {(Platform.OS!=='web' || width < 1000 ) && (
        <View style={styles.appContainer}>

          <View style={[styles.appHeader, {height: "15%"}]}>
            <Header navigation={navigation}/>
          </View>
        </View>
      )}
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
  appContainer:{
    flex: 1,
    height: "100%",
    width: "100%",
    // backgroundColor: "pink",
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
    width: "85%",
    flexDirection: "column",
  },
  header: {
    // borderWidth: 5,
    // borderColor: "black",
    zIndex: 2,
    ...Platform.select({
      web:{
        width:"100%",
      }
    })
  },
  appContainer:{
    flex: 1,
    height: "100%",
    width: "100%",
    // backgroundColor: "pink",
  },
  appHeader: {
    ...Platform.select({
      web:{
        width:"12%",
        marginLeft: "70%",
        marginTop: 15,
      }
    })
  },
  titleBox:{
    marginLeft: "5%",
    marginVertical: 5,
  },
  titleText:{
    color: "#fff",
    fontWeight: "600",
    fontSize: 30,
  },
  middlepart: {
    height: "72%",
    width: "90%",
    //borderWidth: 3,
    // borderRadius: 2,
    // borderColor: "#d3d3d3",
    marginLeft: "5%",
    overflow: "hidden",
    marginVertical: "0.5%",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject, // Cover the entire `middlepart`
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black
  },
});

export default Pricing;
