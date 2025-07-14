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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //borderWidth: 3,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textContainer: {
    height: "85%",
    width: "50%",
    //borderWidth: 1,
    //marginBottom:"2%"
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
  },
  textBox: {
    height: "85%",
    width: "95%",
    borderColor: "blue",
    //borderWidth: 1,
  },
  textHeader: {
    height: "5%",
    width: "40%",
    //borderWidth: 1,
  },
  header: {
    fontSize: 16,
    fontWeight: 500,
    color: "#444444",
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 500,
  },
  policyText: {
    fontSize: 16,
    fontWeight: 400,
  },
  insertDateText: {
    fontSize: 12,
    fontWeight: 400,
    color: "#444444",
    //marginVertical:"4%"
  },
  mainText: {
    height: "100%",
    width: "100%",
    //borderWidth: 2,
    borderColor: "red",
  },
  scrollContainer: {},
  buttonBox: {
    height: "10%",
    width: "95%",
    borderColor: "green",
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    height: "43%",
    width: "20%",
    //borderWidth:1,
    alignItems: "center",
    borderRadius: 5,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
  },
  imageContainer: {
    height: "50%",
    width: "20%",
    //borderWidth: 1,
    borderColor: "red",
    marginBottom: "10%",
    marginRight: "10%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default PrivacyPolicy;
