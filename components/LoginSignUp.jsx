import React, { useContext } from "react";
import { Pressable, View, Text, StyleSheet, Image, Platform, useWindowDimensions } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

const LoginSignUp = ({ navigation }) => {
  const {user, logout} = useContext(AuthContext);
  const { width } = useWindowDimensions();
  return (
    <View style={styles.header}>
      {user ? (
        // Show user info when logged in
        <>
          {Platform.OS === "web" && (
            <View style={styles.userInfo}>
              <Image source={user?.picture ? { uri: user.picture } : require("../assets/Images/user-icon.jpg")} style={styles.userIcon}/>
              <Text style={styles.username}>{user?.name ? user?.name : "User"}</Text>
              <Pressable onPress={logout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
              </Pressable>
            </View>
          )}

          {Platform.OS !== "web" && (
            <View style={styles.appHeaderContainer}>
              <View style={styles.appHeader}>
                <View style={styles.logo}>
                  <Image source={require("../assets/Images/KokoroLogo.png")} style={[styles.userIcon, {borderRadius: 0 }]}/>
                  <Text style={styles.authText}>Kokoro.Doctor</Text>
                </View>
    
                <View style={styles.userInfo}>
                  <Image source={user?.picture ? { uri: user.picture } : require("../assets/Images/user-icon.jpg")} style={styles.userIcon}/>
                  <MaterialIcons name="notifications-none" size={24} color="black" />
                </View>
              </View>
              <View style={styles.appUserBox}>
                <Text style={[styles.authText, {fontWeight: 500}]}> {`Hello ${user?.name ? user?.name : "User"}`} </Text>
              </View>
            </View>
          )}


        </>
      ) : (
        // Show login/signup buttons when not logged in
        <View style={styles.authButtons}>
          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={styles.authButton}
          >
            <Text style={[styles.authText, {color: width<1000? "#000" : "#fff"}]}>Login</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Signup")}
            style={styles.authButton}
          >
            <Text style={[styles.authText, {color: width<1000? "#000" : "#fff"}]}>Signup</Text>
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
    marginTop:5,
  },
  appHeaderContainer:{

  },
  appHeader:{
    marginTop: "25%",
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingHorizontal: 15,
  },
  appUserBox:{
    justifyContent: "center",
    marginLeft: 20,
  },
  authButtons: {
    flexDirection: "row",
    gap: 15,
    ...Platform.select({
      android: {
        marginTop: "10%",
        alignSelf: "flex-end",
        marginRight: "5%",
      }
    })
  },
  authButton: {
    height: 50,
    ...Platform.select({
      web:{
        padding: 10,
        justifyContent: "center",
      },
    })
  },
  authText: {
    fontWeight: "800",
    color: "#000000",
    fontSize: 20,
    ...Platform.select({
      web:{
        fontSize: 18,
        color: "#FFFFFF",
      },
    })
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
  logo:{
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default LoginSignUp;
