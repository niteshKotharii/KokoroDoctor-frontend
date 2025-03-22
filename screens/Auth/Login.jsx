import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { useGoogleAuth } from "../../utils/AuthService";
import { Ionicons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, googleLogin } = useContext(AuthContext);
  const [request, response, promptAsync] = useGoogleAuth();

  useEffect(() => {
    if (response) {
      googleLogin(response)
        .then(() => {
          WebBrowser.dismissBrowser();
          navigation.navigate("LandingPage");
        })
        .catch((error) => {
          console.error("Google login error:", error);
        });
    }
  }, [response, googleLogin, navigation]);

  const handleGoogleLogin = () => {
    if (request) {
      promptAsync({ useProxy: false });
    } else {
      console.log("Google auth request not ready yet");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            source={require("../../assets/Images/login-background.png")}
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

        {/* Right side with login form - 60% */}
        <View style={styles.rightContainer}>
          <View style={styles.mainright}>
            <Text style={styles.title}>Welcome Back!</Text>

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
                  onPress={togglePasswordVisibility}
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
              <TouchableOpacity
                style={styles.rememberMeContainer}
                onPress={toggleRememberMe}
              >
                <View
                  style={[styles.checkbox, rememberMe && styles.checkedBox]}
                >
                  {rememberMe && (
                    <Ionicons name="checkmark" size={12} color="#FFF" />
                  )}
                </View>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => login(email, password, navigation)}
            >
              <Text style={styles.continueButtonText}>Log in</Text>
            </TouchableOpacity>

            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>Or</Text>
              <View style={styles.orLine} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
              disabled={!request}
            >
              <Image
                source={require("../../assets/Images/google-icon.png")}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 30,
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
    paddingHorizontal: "5%",
  },
  mainright: {
    width: "65%",
    margin: "auto",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: "4%",
  },
  inputContainer: {
    marginBottom: "3%",
    width: "100%",
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: "1%",
    fontWeight: "500",
  },
  input: {
    height: 50,
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    paddingHorizontal: "3%",
    fontSize: 16,
    width: "100%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    height: 50,
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: "3%",
    fontSize: 16,
    height: "100%",
    outlineStyle: "none",
    borderWidth: 0,
  },
  eyeIcon: {
    padding: "2%",
  },
  rememberForgotRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "3%",
    marginTop: "1%",
  },
  rememberMeContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "2%",
    backgroundColor: "#FFF",
  },
  checkedBox: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  rememberMeText: {
    fontSize: 14,
    color: "#666",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "underline",
  },
  continueButton: {
    backgroundColor: "#10B981",
    width: "100%",
    height: 50,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginBottom: "2%",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: "3%",
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
    height: 50,
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: "2%",
  },
  googleButtonText: {
    fontSize: 14,
    color: "#666",
  },
});

export default Login;