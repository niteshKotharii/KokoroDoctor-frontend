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
  Platform,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/AuthContext";
import { useGoogleAuth } from "../../utils/AuthService";

const Signup = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { signup, googleLogin } = useContext(AuthContext);
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

  const handleGoogleLogin = () => {
    if (request) {
      promptAsync();
    } else {
      console.log("Google auth request not ready yet");
    }
  };

  const handleSignUp = () => {
    const fullName = firstName + " " + lastName;
    signup(fullName, email, password, phoneNumber, location, navigation);
  };

  const handleReferralCode = () => {
    setReferralModalVisible(true);
  };

  const handleReferralSubmit = () => {
    setReferralModalVisible(false);
  };

  const handleDetectLocation = () => {
    // Implement location detection logic
  };

  const handleCopyCode = () => {
    // Implement copy code logic
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <>
      {/* Web Version (for larger screens) */}
      {Platform.OS === "web" && width > 1000 && (
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
              <ScrollView
                contentContainerStyle={styles.mainright}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
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
                      <Ionicons
                        name="location-outline"
                        size={24}
                        color="#999"
                      />
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
                        style={[
                          styles.checkbox,
                          rememberMe && styles.checkedBox,
                        ]}
                      >
                        {rememberMe && (
                          <Ionicons name="checkmark" size={12} color="#FFF" />
                        )}
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.rememberMeText}>Remember me</Text>
                  </View>
                </View>

                <View style={styles.referralContainer}>
                  <Text style={styles.referralText}>
                    Have Referral Code?{" "}
                    <Text
                      style={styles.referralLink}
                      onPress={handleReferralCode}
                    >
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
                  <Text style={styles.googleButtonText}>
                    Sign Up with Google
                  </Text>
                </TouchableOpacity>
              </ScrollView>
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
      )}
      {/* Mobile Version (for smaller screens) */}
      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.mobileContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/Images/KokoroLogo.png")}
              style={styles.logoImage}
            />
            <Text style={styles.logoText}>Kokoro.Doctor</Text>
          </View>

          <Text style={styles.welcomeTitle}>Welcome</Text>

          <View style={styles.mobileFormContainer}>
            <TextInput
              style={styles.mobileInput}
              placeholder="First Name"
              placeholderTextColor="#999"
              value={firstName}
              onChangeText={setFirstName}
            />

            <TextInput
              style={styles.mobileInput}
              placeholder="Last Name"
              placeholderTextColor="#999"
              value={lastName}
              onChangeText={setLastName}
            />

            <TextInput
              style={styles.mobileInput}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.mobileInput}
              placeholder="Phone Number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.rememberForgotContainer}>
              {/* Remember Me Section */}
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

              {/* Have Referral Code Section */}
              <Text style={styles.referralText} onPress={handleReferralCode}>
                Have Referral Code?
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  // Web Styles
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
  leftContainer: {
    width: "40%", // Increased from 40% to 50%
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
    fontSize: 32, // Slightly increased
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 40,
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
    width: "60%", // Adjusted to match left container
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  mainright: {
    width: "100%", // Increased from 55% to 70%
    height: "100%",
  },
  welcomeText: {
    fontSize: 32, // Increased from 28
    fontWeight: "bold",
    color: "#333",
    marginBottom: "3%",
  },
  inputContainer: {
    marginBottom: "0.1%", // Slightly increased
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: "1.5%",
    fontWeight: "500",
  },
  input: {
    height: 42, // Increased from 38
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
    height: 40,
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
    height: 50,
    marginBottom: 15,
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeIconContainer: {
    paddingHorizontal: 15,
    height: "100%",
    justifyContent: "center",
  },
  rememberForgotRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "2%",
    marginTop: "1%",
  },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  rememberMeText: {
    fontSize: 14,
    color: "#666",
  },
  referralContainer: {
    alignItems: "center",
    marginVertical: "1.5%",
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
    height: 40,
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
    marginVertical: "2%",
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
    height: 42,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: Platform.select({
      web: "30%",
      default: "60%",
    }),
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

  // Mobile Styles
  mobileContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  logoText: {
    fontSize: 18,
    color: "#666",
    fontWeight: "500",
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
  },
  mobileFormContainer: {
    width: "100%",
  },
  mobileInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    width: "100%",
  },
  eyeIconContainer: {
    paddingHorizontal: 15,
    height: "100%",
    justifyContent: "center",
  },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  referralText: {
    fontSize: 14,
    color: "#10B981",
    fontWeight: "600",
  },
  signInButton: {
    backgroundColor: "#10B981",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDD",
  },
  orText: {
    paddingHorizontal: 10,
    color: "#666",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    width: "100%",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#666",
  },
});

export default Signup;
