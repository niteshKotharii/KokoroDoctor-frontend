import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/AuthContext";
import { useGoogleAuth } from "../../utils/AuthService";

const Signup = ({ navigation }) => {
  const {signup, googleLogin} = useContext(AuthContext);
  const [request, response, promptAsync] = useGoogleAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [referralModalVisible, setReferralModalVisible] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    if (response) {
      googleLogin(response)
        .then(() => {
          navigation.navigate("LandingPage");
        })
        .catch((error) => {
          console.error("Google login error:", error);
        });
    }
  }, [response, googleLogin, navigation]);

  // Function to trigger Google login
  const handleGoogleLogin = () => {
    if (request) {
      promptAsync(); // Opens the Google login prompt
    } else {
      console.log("Google auth request not ready yet");
    }
  };

  const handleSignUp = () => {
    const fullName = firstName + " " + lastName;
    signup(fullName, email, password, phoneNumber, location, navigation);
  };

  const handleReferralCode = () => {
    // Open referral code modal
    setReferralModalVisible(true);
  };

  const handleReferralSubmit = () => {
    // Process the referral code
    setReferralModalVisible(false);
  };

  const handleCopyCode = () => {

  };

  const handleDetectLocation = () => {

  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.mainContainer}>
        {/* Left side with background image - 40% */}
        <View style={styles.leftContainer}>
          <ImageBackground
            source={require("../../assets/Images/signup.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <Text style={styles.quoteText}>
              "Nurture Your Heart. It Will Nurture You."
            </Text>
          </ImageBackground>
        </View>

        {/* Rectangular divider */}
        <View style={styles.divider} />

        {/* Right side with form - 60% */}
        <View style={styles.rightContainer}>
          <View style={styles.mainright}>
            <Text style={styles.welcomeText}>Welcome</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Name"
                placeholderTextColor="#999"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Name"
                placeholderTextColor="#999"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Phone no"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Enter Location or Detect current location
              </Text>
              <View style={styles.locationInputContainer}>
                <TextInput
                  style={styles.locationInput}
                  placeholder="Enter Location"
                  placeholderTextColor="#999"
                  value={location}
                  onChangeText={setLocation}
                />
                <TouchableOpacity
                  style={styles.locationIcon}
                  onPress={handleDetectLocation}
                >
                  <Ionicons name="location-outline" size={24} color="#999" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.rememberForgotRow}>
              <View style={styles.rememberMeContainer}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={toggleRememberMe}
                >
                  <View
                    style={[styles.checkbox, rememberMe && styles.checkedBox]}
                  >
                    {rememberMe && (
                      <Ionicons name="checkmark" size={12} color="#FFF" />
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View>

              {/* <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot Password</Text>
              </TouchableOpacity> */}
            </View>

            <View style={styles.referralContainer}>
              <Text style={styles.referralText}>
                Have Referral Code?{" "}
                <Text style={styles.referralLink} onPress={handleReferralCode}>
                  Sign up through code
                </Text>
              </Text>
            </View>

            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSignUp}
            >
              <Text style={styles.signInButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>Or</Text>
              <View style={styles.orLine} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
            >
              <Image
                source={require("../../assets/Images/google-icon.png")}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Sign Up with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Referral Code Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={referralModalVisible}
        onRequestClose={() => setReferralModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter the code Manually</Text>

            <View style={styles.codeInputContainer}>
              <TextInput
                style={styles.codeInput}
                placeholder="Code"
                placeholderTextColor="#999"
                value={referralCode}
                onChangeText={setReferralCode}
              />
              <TouchableOpacity
                style={styles.copyButton}
                onPress={handleCopyCode}
              >
                <Ionicons name="copy-outline" size={20} color="#999" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleReferralSubmit}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  quoteText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 36,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    width: "80%",
  },
  divider: {
    width: "0.15%",
    height: "100%",
    backgroundColor: "#EEEEEE",
  },
  rightContainer: {
    width: "60%",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  mainright: {
    width: "55%",
    height: "98%", // Reduced from 95% to ensure all content fits
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: "2%", // Reduced from 4%
  },
  inputContainer: {
    marginBottom: "2%", // Reduced from 3%
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: "1%",
    fontWeight: "500",
  },
  input: {
    height: 38, // Reduced from 44
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    paddingHorizontal: "3%",
    fontSize: 14,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    height: 40, // Reduced from 44
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  locationInput: {
    flex: 1,
    paddingHorizontal: "3%",
    fontSize: 14,
    height: "100%",
    outlineStyle: "none",
    borderwidth: 0,
  },
  locationIcon: {
    padding: "2%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    height: 40, // Reduced from 44
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: "3%",
    fontSize: 14,
    height: "100%",
    outlineStyle: "none",
    borderwidth: 0,
  },
  eyeIcon: {
    padding: "2%",
  },
  rememberForgotRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "2%", // Reduced from 3%
    marginTop: "1%",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkboxContainer: {
    marginRight: "2%",
  },
  checkbox: {
    width: 14, // Reduced from 18
    height: 14, // Reduced from 18
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  checkedBox: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  rememberMeText: {
    fontSize: 14,
    color: "#666",
    flex: 3,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "underline",
  },
  referralContainer: {
    alignItems: "center",
    marginVertical: "1.5%", // Reduced from 2%
  },
  referralText: {
    fontSize: 14,
    color: "#666",
  },
  referralLink: {
    fontWeight: "bold",
    color: "#666",
    textDecorationLine: "underline",
  },
  signInButton: {
    backgroundColor: "#10B981",
    width: "100%",
    height: 40, // Reduced from 46
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: "1%",
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: "2%", // Reduced from 3%
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDD",
  },
  orText: {
    fontSize: 14,
    color: "#666",
    paddingHorizontal: "2%",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 42, // Reduced from 46
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: "2%",
  },
  googleButtonText: {
    fontSize: 14,
    color: "#666",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "30%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: "2%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: "4%",
    textAlign: "center",
  },
  codeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    height: 40,
    width: "100%",
    backgroundColor: "#FFFFFF",
    marginBottom: "4%",
  },
  codeInput: {
    flex: 1,
    paddingHorizontal: "3%",
    fontSize: 14,
    height: "100%",
  },
  copyButton: {
    padding: "2%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: "#DDD",
    paddingHorizontal: "3%",
  },
  continueButton: {
    backgroundColor: "#10B981",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Signup;