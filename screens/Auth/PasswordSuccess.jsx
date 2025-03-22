import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PasswordSuccess = ({ navigation }) => {
  const handleBackToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9966CC" />

      <View style={styles.mainContainer}>
        {/* Left side with background image */}
        <View style={styles.leftContainer}>
          <ImageBackground
            source={require("../../assets/Images/login-background.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteText}>
                "Nurture Your Heart. It Will Nurture You."
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* Rectangular divider */}
        <View style={styles.divider} />

        {/* Right side with success message */}
        <View style={styles.rightContainer}>
          <View style={styles.successContainer}>
            <View style={styles.checkmarkCircle}>
              <Ionicons name="checkmark" size={24} color="#FFFFFF" />
            </View>

            <Text style={styles.successTitle}>Password Set</Text>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleBackToLogin}
            >
              <Text style={styles.loginButtonText}>Back To Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
  leftContainer: {
    width: "40%",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#9966CC", // Fallback color that matches the image background
  },
  quoteContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  quoteText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 32,
  },
  divider: {
    width: 2, // Thin vertical divider
    height: "100%",
    backgroundColor: "#EEEEEE",
  },
  rightContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  successContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10%",
  },
  loginButton: {
    backgroundColor: "#10B981",
    width: "100%",
    paddingVertical: "4%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PasswordSuccess;