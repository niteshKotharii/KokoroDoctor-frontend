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

const NewDoctorMedicalReg = ({ navigation }) => {
  const [licenseNo, setLicenseNo] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [hospital, setHospital] = useState("");

  const [documents, setDocuments] = useState({
    medicalCouncil: null,
    degreeCertificate: null,
    govID: null,
  });

  const pickDocument = async (type) => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      setDocuments((prev) => ({
        ...prev,
        [type]: result.assets[0].name,
      }));
    }
  };

  const handleContinue = () => {
    const { medicalCouncil, degreeCertificate, govID } = documents;
    if (
      !licenseNo ||
      !specialization ||
      !experience ||
      !hospital ||
      !medicalCouncil ||
      !degreeCertificate ||
      !govID
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill all fields and upload all documents."
      );
      return;
    }
    navigation.navigate("NextScreen");
  };

  return (
    <View style={styles.wrapper}>
      {/* Left Nav */}
      <NewSideNav />

      {/* Right Panel */}
      <View style={styles.rightPanel}>
        <ScrollView contentContainerStyle={styles.formSection}>
          <Text style={styles.heading}>
            Hang On! Medical Registration Proof
          </Text>

          <Text style={styles.label}>Medical Council Registration Id</Text>
          {documents.medicalCouncil ? (
            <View style={styles.uploadedContainer}>
              <Text style={styles.uploadedText}>Document Uploaded</Text>
              <AntDesign name="checkcircle" size={20} color="green" />
              <Ionicons name="document" size={30} color="#cb6a6a" />
              {/* <Text style={styles.pdfText}>PDF</Text> */}
            </View>
          ) : (
            <View style={styles.browseRow}>
              <Text style={styles.text}>
                Please upload document for verification
              </Text>
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => pickDocument("medicalCouncil")}
              >
                <AntDesign name="cloudupload" size={22} color="#ff5d73" />
                <Text style={styles.uploadText}>Browse File</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.label}>Degree Certificate</Text>
          {documents.degreeCertificate ? (
            <View style={styles.uploadedContainer}>
              <Text style={styles.uploadedText}>Document Uploaded</Text>
              <AntDesign name="checkcircle" size={20} color="green" />
              <Ionicons name="document" size={30} color="#cb6a6a" />
              {/* <Text style={styles.pdfText}>PDF</Text> */}
            </View>
          ) : (
            <View style={styles.browseRow}>
              <Text style={styles.text}>
                Please upload document for verification
              </Text>
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => pickDocument("degreeCertificate")}
              >
                <AntDesign name="cloudupload" size={22} color="#ff5d73" />
                <Text style={styles.uploadText}>Browse File</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.label}>Government ID Proof</Text>
          {documents.govID ? (
            <View style={styles.uploadedContainer}>
              <Text style={styles.uploadedText}>Document Uploaded</Text>
              <AntDesign name="checkcircle" size={20} color="green" />
              <Ionicons name="document" size={30} color="#cb6a6a" />
              {/* <Text style={styles.pdfText}>PDF</Text> */}
            </View>
          ) : (
            <View style={styles.browseRow}>
              <Text style={styles.text}>
                Please upload document for verification
              </Text>
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => pickDocument("govID")}
              >
                <AntDesign name="cloudupload" size={22} color="#ff5d73" />
                <Text style={styles.uploadText}>Browse File</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Buttons */}
          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
            <Text style={styles.continueText}>Continue</Text>
            <View style={styles.iconCon}>
              <Ionicons name="arrow-forward" size={20} color="red" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => navigation.navigate("EstablishmentTiming")}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </ScrollView>

        <SideImageStyle />
      </View>
    </View>
  );
};

export default NewDoctorMedicalReg;

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
    marginBottom: 32,
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
    marginBottom: 16,
    width: "34%",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    flex: 1,
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
    marginBottom: 16,
    width: "34%",
    gap: 8,
  },
  uploadedText: {
    fontSize: 12,
    fontWeight: "500",
    color: "green",
  },
  pdfText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#cb6a6a",
    marginLeft: 4,
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
    height: "8%",
    marginBottom: 20,
    marginTop: 35,
    justifyContent: "center",
    overflow: "hidden",
  },
  continueText: {
    color: "white",
    fontWeight: "bold",
    paddingLeft: 45,
  },
  iconCon: {
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
  skipBtn: {
    backgroundColor: "#23c16b",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    width: "15%",
    marginLeft: "3%",
    height: "8%",
    marginTop: 10,
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
