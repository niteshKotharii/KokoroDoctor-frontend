import React, { useCallback, useState } from "react";
import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import {getCurrentUser, logOut } from "../utils/AuthService";
import { useFocusEffect } from "@react-navigation/native";

const LoginSignUp = ({ navigation }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const loggedInUser = await getCurrentUser();
    setUser(loggedInUser);
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  return (
    <View style={styles.header}>
      {user ? (
        // Show user info when logged in
        <View style={styles.userInfo}>
          <Image source={require("../assets/Images/user-icon.jpg")} style={styles.userIcon} />
          <Text style={styles.username}>{user.username}</Text>
          <Pressable onPress={async () => {
            await logOut();
            setUser(null);
          }} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      ) : (
        // Show login/signup buttons when not logged in
        <View style={styles.authButtons}>
          <Pressable onPress={() => navigation.navigate("Login")} style={styles.authButton}>
            <Text style={styles.authText}>Login</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Signup")} style={styles.authButton}>
            <Text style={styles.authText}>Signup</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  authButtons: {
    flexDirection: "row",
    gap: 15,
  },
  authButton: {
    padding: 10,
  },
  authText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  userInfo: {
    marginTop:10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  logoutButton: {
    padding: 8,
    backgroundColor: "#E74C3C",
    borderRadius: 5,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default LoginSignUp;
