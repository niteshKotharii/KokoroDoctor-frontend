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

  const BulletItem = ({ children }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 0,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: "#444444",
          fontFamily: "Poppins",
          marginRight: 8,
        }}
      >
        {"\u2022"}
      </Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );

  return (
    <>
      {Platform.OS === "web" && width > 1000 && (
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
                {/* Main introductory paragraph - Using template literal for multi-line */}
                <Text style={styles.policyText}>
                  At Kokoro.Doctor, your trust is our greatest asset.
                  As a digital healthcare platform committed to advancing cardiac
                  wellness and holistic well-being, we understand the importance
                  of securing personal and sensitive medical information. This
                  Privacy Policy aims to clearly explain how your data is
                  collected, used, stored, and protected, and outlines the choices
                  and rights available to you. We strive to maintain full
                  transparency and compliance with global data protection laws
                </Text>
                <Text style={styles.policyText}>{"\n"}1. Who We Are</Text>
                {/* Section 1 list - Using BulletItem component */}
                <Text style={styles.policyText}>
                  Kokoro.Doctor is a comprehensive healthcare platform
                  that allows users to:
                </Text>
                <BulletItem>
                  Connect with verified and licensed medical professionals
                </BulletItem>
                <BulletItem>Schedule video or audio consultations</BulletItem>
                <BulletItem>
                  Upload and manage health documents via "Medilocker"
                </BulletItem>
                <BulletItem>
                  Use emergency features such as the SOS button
                </BulletItem>
                <BulletItem>
                  Receive timely insights and recommendations based on medical
                  history
                </BulletItem>
                <Text style={styles.policyText}>
                  The platform is available via mobile and web
                  applications and is supported by HIPAA-compliant cloud
                  infrastructure.
                </Text>
                <Text style={styles.policyText}>
                  {"\n"}2. What Data We Collect
                </Text>
                <Text style={styles.policyText}>
                  We collect various categories of data to deliver our
                  services efficiently and safely:
                </Text>
                <Text style={styles.policyText}>a. Personal Information</Text>
                <BulletItem>Full name, gender, date of birth</BulletItem>
                <BulletItem>
                  Contact details: phone number, email address
                </BulletItem>
                <BulletItem>
                  Location data (used only with your permission, e.g., for
                  emergency routing or hospital discovery)
                </BulletItem>
                <Text style={styles.policyText}>
                  b. Health and Medical Information
                </Text>
                <BulletItem>
                  Medical history, symptoms, lifestyle information
                </BulletItem>
                <BulletItem>
                  Uploaded reports (ECG, prescriptions, blood tests, imaging
                  reports, etc.)
                </BulletItem>
                <BulletItem>
                  Doctor consultation summaries, prescriptions, and chat
                  transcripts
                </BulletItem>
                <BulletItem>
                  Vitals such as heart rate, blood pressure, glucose levels (if
                  entered manually or synced via devices)
                </BulletItem>
                <Text style={styles.policyText}>
                  c. Account and Usage Information
                </Text>
                <BulletItem>
                  Login credentials (email or phone + password)
                </BulletItem>
                <BulletItem>
                  Subscription type and history (basic, premium, emergency
                  add-ons)
                </BulletItem>
                <BulletItem>SOS activity logs</BulletItem>
                <BulletItem>
                  App usage logs: device details, crash logs, OS information
                </BulletItem>
                <Text style={styles.policyText}>d. Payment Information</Text>
                <BulletItem>
                  No credit card or banking details are stored on our servers
                </BulletItem>
                <BulletItem>
                  All payments are securely handled by Apple In-App Purchases,
                  Google Play Billing, or compliant third-party payment
                  gateways.
                </BulletItem>
                <View style={{ marginVertical: 10 }} />
                <Text style={styles.policyText}>
                  {"\n"}3. Medilocker: Data Ownership and Usage
                </Text>
                <Text style={styles.policyText}>
                  Medilocker is our health record vault, where users
                  can upload their personal medical documents.
                </Text>
                <Text style={styles.policyText}>By using Medilocker, you:</Text>
                <BulletItem>
                  Retain full ownership of your personal health data
                </BulletItem>
                <BulletItem>
                  Provide explicit consent to Kokoro.Doctor to process and
                  analyze this data for improving your care
                </BulletItem>
                <Text style={styles.policyText}>Use of Uploaded Data:</Text>
                <BulletItem>
                  We may use your uploaded health data (after de-identification)
                  for:
                </BulletItem>
                <BulletItem level={1}>
                  Clinical research and algorithm development
                </BulletItem>
                <BulletItem level={1}>
                  Health insights and diagnostics improvements
                </BulletItem>
                <BulletItem level={1}>
                  Academic and public health partnerships (in anonymized format
                  only)
                </BulletItem>
                <BulletItem>
                  You may withdraw your consent or delete data stored in
                  Medilocker at any time.
                </BulletItem>
                <View style={{ marginVertical: 10 }} />
                <Text style={styles.policyText}>
                  {"\n"}4. How We Protect Your Data
                </Text>
                <Text style={styles.policyText}>
                  We use modern, industry-standard security controls to
                  protect your data:
                </Text>
                <BulletItem>
                  Encryption: AES-256 for storage; TLS 1.3 for data transmission
                </BulletItem>
                <BulletItem>
                  Access Management: Strict role-based access controls for
                  doctors and staff
                </BulletItem>
                <BulletItem>
                  Secure Infrastructure: Hosted on HIPAA, ISO27001-compliant
                  data centers
                </BulletItem>
                <BulletItem>
                  Data Minimization: We only ask for data required for service
                  delivery
                </BulletItem>
                <BulletItem>
                  Audit Trails: All access is logged and monitored
                </BulletItem>
                <BulletItem>
                  Regular Penetration Testing and Backups to prevent data loss
                  or breach.
                </BulletItem>
                <View style={{ marginVertical: 10 }} />
                <Text style={styles.policyText}>
                  {"\n"}5. How Your Data May Be Shared
                </Text>
                <Text style={styles.policyText}>
                  Your data is not sold or used for advertising
                  purposes. It may be shared under the following circumstances:
                </Text>
                <BulletItem>
                  With doctors you explicitly consult via the platform
                </BulletItem>
                <BulletItem>
                  With emergency contacts (if you configure SOS alerts)
                </BulletItem>
                <BulletItem>
                  With law enforcement or government agencies under a lawful
                  request
                </BulletItem>
                <BulletItem>
                  With anonymized datasets for machine learning and diagnostics
                </BulletItem>
                <BulletItem>
                  All data shared is traceable, logged, and governed by strict
                  data-sharing policies.
                </BulletItem>
                <View style={{ marginVertical: 10 }} />
                <Text style={styles.policyText}>
                  {"\n"}6. In-App Purchases and Billing
                </Text>
                <BulletItem>
                  All digital health services (e.g., consultations, premium
                  features, SOS support) must be paid via Apple In-App Purchase,
                  Google Play, or approved payment gateways
                </BulletItem>
                <BulletItem>
                  We do not collect or store your credit/debit card or UPI
                  credentials on our servers
                </BulletItem>
                <BulletItem>
                  Offline services (e.g., hospital admission, diagnostic lab
                  visits) are billed separately by the healthcare provider
                </BulletItem>
                <View style={{ marginVertical: 10 }} />
                <Text style={styles.policyText}>{"\n"}7. Data Retention</Text>
                <Text style={styles.policyText}>
                  We retain data for the period necessary to:
                </Text>
                <BulletItem>
                  Provide you with uninterrupted healthcare support
                </BulletItem>
                <BulletItem>
                  Comply with legal obligations (such as record retention laws)
                </BulletItem>
                <BulletItem>
                  Upon account deletion or inactivity, your data is retained for
                  a maximum of 30 days unless longer retention is mandated by
                  law. You can request early deletion by contacting us.
                </BulletItem>
                <View style={{ marginVertical: 10 }} />
                <Text style={styles.policyText}>{"\n"}8. Your Rights</Text>
                <Text style={styles.policyText}>
                  You have the following rights with respect to your data:
                </Text>
                <BulletItem>
                  We do not collect or store your credit/debit card or UPI
                  credentials on our servers
                </BulletItem>
                <BulletItem>
                  Offline services (e.g., hospital admission, diagnostic lab
                  visits) are billed separately by the healthcare provider
                </BulletItem>
                <View style={{ marginVertical: 10 }} />{" "}
                {/* Added for consistency */}
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
                  onPress={() => {
                    navigation.navigate("Signup");
                  }}
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
      )}

      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.appPrivacyContainer}>
          <View style={styles.appPrivacyTextSection}>
            <ScrollView
              style={styles.appPrivacyScrollBox}
              contentContainerStyle={styles.appPrivacyScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.appPrivacyHeaderSection}>
                <View style={styles.appPrivacyImageSection}>
                  <Image
                    source={require("../../../assets/Images/PrivacyPolicy.png")}
                    style={styles.appPrivacyImage}
                  />
                </View>
                <Text style={styles.appPrivacyHeader}>
                  Kokoro.doctor Privacy Policy
                </Text>
                <Text style={styles.appPrivacyWelcome}>Welcome</Text>
                <Text style={styles.appPrivacyDate}>
                  Effective Date: [Insert Date]
                </Text>
                <Text style={styles.appPrivacyDate}>
                  Last Updated: [Insert Date]
                </Text>
              </View>
              <View style={styles.appPrivacyMainText}>
                <Text style={styles.appPrivacyPolicyText}>
                  At Kokoro.Doctor, your trust is our greatest asset. As a
                  digital healthcare platform committed to advancing cardiac
                  wellness and holistic well-being, we understand the importance
                  of securing personal and sensitive medical information. This
                  Privacy Policy aims to clearly explain how your data is
                  collected, used, stored, and protected, and outlines the
                  choices and rights available to you. We strive to maintain
                  full transparency and compliance with global data protection
                  laws.
                </Text>
                <Text style={styles.appPolicyText}>{"\n"}1. Who We Are</Text>

                <Text style={styles.appPolicyText}>
                  Kokoro.Doctor is a comprehensive healthcare platform that
                  allows users to:
                </Text>
                <BulletItem>
                  Connect with verified and licensed medical professionals
                </BulletItem>
                <BulletItem>Schedule video or audio consultations</BulletItem>
                <BulletItem>
                  Upload and manage health documents via "Medilocker"
                </BulletItem>
                <BulletItem>
                  Use emergency features such as the SOS button
                </BulletItem>
                <BulletItem>
                  Receive timely insights and recommendations based on medical
                  history
                </BulletItem>
                <Text style={styles.appPolicyText}>
                  The platform is available via mobile and web applications and
                  is supported by HIPAA-compliant cloud infrastructure.
                </Text>

                <Text style={styles.appPolicyText}>
                  {"\n"}2. What Data We Collect
                </Text>

                <Text style={styles.appPolicyText}>
                  We collect various categories of data to deliver our services
                  efficiently and safely:
                </Text>
                <Text style={styles.appPolicyText}>
                  a. Personal Information
                </Text>
                <BulletItem>Full name, gender, date of birth</BulletItem>
                <BulletItem>
                  Contact details: phone number, email address
                </BulletItem>
                <BulletItem>
                  Location data (used only with your permission, e.g., for
                  emergency routing or hospital discovery)
                </BulletItem>

                <Text style={styles.appPolicyText}>
                  b. Health and Medical Information
                </Text>
                <BulletItem>
                  Medical history, symptoms, lifestyle information
                </BulletItem>
                <BulletItem>
                  Uploaded reports (ECG, prescriptions, blood tests, imaging
                  reports, etc.)
                </BulletItem>
                <BulletItem>
                  Doctor consultation summaries, prescriptions, and chat
                  transcripts
                </BulletItem>
                <BulletItem>
                  Vitals such as heart rate, blood pressure, glucose levels (if
                  entered manually or synced via devices)
                </BulletItem>

                <Text style={styles.appPolicyText}>
                  c. Account and Usage Information
                </Text>
                <BulletItem>
                  Login credentials (email or phone + password)
                </BulletItem>
                <BulletItem>
                  Subscription type and history (basic, premium, emergency
                  add-ons)
                </BulletItem>
                <BulletItem>SOS activity logs</BulletItem>
                <BulletItem>
                  App usage logs: device details, crash logs, OS information
                </BulletItem>

                <Text style={styles.appPolicyText}>d. Payment Information</Text>
                <BulletItem>
                  No credit card or banking details are stored on our servers
                </BulletItem>
                <BulletItem>
                  All payments are securely handled by Apple In-App Purchases,
                  Google Play Billing, or compliant third-party payment
                  gateways.
                </BulletItem>
                <View style={{ marginVertical: 10 }} />

                <Text style={styles.appPolicyText}>
                  3. Medilocker: Data Ownership and Usage
                </Text>
                <Text style={styles.appPolicyText}>
                  Medilocker is our health record vault, where users can upload
                  their personal medical documents.
                </Text>
                <Text style={styles.appPolicyText}>
                  By using Medilocker, you:
                </Text>
                <BulletItem>
                  Retain full ownership of your personal health data
                </BulletItem>
                <BulletItem>
                  Provide explicit consent to Kokoro.Doctor to process and
                  analyze this data for improving your care
                </BulletItem>
                <Text style={styles.appPolicyText}>Use of Uploaded Data:</Text>
                <BulletItem>
                  We may use your uploaded health data (after de-identification)
                  for:
                </BulletItem>
                <BulletItem>
                  Clinical research and algorithm development
                </BulletItem>
                <BulletItem>
                  Health insights and diagnostics improvements
                </BulletItem>
                <BulletItem>
                  Academic and public health partnerships (in anonymized format
                  only)
                </BulletItem>
                <BulletItem>
                  You may withdraw your consent or delete data stored in
                  Medilocker at any time.
                </BulletItem>
                <View style={{ marginVertical: 10 }} />

                <Text style={styles.appPolicyText}>
                  4. How We Protect Your Data
                </Text>
                <Text style={styles.appPolicyText}>
                  We use modern, industry-standard security controls to protect
                  your data:
                </Text>
                <BulletItem>
                  Encryption: AES-256 for storage; TLS 1.3 for data transmission
                </BulletItem>
                <BulletItem>
                  Access Management: Strict role-based access controls for
                  doctors and staff
                </BulletItem>
                <BulletItem>
                  Secure Infrastructure: Hosted on HIPAA, ISO27001-compliant
                  data centers
                </BulletItem>
                <BulletItem>
                  Data Minimization: We only ask for data required for service
                  delivery
                </BulletItem>
                <BulletItem>
                  Audit Trails: All access is logged and monitored
                </BulletItem>
                <BulletItem>
                  Regular Penetration Testing and Backups to prevent data loss
                  or breach.
                </BulletItem>

                <View style={{ marginVertical: 10 }} />

                <Text style={styles.appPolicyText}>
                  5. How Your Data May Be Shared
                </Text>
                <Text style={styles.appPolicyText}>
                  Your data is not sold or used for advertising purposes. It may
                  be shared under the following circumstances:
                </Text>
                <BulletItem>
                  With doctors you explicitly consult via the platform
                </BulletItem>
                <BulletItem>
                  With emergency contacts (if you configure SOS alerts)
                </BulletItem>
                <BulletItem>
                  With law enforcement or government agencies under a lawful
                  request
                </BulletItem>
                <BulletItem>
                  With anonymized datasets for machine learning and diagnostics
                </BulletItem>
                <BulletItem>
                  All data shared is traceable, logged, and governed by strict
                  data-sharing policies.
                </BulletItem>

                <View style={{ marginVertical: 10 }} />

                <Text style={styles.appPolicyText}>
                  6. In-App Purchases and Billing
                </Text>
                <BulletItem>
                  All digital health services (e.g., consultations, premium
                  features, SOS support) must be paid via Apple In-App Purchase,
                  Google Play, or approved payment gateways
                </BulletItem>
                <BulletItem>
                  We do not collect or store your credit/debit card or UPI
                  credentials on our servers
                </BulletItem>
                <BulletItem>
                  Offline services (e.g., hospital admission, diagnostic lab
                  visits) are billed separately by the healthcare provider
                </BulletItem>

                <View style={{ marginVertical: 10 }} />

                <Text style={styles.appPolicyText}>7. Data Retention</Text>
                <Text style={styles.appPolicyText}>
                  We retain data for the period necessary to:
                </Text>
                <BulletItem>
                  Provide you with uninterrupted healthcare support
                </BulletItem>
                <BulletItem>
                  Comply with legal obligations (such as record retention laws)
                </BulletItem>
                <BulletItem>
                  Upon account deletion or inactivity, your data is retained for
                  a maximum of 30 days unless longer retention is mandated by
                  law. You can request early deletion by contacting us.
                </BulletItem>

                <View style={{ marginVertical: 10 }} />

                <Text style={styles.appPolicyText}>8. Your Rights</Text>
                <Text style={styles.appPolicyText}>
                  You have the following rights with respect to your data:
                </Text>
                <BulletItem>
                  We do not collect or store your credit/debit card or UPI
                  credentials on our servers
                </BulletItem>
                <BulletItem>
                  Offline services (e.g., hospital admission, diagnostic lab
                  visits) are billed separately by the healthcare provider
                </BulletItem>
              </View>
            </ScrollView>
            <View style={styles.appPrivacyButtonSection}>
              <TouchableOpacity
                style={[
                  styles.appPrivacyButton,
                  selectedButton === "decline" &&
                  styles.appPrivacyButtonDecline,
                ]}
                // onPress={() => setSelectedButton("decline")}
                onPress={() => {
                  navigation.navigate("Signup");
                }}
              >
                <Text
                  style={[
                    styles.appPrivacyButtonText,
                    selectedButton === "decline" &&
                    styles.appPrivacyButtonTextDecline,
                  ]}
                >
                  I Decline
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  width: 1,
                  height: 60,
                  backgroundColor: "#ccc",
                  marginHorizontal: 12,
                }}
              />

              <TouchableOpacity
                style={[
                  styles.appPrivacyButton,
                  selectedButton === "agree" && styles.appPrivacyButtonAgree,
                ]}
                onPress={() => {
                  setSelectedButton("agree");
                  navigation.navigate("Signup", { agreedToPolicy: true });
                }}
              >
                <Text
                  style={[
                    styles.appPrivacyButtonText,
                    selectedButton === "agree" &&
                    styles.appPrivacyButtonTextAgree,
                  ]}
                >
                  I Agree
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
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
