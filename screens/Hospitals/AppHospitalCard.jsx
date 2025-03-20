import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

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
  Modal,
  useWindowDimensions,
  ScrollView,
} from "react-native";

const AppHospitalCard = ({ navigation, route }) => {
  return (
    <>
   
      <View style={styles.parent}>
        <View style={styles.top}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/Images/hospitalImages.png")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.topRight}>
            <View style={styles.conatiner1}>
              <View style={styles.container1Left}>
                <Text style={styles.hospitalname}>Apollo Hospital</Text>
                <Text style={styles.hospitaltype}>Multispecialty</Text>
              </View>
              <View style={styles.container1Right}>
                <View style={styles.rating}>
                  <Text>⭐ 4.5</Text>
                </View>

                <Text style={styles.knowmoreButton}>know more</Text>
              </View>
            </View>
            <View style={styles.conatiner2}>
              <View style={styles.container2Left}>
                <Text style={styles.distanceheading}>Distance</Text>
                <Text style={styles.distanceAway}>2.3 km away</Text>
              </View>
              <View style={styles.container2Right}>
                <Text style={styles.ArrivalHeadeing}>Arrival time</Text>
                <Text style={styles.Arrivingin}>Reaches in 10 min</Text>
              </View>
            </View>
            <View style={styles.conatiner3}>
              <View style={styles.container3Left}>
                <Text style={styles.bedAvialable}>
                  Emergency Beds Available
                </Text>
              </View>
              <View style={styles.container3Right}>
                <TouchableOpacity>
                  <Icon
                    style={styles.icondesign}
                    name="call-outline"
                    size={20}
                    color="#FF7072"
                  />
                </TouchableOpacity>
                <Text style={styles.callHospital}>Call Hospital</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity onPress={() => navigation.navigate("HospitalDetails")}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.text}>Book Hospital</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
   
    </>
  );
};
const styles = StyleSheet.create({
  parent: {
    height: 200,
    width: "100%",
    // backgroundColor: "pink",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: "3%",
    padding: "2%",
  },
  top: {
    height: "82%",
    width: "100%",
    flexDirection: "row",
  },
  imageContainer: {
    height: "90%",
    width: "45%",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: "5%",
  },
  topRight: {
    height: "90%",
    width: "55%",
    // backgroundColor: "blue",
    gap: "3%",
    alignItems: "center",
  },
  conatiner1: {
    height: "30%",
    width: "100%",
    flexDirection: "row",
    padding: "1%",
    // backgroundColor: "red",
  },
  container1Left: {
    height: "100%",
    width: "60%",
    justifyContent: "space-between",
  },

  hospitalname: {
    fontStyle: "Poppins",
    fontWeight: "bold",
    fontSize: 16,
    color: "#000000",
  },
  hospitaltype: {
    color: "5F5F5F",
  },
  container1Right: {
    height: "100%",
    width: "40%",
    justifyContent: "space-between",
    paddingRight: "2%",
    alignItems: "flex-end",
  },
  rating: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 2,
    padding: 2,
  },
  conatiner2: {
    height: "30%",
    width: "85%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: "5%",
    shadowOffset: 1,
    flexDirection: "row",
    backgroundColor: "#F7F5F5",
    justifyContent: "space-between",
  },
  container2Left: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    //  paddingLeft:"3%",
  },
  distanceheading: {
    fontStyle: "Poppins",
    fontSize: 12,
  },
  distanceAway: {
    fontSize: 10,
    fontStyle: "poppins",
    color: "#FF0000",
  },
  container2Right: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ArrivalHeadeing: {
    fontStyle: "Poppins",
    fontSize: 12,
  },
  Arrivingin: {
    fontStyle: "Poppins",
    fontSize: 10,
    color: "#2CBE5E",
  },

  conatiner3: {
    height: "30%",
    width: "85%",
    flexDirection: "row",
    // backgroundColor: "yellow",
  },
  container3Left: {
    width: "50%",
    height: "100%",
    padding: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  bedAvialable: {
    fontSize: 10,
    fontStyle: "poppins",
    flexWrap: "wrap",
  },
  container3Right: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  icondesign: {
    padding: 4,
    borderRadius: 50,
    backgroundColor: "#fdecea",
  },
  callHospital: {
    fontSize: 8,
  },

  bottom: {
    height: "18%",
    width: "100%",
  },
  buttonContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "2%",
  },
  text: {
    fontStyle: "Poppins",
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
});
export default AppHospitalCard;
