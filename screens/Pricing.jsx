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
                  <View style={styles.headerBar}>
                    <View style={styles.headerText}>
                      <Text style={styles.textDetail}>
                        Kokoro.Doctor Premium Healthcare Plans
                      </Text>
                    </View>
                    <View style={styles.header}>
                      <View style={styles.notificationBox}>
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
                              dropdownVisible
                                ? "arrow-drop-up"
                                : "arrow-drop-down"
                            }
                            size={24}
                            color="#fff"
                          />
                          {dropdownVisible && (
                            <View style={styles.dropdownMenu}>
                              {profileOptions.map((option, index) => (
                                <TouchableOpacity
                                  key={index}
                                  style={styles.dropdownItem}
                                  onPress={() => Alert.alert(option)}
                                >
                                  <Text style={styles.dropdownText}>
                                    {option}
                                  </Text>
                                </TouchableOpacity>
                              ))}
                            </View>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
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
    width: "100%",
    flexDirection: "column",
  },
  headerBar: {
    height: "7%",
    width: "80%",
    marginTop: "3%",
    marginLeft: "2%",
    //borderWidth: 1,
    borderColor: "#ffffff",
    flexDirection: "row",
    //flexWrap: "wrap",
    justifyContent: "space-between",
  },
  headerText: {
    height: "100%",
    width: "60%",
    //borderWidth: 1,
    borderColor: "#00ffff",
  },
  textDetail: {
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: 33,
    //alignSelf: "center",
  },
  header: {
    height: "100%",
    width: "12%",
    //marginLeft: "10%",
    // marginTop: "4%",
   // borderWidth: 1,
    borderColor: "#ffffff",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    // borderColor: "#FFFFFF",
    // borderWidth: 1,
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
  notificationBox: {
    height: "100%",
    width: "20%",
    //borderWidth: 1,
    borderColor: "#ffffff",
  },
  bellIcon: {
    height: 22,
    width: 22,
    alignSelf: "center",
    marginTop: "15%",
  },
  profileContainer: {
    height: "100%",
    width: "40%",
    //borderWidth: 1,
    borderColor: "#ffffff",
    //justifyContent:"flex-start",
    //alignItems:"center"
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: "1%",
    //backgroundColor: "#333",
    borderRadius: 8,
  },
  profileIcon: {
    width: 40,
    height: 38,
    borderRadius: 20,
  },
  dropdownMenu: {
    backgroundColor: "#f8f8ff",
    borderRadius: 8,
    padding: 6,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    display: "flex",
    // zIndex: 20,
  },
  dropdownItem: {
    paddingVertical: 1,
    zIndex: 20,
  },
  dropdownText: {
    color: "#000000",
    fontSize: 14,
  },

  middlepart: {
    height: "72%",
    width: "80%",
    //borderWidth: 3,
    // borderRadius: 2,
    // borderColor: "#d3d3d3",
    marginLeft: "2%",
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
