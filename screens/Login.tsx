import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar, Alert, Platform } from 'react-native';
import MyLinearGradient from '../components/MyLinearGradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/Navigation";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

interface GoogleAuthenticationResponse {
  accessToken: string;
}

interface GoogleAuthResponse {
  type: "success" | "cancel";
  authentication?: GoogleAuthenticationResponse;
}

const Login = ({ navigation }: LoginProps) => {
  const [token, setToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "",
    iosClientId: "",
    webClientId: "569847732356-rl6pnkut18s91cvsfipcuhlkptpoj8fh.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  const handleEffect = async () => {
    const user = await getLocalUser();
    console.log("user", user);

    if (!user) {
      if (response?.type === "success" && response.authentication?.accessToken) {
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
  };

  const getLocalUser = async (): Promise<any | null> => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error("Error fetching user info:", error);
      Alert.alert("Error", "Unable to fetch user info. Please try again.");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user");
    setUserInfo(null);
    navigation.navigate('Login');
  }

  return (
    <MyLinearGradient style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('First')}>
          <View>
            <Image source={require('../assets/Images/NewLogo.png')} style={styles.logo} />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Welcome to Kokoro.doctor</Text>

      {/* {Platform.OS==='android' && <>
        <View style={styles.container}>
        <View> 
          <Image source={require('../assets/Images/NewLogo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>Welcome to Metafied</Text>
        <Text style={styles.subtitle}>Log in or Register your email.</Text>
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#fff" />
        <TouchableOpacity style={styles.continueButton} onPress={()=> {navigation.navigate('LandingPage')}}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        </View>
      </>} */}

      {!userInfo ? (
          <>
            <Text style={styles.subtitle}>Log in or Register your email.</Text>
            <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()} disabled={!request}>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#fff" />
          </>
      ) : (
        <>
          <View style={styles.card}>
            {userInfo?.picture && (
              <Image source={{ uri: userInfo?.picture }} style={styles.image} />
            )}
            <Text style={styles.text}>Email: {userInfo.email}</Text>
            <Text style={styles.text}>
              Verified: {userInfo.verified_email ? "yes" : "no"}
            </Text>
            <Text style={styles.text}>Name: {userInfo.name}</Text>
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('Second')}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton}
            onPress={handleLogout}> 
            <Text style={styles.continueButtonText}>Log out</Text>
          </TouchableOpacity>
        </>
        
      )}
      </View>
    </MyLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 32,
    color: 'black',
    marginTop: 20,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#B7B7B7',
    marginBottom: 20,
  },
  line: {
    width: 250,
    borderColor: '#D9D9D966',
    borderWidth: 1,
    marginBottom: 20,
  },
  googleButton: {
    width: 300,
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  googleButtonText: {
    color: '#D9D9D9',
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    width: 300,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
    color: '#D9D9D9',
    textAlign: "center",
  },
  continueButton: {
    width: 300,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 10,
  },
  continueButtonText: {
    color: '#D9D9D9',
    fontSize: 16,
    textAlign: "center",
  },
  logoutButton: {
    width: 300,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 40,
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
