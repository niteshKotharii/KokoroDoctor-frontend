import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import MyLinearGradient from "../components/MyLinearGradient";
import { AuthContext } from "../contexts/AuthContext";
import { useGoogleAuth } from "../utils/AuthService";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const {login, googleLogin} = useContext(AuthContext);
  const [request, response, promptAsync] = useGoogleAuth();

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

  return (
    <MyLinearGradient style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("LandingPage")}>
          <Image
            source={require("../assets/Images/NewLogo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Welcome to Kokoro.doctor</Text>
        <Text style={styles.subtitle}>Log in or Register your email.</Text>

        {/* Google Sign-In Button */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => handleGoogleLogin()}
          disabled={!request}
        >
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.line}></View>

        {/* Email Login Fields */}
        <TextInput
          style={[styles.input]}
          placeholder="Enter your Email"
          placeholderTextColor="#000"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Enter your Password"
          placeholderTextColor="#000"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Email Login Button */}
        <TouchableOpacity style={styles.continueButton} onPress={() => {login(email, password, navigation)}}>
          <Text style={styles.continueButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Signup Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.continueButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </MyLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 32,
    color: "black",
    marginTop: 20,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: "#B7B7B7",
    marginBottom: 20,
  },
  line: {
    width: 250,
    borderColor: "#D9D9D966",
    borderWidth: 1,
    marginBottom: 20,
  },
  googleButton: {
    width: 300,
    backgroundColor: "#4285F4",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  googleButtonText: { color: "#D9D9D9", fontSize: 16, textAlign: "center" },
  input: {
    width: 300,
    backgroundColor: "#333",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
    color: "#000",
    textAlign: "center",
    backgroundColor: "#B8BAC24D",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  continueButton: {
    width: 300,
    backgroundColor: "#333",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  continueButtonText: { color: "#D9D9D9", fontSize: 16, textAlign: "center" },
  logoutButton: {
    width: 300,
    backgroundColor: "#333",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Login;
