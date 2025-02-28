import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const API_URL = "http://127.0.0.1:5000";

// Google Auth Request
export const useGoogleAuth = () => {
  return Google.useAuthRequest({
    androidClientId: "",
    iosClientId: "",
    webClientId:
      "569847732356-rl6pnkut18s91cvsfipcuhlkptpoj8fh.apps.googleusercontent.com",
  });
};

export const signup = async (username, email, password, navigation) => {
  console.log("Signup", { username, email, password });
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      username,
      email,
      password,
    });
    const { user } = response.data;
    await AsyncStorage.setItem("@user", JSON.stringify(user));
    alert("Signup successful! Now you can login.");
    navigation.navigate("Login");
  } catch (error) {
    alert(
      `Signup Failed", ${error.response?.data?.detail || "Something went wrong!"}`
    );
  }
};

export const login = async (email, password, navigation, setUser) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    const { access_token, user } = response.data;

    await AsyncStorage.setItem("@token", access_token);
    await AsyncStorage.setItem("@user", JSON.stringify(user));
    alert("Login Successful! You are now logged in!");
    setUser(user);
    navigation.navigate("LandingPage");
  } catch (error) {
    alert(
      `Login Failed", ${error.response?.data?.detail || "Something went wrong!"}`
    );
  }
};

export const logOut = async (setUser) => {
  await AsyncStorage.removeItem("@token");
  await AsyncStorage.removeItem("@user");
  alert("Logged Out", "You have been successfully logged out.");
  setUser(null);
};

export const getUserInfo = async (token) => {
  if (!token) return;
  try {
    const response = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const user = await response.json();
    await AsyncStorage.setItem("@user", JSON.stringify(user));
  } catch (error) {
    Alert.alert("Error", "Unable to fetch user info. Please try again.");
  }
};

export const handleGoogleLogin = async (response, setUserInfo) => {
  if (response?.type === "success" && response.authentication?.accessToken) {
    getUserInfo(response.authentication.accessToken, setUserInfo);
  }
};
