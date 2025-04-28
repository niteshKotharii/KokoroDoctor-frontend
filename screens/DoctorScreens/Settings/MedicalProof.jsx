import { useState } from "react"
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from "react-native"
import SideBarNavigation from "../../../components/DoctorsPortalComponents/NewestSidebar"
import SettingsNavigation from "../../../components/DoctorsPortalComponents/SettingsNavigation"
import HeaderNavigation from "../../../components/DoctorsPortalComponents/HeaderNavigation"

const MedicalProof = ({ navigation, route }) => {
  const handleBrowseFile = () => {
    // Add your file browsing logic here
    console.log("Browse file clicked");
  };

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
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.contentCard}>
              <Text style={styles.contentTitle}>Profile Setting</Text>
              <Text style={styles.profileSubtitle}>Manage your account settings</Text>
              <HeaderNavigation navigation={navigation} />
              <View style={styles.formContainer}>
                
                <View style={styles.divider} />

                <View style={styles.formRow}>
                  <Text style={styles.inputLabel}>Medical License No</Text>
                  <TextInput 
                    style={[styles.fullWidthInput]} 
                    placeholder="87965412325479+" 
                    keyboardType="default" 
                  />
                </View>
                <View style={styles.divider} />

                <View style={styles.formRow}>
                  <Text style={styles.inputLabel}>Specialization</Text>
                  <TextInput 
                    style={[styles.fullWidthInput]} 
                    placeholder="eg. Cardiologist" 
                    keyboardType="default" 
                  />
                </View>
                <View style={styles.divider} />

                <View style={styles.formRow}>
                  <Text style={styles.inputLabel}>Year of Experience</Text>
                  <TextInput 
                    style={[styles.fullWidthInput]} 
                    placeholder="15" 
                    keyboardType="numeric" 
                  />
                </View>
                <View style={styles.divider} />

                <View style={styles.formRow}>
                  <Text style={styles.inputLabel}>Affiliated Hospital</Text>
                  <TextInput 
                    style={[styles.fullWidthInput]} 
                    placeholder="Aiims" 
                    keyboardType="default" 
                  />
                </View>
                <View style={styles.divider} />

                <View style={styles.formRow}>
                  <Text style={styles.inputLabel}>Medical Registration{"\n"}Council Id</Text>
                  <View style={styles.fileUploadContainer}>
                    <TextInput 
                      style={[styles.fileInputField]} 
                      placeholder="9878456874563210" 
                      keyboardType="default" 
                    />
                    <View style={styles.photoContainer}>
                      <View style={styles.uploadButtonContainer}>
                        <TouchableOpacity 
                          style={styles.uploadButton}
                          onPress={handleBrowseFile}
                        >
                          <View style={styles.uploadIconContainer}>
                            <Image 
                              source={require("../../../assets/DoctorsPortal/Icons/upload.png")} 
                              style={styles.uploadIcon} 
                            />
                          </View>
                          <View style={styles.browseTextContainer}>
                            <Text style={styles.browseText}>Browse File</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.divider} />

                <View style={styles.formRow}>
                  <Text style={styles.inputLabel}>Degree Certificate</Text>
                  <View style={styles.fileUploadContainer}>
                    <TextInput 
                      style={[styles.fileInputField]} 
                      placeholder="9878456874563210" 
                      keyboardType="default" 
                    />
                    <View style={styles.photoContainer}>
                      <View style={styles.uploadButtonContainer}>
                        <TouchableOpacity 
                          style={styles.uploadButton}
                          onPress={handleBrowseFile}
                        >
                          <View style={styles.uploadIconContainer}>
                            <Image 
                              source={require("../../../assets/DoctorsPortal/Icons/upload.png")} 
                              style={styles.uploadIcon} 
                            />
                          </View>
                          <View style={styles.browseTextContainer}>
                            <Text style={styles.browseText}>Browse File</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.divider} />

                <View style={styles.formRow}>
                  <Text style={styles.inputLabel}>Government Id {"\n"}Proof</Text>
                  <View style={styles.fileUploadContainer}>
                  <TextInput style={styles.fileInputField} placeholder="9878456874563210" keyboardType="default" />
                    <View style={styles.photoContainer}>
                      <View style={styles.uploadButtonContainer}>
                        <TouchableOpacity 
                          style={styles.uploadButton}
                          onPress={handleBrowseFile}
                        >
                          <View style={styles.uploadIconContainer}>
                            <Image 
                              source={require("../../../assets/DoctorsPortal/Icons/upload.png")} 
                              style={styles.uploadIcon} 
                            />
                          </View>
                          <View style={styles.browseTextContainer}>
                            <Text style={styles.browseText}>Browse File</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
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
    flexGrow: 1,
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
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    width: "100%",
    marginVertical: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    width: "20%",
    marginRight: 10,
  },
  fullWidthInput: {
    height: 45,
    borderWidth: 1,
    borderColor: "#9B9A9A",
    borderRadius: 4,
    paddingHorizontal: "5%",
  },
  fileUploadContainer: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
  },
  fileInputField: {
    height: 45,
    borderWidth: 1,
    borderColor: "#9B9A9A",
    borderRadius: 4,
    paddingHorizontal: "5%",
  
  },
  browseFileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  browseButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  browseButtonText: {
    color: "#333",
    fontSize: 14,
  },
  photoContainer: {
    width: '100%',
  },
  uploadButtonContainer: {
    width: "60%", 
    marginLeft: 30, 
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#9B9A9A",
    borderStyle: "dashed",
    borderRadius: 4,
    paddingVertical: 7,
    paddingHorizontal: "3%",
    width: "55%",
  },
  uploadIconContainer: {
    marginRight: 10,
  },
  browseTextContainer: {
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  browseText: {
    color: "#333333",
    fontSize: 14,
  },
})

export default MedicalProof;