"use client"

import { useState } from "react"
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from "react-native"
import SideBarNavigation from "../../../components/DoctorsPortalComponents/NewestSidebar"
import SettingsNavigation from "../../../components/DoctorsPortalComponents/SettingsNavigation"
import HeaderNavigation from "../../../components/DoctorsPortalComponents/HeaderNavigation"

const ProfileSetting = ({ navigation, route }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("+91")
  const [profilePhoto, setProfilePhoto] = useState(null)

  const handleBrowseFile = () => {
    console.log("Browse for profile photo")
  }

  const handlePhoneNumberChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "")
    if (cleanedText.length <= 10) {
      setPhoneNumber(cleanedText)
    }
  }

  const handleAgeChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "")
    setAge(cleanedText)
  }

  return (
    <View style={styles.container}>
      <View style={styles.parent}>
        {/* Left Sidebar */}
        <View style={styles.Left}>
          <SideBarNavigation navigation={navigation} />
        </View>

        {/* Middle Settings Menu */}
        <View style={styles.Middle}>
          <SettingsNavigation navigation={navigation} />
        </View>

        {/* Right Content Area */}
        <View style={styles.Right}>
          {/* Moved header out of scrollview */}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.contentCard}>
              <Text style={styles.contentTitle}>Profile Setting</Text>
              <Text style={styles.profileSubtitle}>Manage your account settings</Text>
              <HeaderNavigation navigation={navigation} />
              <View style={styles.formContainer}>
                <View style={styles.profilePhotoContainer}>
                  <View style={styles.profilePhotoCircle}></View>
                  <TouchableOpacity style={styles.editIconContainer} onPress={handleBrowseFile}>
                    <Image source={require("../../../assets/DoctorsPortal/Icons/pencil.png")} style={styles.pencilIcon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.divider} />
                <View style={styles.formRow}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <View style={styles.nameInputContainer}>
                    <TextInput style={styles.inputField} placeholder="Doctor" value={name} onChangeText={setName} />
                    <TextInput style={styles.inputFields} placeholder="" />
                  </View>
                </View>
                <View style={styles.divider} />

                <View style={styles.formRow}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={styles.fullWidthInput}
                    placeholder="Example@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                </View>
                <View style={styles.divider} />

                <View style={styles.formRow}>
                  <Text style={styles.inputLabel}>Contact No</Text>
                  <TextInput
                    style={styles.inputField}
                    placeholder="9874563210"
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                </View>
                <View style={styles.divider} />

                <View style={styles.formRow}>
                  <Text style={styles.inputLabel}>Age</Text>
                  <TextInput
                    style={styles.inputField}
                    placeholder="x"
                    value={age}
                    onChangeText={handleAgeChange}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </View>
                <View style={styles.divider} />

                <View style={styles.formRow}>
                  <Text style={styles.inputLabel}>Gender</Text>
                  <TextInput style={styles.inputField} placeholder="" value={gender} onChangeText={setGender} />
                </View>
                <View style={styles.divider} />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  parent: {
    flex: 1,
    flexDirection: "row",
  },
  Left: {
    width: "15%",
    backgroundColor: "#FFF5F5",
  },
  Middle: {
    width: "15%",
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#F0F0F0",
  },
  Right: {
    flex: 1,
    backgroundColor: "#FDF4F4CF",
  },
  scrollContainer: {
    padding: 20,
  },
  contentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginTop: "3%",
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileSubtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 10,
  },
  profilePhotoContainer: {
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
    alignSelf: "flex-start",
  },
  profilePhotoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePhoto: {
    width: 78,
    height: 78,
    borderRadius: 39,
  },
  editIconContainer: {
    position: "absolute",
    left: 90,
    bottom:0,
  },
  
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    width: "20%",
  },
  nameInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  inputField: {
    height: 45,
    borderWidth: 1,
    borderColor: "#9B9A9A",
    borderRadius: 4,
    paddingHorizontal: "5%",
  },
  inputFields: {
    height: 45,
    borderWidth: 1,
    borderColor: "#9B9A9A",
    borderRadius: 4,
    paddingHorizontal: "5%",
    marginRight: "35%",
  },
  fullWidthInput: {
    height: 45,
    borderWidth: 1,
    borderColor: "#9B9A9A",
    borderRadius: 4,
    paddingHorizontal: "16%",
  },
})

export default ProfileSetting
