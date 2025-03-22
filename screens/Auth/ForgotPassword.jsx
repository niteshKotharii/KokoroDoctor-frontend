import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Alert,
} from "react-native";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  // Validate phone number
  const validatePhoneNumber = (number) => {
    setPhoneNumber(number);
    // Check if phone number is at least 10 digits
    setIsPhoneValid(number.length >= 1);
  };

  const handleSendOTP = () => {
    if (email.trim() === "" && phoneNumber.trim() === "") {
      alert("Error", "Please enter either an email or a phone number");
      return;
    }

    if (phoneNumber && !isPhoneValid) {
      alert("Error Please enter a valid phone number with at least 10 digits");
      return;
    }

    // Add your OTP sending logic here
    setOtpSent(true);
  };

  const handleVerifyOTP = () => {
    // Check if all OTP digits are filled
    const isOtpComplete = otp.every((digit) => digit !== "");

    if (!isOtpComplete) {
      alert("Error Please enter the complete OTP");
      return;
    }

    // Add your OTP verification logic here
    navigation.navigate("ResetPassword");
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if current input is filled
    if (value !== "" && index < otp.length - 1) {
      // Focus next input (requires refs which would need to be added)
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.mainContainer}>
        {/* Left side with background image - 40% */}
        <View style={styles.leftContainer}>
          <ImageBackground
            source={require("../../assets/Images/login-background.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <Text style={styles.quoteText}>
              "Nurture Your Heart. It Will Nurture You."
            </Text>
          </ImageBackground>
        </View>

        {/* Rectangular divider */}
        <View style={styles.divider} />

        {/* Right side with forgot password form - 60% */}
        <View style={styles.rightContainer}>
          <View style={styles.mainright}>
            <Text style={styles.title}>Forget Password ?</Text>
            <Text style={styles.subtitle}>No worries Reset Password</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Enter Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.orLine} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Enter Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Phone no"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={validatePhoneNumber}
                maxLength={15} // Allow for country codes
              />
            </View>

            <Text style={styles.otpInfoText}>We'll send you OTP</Text>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleSendOTP}
            >
              <Text style={styles.continueButtonText}>Send OTP</Text>
            </TouchableOpacity>

            {otpSent && (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Enter OTP</Text>
                  <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                      <TextInput
                        key={index}
                        style={styles.otpInput}
                        value={digit}
                        onChangeText={(value) => handleOtpChange(value, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                      />
                    ))}
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.verifyButton}
                  onPress={handleVerifyOTP}
                >
                  <Text style={styles.continueButtonText}>Verify OTP</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
  leftContainer: {
    width: "40%", // Changed from 50% to 40% to match the Login component
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  quoteText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 30,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    width: "80%",
  },
  divider: {
    width: "0.15%", // Changed from 0.2% to 0.15% to match the Login component
    height: "100%",
    backgroundColor: "#EEEEEE",
  },
  rightContainer: {
    width: "60%", // Changed to explicit 60% width from flex: 1
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: "5%", // Standardized padding to match Login component
  },
  mainright: {
    width: "65%",
    margin: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: "1%",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: "4%",
  },
  inputContainer: {
    marginBottom: "3%", // Standardized with Login component
    width: "100%", // Changed from 90% to 100% to match Login
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: "1%",
    fontWeight: "500",
  },
  input: {
    height: 50,
    minHeight: 48, // Added to match Login component
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4, // Changed from 8 to 4 to match Login
    paddingHorizontal: "3%", // Standardized with Login component
    fontSize: 14,
    width: "100%", // Made explicit
  },
  otpInfoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: "2%",
  },
  continueButton: {
    backgroundColor: "#10B981",
    width: "100%", // Changed from 90% to 100% to match Login
    height: 50,
    minHeight: 48, // Added to match Login component
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4, // Changed from 8 to 4 to match Login
    marginBottom: "3%", // Standardized with Login
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%", // Changed from 90% to 100% to match Login
    marginVertical: "3%", // Standardized with Login component
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDD",
  },
  orText: {
    fontSize: 14,
    color: "#666",
    paddingHorizontal: "2%", // Standardized with Login component
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginTop: "2%",
  },
  otpInput: {
    width: "20%",
    height: 40,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4, // Changed from no explicit value to 4 to match Login
    textAlign: "center",
    fontSize: 16,
    marginRight: "5%",
  },
  verifyButton: {
    backgroundColor: "#000000",
    width: "100%", // Changed from 90% to 100% to match Login
    height: 50,
    minHeight: 48, // Added to match Login component
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4, // Changed from 8 to 4 to match Login
    marginTop: "3%",
    marginBottom: "2%",
  },
});

export default ForgotPassword;