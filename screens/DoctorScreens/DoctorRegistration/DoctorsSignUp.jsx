import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import NewSideNav from "../../../components/DoctorsPortalComponents/NewSideNav";
import { useNavigation } from "@react-navigation/native";
import SideImageStyle from "../../../components/DoctorsPortalComponents/SideImageStyle";

const DoctorsLogin = () => {
  const navigation = useNavigation();
  const generatedOTP = "1234";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    phone: "",
    otp: ["", "", "", ""],
  });

  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // const handleOTPChange = (index, value) => {
  //   const updatedOTP = [...formData.otp];
  //   updatedOTP[index] = value;
  //   setFormData((prev) => ({ ...prev, otp: updatedOTP }));
  // };
  // const handleContinue = () => {
  //   const enteredOTP = formData.otp.join("");
  //   if (enteredOTP === generatedOTP) {
  //     setOtpVerified(true);
  //     navigation.navigate("DoctorMedicalRegistration")
  //   } else {
  //     setOtpVerified(false);
  //     alert("Invalid OTP. Please try again.");
  //   }
  // };

  return (
    <View style={styles.container}>
      <NewSideNav navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.detail_container}>
          <Text style={styles.heading}>
            Hello! Let's build your dedicated profile
          </Text>
          <View style={styles.details}>
            <Text style={styles.inputHeading}>Name</Text>
            <TextInput
              placeholder="Enter your name..."
              style={styles.inputContainer}
              value={formData.name}
              onChangeText={(val) => handleChange("name", val)}
            />
            <Text style={styles.inputHeading}>Email Id</Text>
            <TextInput
              placeholder="Enter your email..."
              style={styles.inputContainer}
              value={formData.email}
              onChangeText={(val) => handleChange("email", val)}
            />
            <Text style={styles.inputHeading}>Establishment Location</Text>
            <TextInput
              placeholder="Enter your location..."
              style={styles.inputContainer}
              value={formData.location}
              onChangeText={(val) => handleChange("location", val)}
            />
            <Text style={styles.inputHeading}>Phone No</Text>
            <TextInput
              placeholder="Enter your phone number..."
              keyboardType="phone-pad"
              style={styles.inputContainer}
              value={formData.phone}
              onChangeText={(val) => handleChange("phone", val)}
            />

            <Text style={styles.note}>
              Note: OTP will be sent to this number for verification.
            </Text>

            <TouchableOpacity
              style={styles.otpContainer}
              onPress={() => setShowOTPInput(true)}
            >
              <Text style={styles.otpText}>Send OTP</Text>
            </TouchableOpacity>

            {/* {showOTPInput && (
                            <View style={styles.otpInputContainer}>
                                {formData.otp.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        style={styles.otpInput}
                                        maxLength={1}
                                        keyboardType="number-pad"
                                        value={digit}
                                        onChangeText={(val) => handleOTPChange(index, val)}
                                    />
                                ))}
                            </View>
                        )} */}
            {showOTPInput &&
              (otpVerified ? (
                <View style={styles.verificationContainer}>
                  <Image
                    source={require("../../../assets/DoctorsPortal/Icons/greenTick.png")}
                  />
                  <Text
                    style={{ fontSize: 18, color: "black", fontWeight: "bold" }}
                  >
                    Verified phone no
                  </Text>
                </View>
              ) : (
                <View style={styles.otpInputContainer}>
                  {formData.otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      style={styles.otpInput}
                      maxLength={1}
                      keyboardType="number-pad"
                      value={digit}
                      onChangeText={(val) => handleOTPChange(index, val)}
                    />
                  ))}
                </View>
              ))}

            <TouchableOpacity
              style={styles.continueContainer}
              // onPress={handleContinue}
              onPress={() => navigation.navigate("DoctorMedicalRegistration")}
            >
              <Text style={styles.continueText}>Continue</Text>
              <Image
                style={styles.arrowIcon}
                source={require("../../../assets/DoctorsPortal/Icons/ArrowIcon.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SideImageStyle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  content: {
    width: "65%",
    height: "100%",
    backgroundColor: "#FCF5F7",
    overflow: "hidden",
    flexDirection: "row",
  },
  detail_container: {
    width: "80%",
    height: "100%",
    paddingTop: "5%",
    paddingLeft: "5%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 20,
  },
  details: {
    width: "60%",
    gap: 10,
  },
  inputHeading: {
    fontSize: 16,
    marginTop: "2%",
  },
  inputContainer: {
    width: "70%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  note: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: "3%",
  },
  otpContainer: {
    width: "70%",
    height: 45,
    marginTop: "2%",
    backgroundColor: "#1FBF86",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    shadowColor: "#00000040",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  otpText: {
    color: "white",
    fontWeight: "bold",
  },
  otpInputContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  verificationContainer: {
    flexDirection: "row",
    marginTop: "5%",
    alignItems: "center",
  },
  continueContainer: {
    marginLeft: "10%",
    width: "40%",
    height: 40,
    marginTop: "10%",
    backgroundColor: "#FF7072",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    gap: 20,
    shadowColor: "#00000040",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  continueText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  arrowIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    backgroundColor: "white",
    borderRadius: 12.5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DoctorsLogin;
