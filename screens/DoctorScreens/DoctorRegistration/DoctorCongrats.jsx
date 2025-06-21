import React,{useEffect} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import NewSideNav from "../../../components/DoctorsPortalComponents/NewSideNav";
import { useRegistration } from "../../../contexts/RegistrationContext";

const DoctorCongrats = ({navigation}) => {
  const { setIsRegistered } = useRegistration(); 

  useEffect(() => {
    setIsRegistered(true);
  }, []);

  return (
    <View style={styles.parent}>
      <NewSideNav navigation={navigation} />

      <View style={styles.right}>
        <View style={styles.container}>
          <Text style={styles.congratsText}>Congratulations</Text>
          <Text style={styles.registrationText}>
            Your registration is complete!
          </Text>

          <Image
            source={require("../../../assets/DoctorsPortal/Icons/congrats.jpg")} // Replace with your image path
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.thankText}>
            Thank You for Registering on Kokoro.Doctor!
          </Text>

          <Text style={styles.infoText}>
            We appreciate your time and effort in joining our platform. Our team
            will review your details, and we’ll reach out to you once the
            verification process is complete.
          </Text>

          <Text style={styles.welcomeText}>Welcome to Kokoro.Doctor!</Text>

          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:support@kokoro.doctor")}
          >
            <Text style={styles.supportLink}>
              For any queries, feel free to contact our support team.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },

  right: {
    height: "100%",
    width: "85%",
    overflow: "hidden",
  },
  container: {
    width: windowWidth * 0.85,
    height: "100%",
    backgroundColor: "#fffafa",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  congratsText: {
    fontSize: 40,
    fontWeight: "600",
    color: "#f76c6c",
    fontStyle: "italic",
    fontFamily: "Caveat",
    marginBottom: 8,
  },
  registrationText: {
    fontSize: 24,
    color: "#000",
    fontWeight: "500",
    marginBottom: 24,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  thankText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
    color: "#000",
  },
  infoText: {
    fontSize: 13,
    color: "#444",
    lineHeight: 20,
    textAlign: "center",
    maxWidth: 230,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 40,
    color: "#f76c6c",
    fontWeight: "600",
    marginBottom: 16,
  },
  supportLink: {
    fontSize: 10,
    textDecorationLine: "underline",
    color: "#444",
  },
});

export default DoctorCongrats;
