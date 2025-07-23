import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";

const { width, height } = Dimensions.get("window");

const PrivacyPolicy = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const [selectedButton, setSelectedButton] = useState(null);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <ScrollView
            style={styles.textBox}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false} // hides scrollbar
          >
            <View style={styles.textHeader}>
              <Text style={styles.header}>Kokoro.doctor Privacy Policy</Text>
              <Text style={styles.welcomeTitle}>Welcome</Text>
              <Text style={styles.insertDateText}>
                Effective Date: [Insert Date]
              </Text>
              <Text style={styles.insertDateText}>
                Last Updated: [Insert Date]
              </Text>
            </View>
            <View style={styles.mainText}>
              <Text style={styles.policyText}>
                {"\u2022"} At Kokoro.Doctor, your trust is our greatest asset.
                As a digital healthcare platform committed to advancing cardiac
                wellness and holistic well-being, we understand the importance
                of securing personal and sensitive medical information. This
                Privacy Policy aims to clearly explain how your data is
                collected, used, stored, and protected, and outlines the choices
                and rights available to you. We strive to maintain full
                transparency and compliance with global data protection laws
              </Text>

              <Text style={styles.policyText}>{"\n"}1. Who We Are</Text>

              <Text style={styles.policyText}>
                {"\u2022"} Kokoro.Doctor is a comprehensive healthcare platform
                that allows users to:
                {"\n"}
                {"      "}
                {"\u2022"} Connect with verified and licensed medical
                professionals
                {"\n"}
                {"      "}
                {"\u2022"} Schedule video or audio consultations
                {"\n"}
                {"      "}
                {"\u2022"} Upload and manage health documents via "Medilocker"
                {"\n"}
                {"      "}
                {"\u2022"} Use emergency features such as the SOS button
                {"\n"}
                {"      "}
                {"\u2022"} Receive timely insights and recommendations based on
                medical history
              </Text>
              <Text style={styles.policyText}>
                {"\u2022"} The platform is available via mobile and web
                applications and is supported by HIPAA-compliant cloud
                infrastructure.
              </Text>

              <Text style={styles.policyText}>
                {"\n"}2. What Data We Collect
              </Text>

              <Text style={styles.policyText}>
                {"\u2022"} We collect various categories of data to deliver our
                services efficiently and safely:{"\n"}
                {"\u2022"} a. Personal Information
                {"\n"}
                {"      "}
                {"\u2022"} Full name, gender, date of birth
                {"\n"}
                {"      "}
                {"\u2022"} Contact details: phone number, email address
                {"\n"}
                {"      "}
                {"\u2022"} Location data (used only with your permission, e.g.,
                for emergency routing or hospital discovery)
                {"\n"}
                {"\u2022"} b. Health and Medical Information{"\n"}
                {"      "}
                {"\u2022"} Medical history, symptoms, lifestyle information
                {"\n"}
                {"      "}
                {"\u2022"} Uploaded reports (ECG, prescriptions, blood tests,
                imaging reports, etc.){"\n"}
                {"      "}
                {"\u2022"} Doctor consultation summaries, prescriptions, and
                chat transcripts{"\n"}
                {"      "}
                {"\u2022"} Vitals such as heart rate, blood pressure, glucose
                levels (if entered manually or synced via devices){"\n"}
                {"\u2022"} c. Account and Usage Information{"\n"}
                {"      "}
                {"\u2022"} Login credentials (email or phone + password){"\n"}
                {"      "}
                {"\u2022"} Subscription type and history (basic, premium,
                emergency add-ons){"\n"}
                {"      "}
                {"\u2022"} SOS activity logs{"\n"}
                {"      "}
                {"\u2022"} App usage logs: device details, crash logs, OS
                information{"\n"}
                {"\u2022"} d. Payment Information{"\n"}
                {"      "}
                {"\u2022"} No credit card or banking details are stored on our
                servers{"\n"}
                {"      "}
                {"\u2022"} All payments are securely handled by Apple In-App
                Purchases, Google Play Billing, or compliant third-party payment
                gateways.{"\n"}
                {"\n"} 3. Medilocker: Data Ownership and Usage
                {"\n"}
                {"      "}
                {"\u2022"} Medilocker is our health record vault, where users
                can upload their personal medical documents.
                {"\n"}
                {"      "}
                {"\u2022"} By using Medilocker, you:
                {"\n"}
                {"      "}
                {"      "}
                {"\u2022"} Retain full ownership of your personal health data
                {"\n"}
                {"      "}
                {"      "}
                {"\u2022"} Provide explicit consent to Kokoro.Doctor to process
                and analyze this data for improving your care
                {"\n"}
                {"      "}
                {"\u2022"} Use of Uploaded Data: {"\n"}
                {"      "}
                {"\u2022"} We may use your uploaded health data (after
                de-identification) for: {"\n"}
                {"      "}
                {"\u2022"} Clinical research and algorithm development {"\n"}
                {"      "}
                {"\u2022"} Health insights and diagnostics improvements {"\n"}
                {"      "}
                {"\u2022"} Academic and public health partnerships (in
                anonymized format only) {"\n"}
                {"      "}
                {"\u2022"} You may withdraw your consent or delete data stored
                in Medilocker at any time. {"\n"}
                {"\n"} 4. How We Protect Your Data
                {"\n"}
                {"      "}
                {"\u2022"} We use modern, industry-standard security controls to
                protect your data:{"\n"}
                {"      "}
                {"\u2022"}Encryption: AES-256 for storage; TLS 1.3 for data
                transmission{"\n"}
                {"      "}
                {"\u2022"}Access Management: Strict role-based access controls
                for doctors and staff{"\n"}
                {"      "}
                {"\u2022"}Secure Infrastructure: Hosted on HIPAA,
                ISO27001-compliant data centers{"\n"}
                {"      "}
                {"\u2022"}Data Minimization: We only ask for data required for
                service delivery{"\n"}
                {"      "}
                {"\u2022"}Audit Trails: All access is logged and monitored{"\n"}
                {"      "}
                {"\u2022"}Regular Penetration Testing and Backups to prevent
                data loss or breach.{"\n"}
                {"\n"}5. How Your Data May Be Shared{"\n"}
                {"      "}
                {"\u2022"}Your data is not sold or used for advertising
                purposes. It may be shared under the following circumstances:
                {"\n"}
                {"      "}
                {"\u2022"}With doctors you explicitly consult via the platform
                {"\n"}
                {"      "}
                {"\u2022"}With emergency contacts (if you configure SOS alerts)
                {"\n"}
                {"      "}
                {"\u2022"}With law enforcement or government agencies under a
                lawful request{"\n"}
                {"      "}
                {"\u2022"}With anonymized datasets for machine learning and
                diagnostics{"\n"}
                {"      "}
                {"\u2022"}All data shared is traceable, logged, and governed by
                strict data-sharing policies.{"\n"}
                {"\n"}6. In-App Purchases and Billing{"\n"}
                {"      "}
                {"\u2022"}All digital health services (e.g., consultations,
                premium features, SOS support) must be paid via {"\n"}Apple
                In-App Purchase, Google Play, or approved payment gateways{"\n"}
                {"      "}
                {"\u2022"}We do not collect or store your credit/debit card or
                UPI credentials on our servers{"\n"}
                {"      "}
                {"\u2022"}Offline services (e.g., hospital admission, diagnostic
                lab visits) are billed separately by the healthcare provider
                {"\n"}
                {"\n"}7. Data Retention
                {"\n"}
                {"      "}
                {"\u2022"}We retain data for the period necessary to:{"\n"}
                {"      "}
                {"\u2022"}Provide you with uninterrupted healthcare support
                {"\n"}
                {"      "}
                {"\u2022"}Comply with legal obligations (such as record
                retention laws){"\n"}
                {"      "}
                {"\u2022"}Upon account deletion or inactivity, your data is
                retained for a maximum of 30 days unless longer retention is
                mandated by law. You can request early deletion by contacting
                us.{"\n"}
                {"\n"}8. Your Rights{"\n"}
                {"      "}
                {"\u2022"}You have the following rights with respect to your
                data:{"\n"}
                {"      "}
                {"\u2022"}We do not collect or store your credit/debit card or
                UPI credentials on our servers{"\n"}
                {"      "}
                {"\u2022"}Offline services (e.g., hospital admission, diagnostic
                lab visits) are billed separately by the healthcare provider
                {"\n"}
              </Text>
            </View>
          </ScrollView>

          <View style={styles.buttonBox}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedButton === "decline" && { backgroundColor: "black" },
              ]}
              onPress={() => setSelectedButton("decline")}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedButton === "decline" && { color: "white" },
                ]}
              >
                I Decline
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                selectedButton === "agree" && { backgroundColor: "black" },
              ]}
              onPress={() => {
                setSelectedButton("agree");
                navigation.navigate("Signup", { agreedToPolicy: true }); // <-- pass the checkbox value here
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedButton === "agree" && { color: "white" },
                ]}
              >
                I Agree
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/Images/PrivacyPolicy.png")}
            style={styles.image}
          />
        </View>
      </View>
    </>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100vh", // Use 100vh to ensure it takes full viewport height on web
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  textContainer: {
    flex: 1,
    maxWidth: "50%",
    height: "100%", // Explicitly set height to 100% of its parent (container)
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
  },
  textBox: {
    flex: 1, // This allows the ScrollView to take up the available space
    width: "95%",
    paddingRight: 10,
  },
  scrollContent: {
    flexGrow: 1, // Ensures content can grow and enables scrolling
    paddingBottom: 20,
  },
  textHeader: {
    width: "100%",
    paddingBottom: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555555",
    marginBottom: 5,
  },
  policyText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#444444",
    lineHeight: 22,
    marginBottom: 10,
  },
  insertDateText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#777777",
  },
  mainText: {
    width: "100%",
  },
  buttonBox: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  button: {
    height: 45,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: "#f5f5f5",
  },
  buttonSelected: {
    backgroundColor: "black",
    borderColor: "black",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444444",
  },
  buttonTextSelected: {
    color: "white",
  },
  imageContainer: {
    height: "50%",
    width: "30%",
    marginRight: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },

  //APP styles for mobile view
  appPrivacyContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "4%",
    paddingHorizontal: "4%",
  },
  appPrivacyTextSection: {
    flex: 1,
    width: "100%",
  },
  appPrivacyScrollBox: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
  },
  appPrivacyScrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  appPrivacyImageSection: {
    height: 200,
    width: 200,
    marginBottom: 24,
    alignSelf: "center",
    backgroundColor: "#f0f0f0",
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  appPrivacyImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  appPrivacyHeaderSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  appPrivacyHeader: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 5,
  },
  appPrivacyWelcome: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 22,
    alignSelf: "center",
    marginTop: 6,
    marginBottom: 4,
    color: "#333",
  },
  appPrivacyDate: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 12,
    alignSelf: "center",
    color: "#777777",
    marginTop: 4,
  },
  appPrivacyMainText: {
    paddingHorizontal: "5%",
    marginTop: "7%",
    fontFamily: "Poppins",
  },
  appPrivacyPolicyText: {
    fontSize: 14,
    color: "#444444",
    textAlign: "justify",
    fontWeight: "400",
    fontFamily: "Poppins",
    lineHeight: 22,
    marginBottom: 10,
  },
  appPolicyText: {
    fontSize: 14,
    color: "#444444",
    fontWeight: "400",
    fontFamily: "Poppins",
    lineHeight: 22,
    marginBottom: 8,
  },
  bulletText: {
    fontSize: 14,
    color: "#444444",
    textAlign: "justify",
    fontWeight: "400",
    fontFamily: "Poppins",
    flexShrink: 1,
    lineHeight: 22,
  },
  appPrivacyButtonSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  appPrivacyButton: {
    flex: 1,
    height: 44,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appPrivacyButtonSelected: {
    backgroundColor: "black",
    borderColor: "black",
  },
  appPrivacyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444444",
  },
  appPrivacyButtonTextSelected: {
    color: "white",
  },

  //APP styles for mobile view
  appPrivacyContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "4%",
    paddingHorizontal: "4%",
  },
  appPrivacyScrollBox: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
  },
  appPrivacyImageSection: {
    height: 200,
    width: 200,
    marginBottom: 24,
    alignSelf: "center",
    backgroundColor: "#f0f0f0",
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  appPrivacyImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  appPrivacyHeader: {
    font: "Poppins",
    weight: "500",
    height: 19,
    fontSize: 16,
    alignSelf: "center",
  },
  appPrivacyWelcome: {
    font: "Poppins",
    weight: "500",
    height: 19,
    fontSize: 16,
    alignSelf: "center",
    marginTop: 6,
    marginBottom: 4,
  },
  appPrivacyDate: {
    font: "Poppins",
    weight: "400",
    height: 16,
    fontSize: 12,
    alignSelf: "center",
    color: "#444444",
    marginTop: 4,
  },
  appPrivacyMainText: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "7%",
    font: "Poppins",
  },
  appPrivacyPolicyText: {
    fontSize: 14,
    color: "#444444",
    textAlign: "justify",
    weight: 400,
    font: "Poppins",
  },
  appPolicyText: {
    fontSize: 14,
    color: "#444444",
    weight: 400,
    font: "Poppins",
  },
  bulletText: {
    fontSize: 14,
    color: "#444444",
    textAlign: "justify",
    fontWeight: "400",
    fontFamily: "Poppins",
    marginLeft: 12,
    lineHeight: 22,
  },
  appPrivacyButtonSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderColor: "green",
  },
  appPrivacyButton: {
    width: 120,
    height: 44,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // for Android shadow
  },
});

export default PrivacyPolicy;