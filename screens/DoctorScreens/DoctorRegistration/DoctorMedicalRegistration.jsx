import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import NewSideNav from "../../../components/DoctorsPortalComponents/NewSideNav";
import SideImageStyle from "../../../components/DoctorsPortalComponents/SideImageStyle";

const DoctorMedicalRegistration = ({ navigation }) => {
  const [licenseNo, setLicenseNo] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [hospital, setHospital] = useState("");
  const [fileName, setFileName] = useState("");

  const [formData, setFormData] = useState({
    licenseNo: "",
    experience: "",
    hospital: "",
  });
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      setFileName(result.assets[0].name);
    }
  };

  const handleContinue = () => {
    if (!licenseNo || !hospital || !fileName) {
      Alert.alert(
        "Missing Information",
        "Please fill all fields and upload the document."
      );
      return;
    }
    navigation.navigate("NewDoctorMedicalReg"); // Replace this
  };

  return (
    <View style={styles.wrapper}>
      {/* Left Nav */}
      <NewSideNav />

      {/* Right Side (85%) */}
      <View style={styles.rightPanel}>
        {/* Form Area (85% of Right) */}
        <ScrollView contentContainerStyle={styles.formSection}>
          <Text style={styles.heading}>
            Hang On! Medical Registration Proof
          </Text>

          <Text style={styles.label}>Medical License no</Text>
          <TextInput
            placeholder="Enter number"
            placeholderTextColor="#c0c0c0"
            keyboardType="phone-pad"
            style={[
              styles.input,
              { color: formData.licenseNo ? "black" : "#c0c0c0" },
            ]}
            value={formData.licenseNo}
            onChangeText={(val) => handleChange("licenseNo", val)}
          />

          {/* Upload */}
          {fileName ? (
            <View style={styles.uploadedContainer}>
              <Text style={styles.uploadedText}>Document Uploaded</Text>
              <AntDesign name="checkcircle" size={20} color="green" />
              <Ionicons name="document" size={30} color="#cb6a6a" />
              <Text style={styles.pdfText}>PDF</Text>
            </View>
          ) : (
            <View style={styles.browseRow}>
              <Text style={styles.text}>
                Please upload document for verification
              </Text>
              <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
                <AntDesign name="cloudupload" size={22} color="#ff5d73" />
                <Text style={styles.uploadText}>Browse File</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.label}>Specialization</Text>
          <TouchableOpacity style={styles.dropdownBox}>
            <Text style={styles.dropdownText}>
              {specialization || "Cardiologist"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#777" />
          </TouchableOpacity>

          {/* Year of Experience Dropdown */}
          <Text style={styles.label}>Year of Experience</Text>
          {/* <TouchableOpacity style={styles.dropdownBox}>
            <Text style={styles.dropdownText}>{experience || "22"}</Text>
            <Ionicons name="chevron-down" size={20} color="#777" />
          </TouchableOpacity> */}
          <TextInput
            placeholder="Enter year..."
            placeholderTextColor="#c0c0c0"
            keyboardType="phone-pad"
            style={[
              styles.input,
              { color: formData.experience ? "black" : "#c0c0c0" },
            ]}
            value={formData.experience}
            onChangeText={(val) => handleChange("experience", val)}
          />

          <Text style={styles.label}>Affiliated Hospital/Clinic</Text>
          {/* <TextInput
            style={styles.input}
            placeholder="lorem ipsum"
            value={hospital}
            onChangeText={setHospital}
          /> */}
          <TextInput
            placeholder="Enter name..."
            placeholderTextColor="#c0c0c0"
            style={[
              styles.input,
              { color: formData.hospital ? "black" : "#c0c0c0" },
            ]}
            value={formData.hospital}
            onChangeText={(val) => handleChange("hospital", val)}
          />

          {/* Buttons */}
          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
            <Text style={styles.continueText}>Continue</Text>
            <View style={styles.iconCon}>
              <Ionicons name="arrow-forward" size={20} color="red" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => navigation.navigate("NewDoctorMedicalReg")}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Image Stack (15% of Right Panel) */}
        <SideImageStyle />
      </View>
    </View>
  );
};

export default DoctorMedicalRegistration;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    backgroundColor: "#FCF5F7",
  },
  rightPanel: {
    width: "85%",
    flexDirection: "row",
    backgroundColor: "#FCF5F7",
  },
  formSection: {
    width: "85%",
    paddingLeft: "5%",
    paddingTop: "6%",
    paddingRight: 20,
  },
  heading: {
    marginTop: "6%",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    width: "34%",
  },
  browseRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
    marginBottom: 16,
    width: "34%",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#9B9A9A",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  uploadText: {
    color: "#333",
    backgroundColor: "#FBF5F6",
    borderWidth: 1,
    borderColor: "#cb6a6a",
    paddingHorizontal: 8,
    marginLeft: 6,
    fontSize: 13,
  },
  uploadedContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  uploadedText: {
    fontSize: 12,
    fontWeight: "500",
  },
  pdfText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#cb6a6a",
  },
  continueBtn: {
    flexDirection: "row",
    backgroundColor: "#ff5d73",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    elevation: 2,
    width: "25%",
    height: "6%",
    marginBottom: 20,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  continueText: {
    color: "white",
    fontWeight: "bold",
  },
  iconCon: {
    marginLeft: "10%",
    width: 34,
    height: 34,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    marginLeft: "35%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  // continueBtn: {
  //   flexDirection: "row",
  //   backgroundColor: "#ff5d73",
  //   paddingVertical: 12,
  //   paddingHorizontal: 24,
  //   borderRadius: 30,
  //   alignItems: "center",
  //   elevation: 2,
  //   width: "25%",
  //   marginTop: 10,
  //   marginBottom: 16,
  // },
  // continueText: {
  //   color: "white",
  //   fontWeight: "bold",
  // },
  // iconCon: {
  //   marginLeft: "auto",
  //   width: 34,
  //   height: 34,
  //   backgroundColor: "white",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 17,
  //   elevation: 3,
  //   marginLeft: 20,
  // },
  skipBtn: {
    backgroundColor: "#23c16b",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    width: "15%",
    marginLeft: "3%",
  },
  skipText: {
    color: "white",
    fontWeight: "bold",
  },
  dropdownBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: "34%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
  },
});

// specialization ||
//  experience ||
