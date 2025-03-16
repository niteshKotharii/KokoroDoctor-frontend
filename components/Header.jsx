import React, { useContext, useState } from "react";
import { Pressable, View, Text, StyleSheet, Image, Platform, useWindowDimensions, Modal } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import SideBarNavigation from "./SideBarNavigation";

const Header = ({ navigation }) => {
  const {user, logout} = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
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

          {(Platform.OS !== "web" || width<1000) && (
            <>
              <Modal
                  visible={isSideBarVisible}
                  transparent={true}
                  onRequestClose={() => setIsSideBarVisible(false)}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.mobileSidebar}>
                      <SideBarNavigation
                        navigation={navigation}
                        closeSidebar={() => setIsSideBarVisible(false)}
                      />
                    </View>
                    <Pressable
                      style={styles.overlay}
                      onPress={() => setIsSideBarVisible(false)}
                    />
                  </View>
              </Modal>

              <View style={styles.appHeaderContainer}>
                <View style={styles.appHeader}>
                  <View style={styles.logo}>
                    <Pressable style={styles.hamburger} onPress={()=>setIsSideBarVisible(true)}>
                      <MaterialIcons name="menu" size={30} color="black" />
                    </Pressable>
                    <Image source={require("../assets/Images/KokoroLogo.png")} style={{height:30, width:30}}/>
                    <Text style={styles.authText}>Kokoro.Doctor</Text>
                  </View>
      
                  <View style={styles.userInfo}>
                    <Pressable>
                      <Image source={user?.picture ? { uri: user.picture } : require("../assets/Images/user-icon.jpg")} style={styles.userIcon}/>
                    </Pressable>
                    <Pressable>
                      <MaterialIcons name="notifications-none" size={24} color="black" />
                    </Pressable>
                  </View>
                </View>
              </View>
            </>
          )}

        </>
      ) : (
        
        // Show login/signup buttons when not logged in
        <>
          {(Platform.OS === "web" && width>1000) && (
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

          {(Platform.OS !== "web" || width<1000) && (
            <>
              <Modal
                visible={isSideBarVisible}
                transparent={true}
                onRequestClose={() => setIsSideBarVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.mobileSidebar}>
                    <SideBarNavigation
                      navigation={navigation}
                      closeSidebar={() => setIsSideBarVisible(false)}
                    />
                  </View>
                  <Pressable
                    style={styles.overlay}
                    onPress={() => setIsSideBarVisible(false)}
                  />
                </View>
              </Modal>
              <View style={styles.appHeaderContainer}>
                <View style={styles.appHeader}>
                  <View style={styles.logo}>
                    <Pressable style={styles.hamburger} onPress={()=>setIsSideBarVisible(true)}>
                      <MaterialIcons name="menu" size={30} color="black" />
                    </Pressable>
                    <Image source={require("../assets/Images/KokoroLogo.png")} style={{height:30, width:30}}/>
                    <Text style={styles.authText}>Kokoro.Doctor</Text>
                  </View>
      
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
                </View>
              </View>
            </>
          )}
        </>
   
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop:5,
  },
  appHeaderContainer:{

  },
  appHeader:{
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingHorizontal: 15,
  },
  hamburger: {
    marginHorizontal: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 50,
  },
  mobileSidebar:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '70%',
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 51,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  authButtons: {
    flexDirection: "row",
    gap: 15,
    ...Platform.select({
      android: {
        marginTop: "13%",
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
    fontSize: 16,
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
  },
});

export default Header;
