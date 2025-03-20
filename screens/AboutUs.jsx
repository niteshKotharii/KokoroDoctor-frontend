import React, { useState } from "react";
import {
  ImageBackground,
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  GestureResponderEvent,
  Alert,
  Pressable,
} from "react-native";
import SideBarNavigation from "../components/SideBarNavigation";
import { Ionicons } from '@expo/vector-icons';

const AboutUs = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.parent}>
        <View style={styles.Left}>
          <SideBarNavigation navigation={navigation} />
        </View>
        <View style={styles.Right}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.title}>
              <Text style={styles.brandName}>
                Kokoro.
                <Text style={styles.doctorText}>Doctor</Text>
              </Text>
              <Text style={styles.tagline}>
                Your AI-Powered Heart Health Companion
              </Text>
            </View>

            <View style={styles.AboutSection}>
              <View style={styles.textBox}>
                <View style={styles.delayedBorder} />
                <Text style={styles.aboutTitle}>About Us</Text>
                <Text style={styles.text}>
                  <Text style={styles.bold}>Kokoro.Doctor</Text> was founded
                  with a mission to make AI-powered heart health accessible to
                  everyone. As an I Member at Harvard Innovation Labs, our team
                  of experts in AI, healthcare, and business is dedicated to
                  bridging the gap between early detection and life-saving
                  action. With extensive research and cutting-edge technology,
                  <Text style={styles.bold}> Kokoro.Doctor </Text>
                  ensures that patients, doctors, and caregivers receive the
                  best possible tools for cardiac care. Our commitment to
                  affordable, data-driven healthcare makes us a leader in the
                  future of the heart health solution. We envision a world where
                  no one suffers due to lack of timely heart care. By leveraging
                  AI, medical expertise, and innovation,{" "}
                  <Text style={styles.bold}> Kokoro.Doctor </Text> is at the
                  forefront of the next healthcare revolution.
                </Text>
              </View>

              <View style={styles.rightSection}>
                <Text style={styles.urgentNeedTitle}>
                  THE URGENT NEED FOR BETTER HEART CARE
                </Text>
                <Text style={styles.urgentNeedText}>
                  HEART DISEASE IS THE LEADING CAUSE OF DEATH GLOBALLY, YET
                  MILLIONS STILL LACK QUICK, RELIABLE, AND AFFORDABLE ACCESS TO
                  CARDIAC CARE.
                </Text>
              </View>
            </View>
            <View style={styles.Need}>
              <View style={styles.headerNeed}>
                <Text style={styles.headerTextNeed}>
                  The Urgent Need for Better Heart Care
                </Text>
                <Text style={styles.description}>
                  Heart disease is the leading cause of death globally, yet
                  millions still lack quick, reliable, and affordable access to
                  cardiac care.
                </Text>
              </View>

              {/* Background Design */}
              <View style={styles.circle1} />
              <View style={styles.circle2} />

              {/* Problem Section */}
              <Text style={styles.problemTitle}>The Problem:</Text>
              <View style={styles.problemContainer}>
                <View style={styles.problemBox}>
                  <Text style={styles.problemText}>
                    Lack of cardiologists in many cities and towns.
                  </Text>
                </View>
                <View style={styles.problemBox}>
                  <Text style={styles.problemText}>
                    Long waiting times for checkups and tests.
                  </Text>
                </View>
                <View style={styles.problemBox}>
                  <Text style={styles.problemText}>
                    Expensive treatments that many cannot afford.
                  </Text>
                </View>
                <View style={styles.problemBox}>
                  <Text style={styles.problemText}>
                    Delayed action—many people ignore early warning signs.
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.access}>
      
      <Text style={styles.head}>
        What if you could assess your heart health instantly?
      </Text>
      <Text style={styles.subhead}>
        That’s why we created Kokoro.Doctor.
      </Text>

     
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>What is Kokoro.Doctor?</Text>
        <Ionicons name="chevron-forward" size={20} color="#E57373" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>How Kokoro.Doctor Works?</Text>
        <Ionicons name="chevron-forward" size={20} color="#E57373" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Why Kokoro.Doctor Stands Out?</Text>
        <Ionicons name="chevron-forward" size={20} color="#E57373" />
      </TouchableOpacity>
    </View>
            
            <View style={styles.GlobleMission}>
            <View style={styles.missionBox}>
        <Text style={styles.missionHeader}>The Bigger Vision A Global Mission</Text>
        {/* <View  style={styles.backColor}> */}
        <Text style={styles.missionSubText}>
          <Text style={{ fontStyle: "italic" }}>
            For too long, heart disease has been a silent killer—especially in
            communities with poor healthcare access.
          </Text>
        </Text>

        {/* Benefits Boxes */}
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitBox}>
            <Text style={styles.benefitText}>No more delayed heart care</Text>
          </View>
          <View style={styles.benefitBox}>
            <Text style={styles.benefitText}>No more preventable heart attacks.</Text>
          </View>
          <View style={styles.benefitBox}>
            <Text style={styles.benefitText}>
              No family suffering because they couldn’t get help in time
            </Text>
          </View>
        </View>
        {/* </View> */}
      </View>

      {/* Pricing Section */}
      <Text style={styles.pricingHeader}>PRICING</Text>
      <Text style={styles.pricingSubText}>
        We believe affordable healthcare should be a reality for everyone.
      </Text>

      {/* Monthly Plan */}
      <View style={styles.pricingBox}>
        <Text style={styles.priceText}>₹1,999</Text>
        <Text style={styles.priceLabel}>per Month</Text>
      </View>

      {/* Yearly Plan with Discount */}
      <View style={styles.discountContainer}>
        <TouchableOpacity style={styles.discountBadge}>
          <Text style={styles.discountText}>SAVE 15 %</Text>
        </TouchableOpacity>
        <View style={styles.pricingBox}>
          <Text style={styles.priceText}>₹9,999</Text>
          <Text style={styles.priceLabel}>per Year</Text>
        </View>
      </View>

      {/* Terms Note */}
      <Text style={styles.note}>
        *This includes unlimited AI heart health assessments, emergency alerts, priority doctor consultations, and secure MediLocker.
      </Text>
            </View>

            <View style={styles.resolution}>
              <Text style={styles.Resheader}>
                Join the Revolution in Heart Health
              </Text>
              <Text style={styles.Resdescription}>
                Over 100,000 users have already taken their first AI-powered
                heart checkup, and we are just getting started.
              </Text>

              {/* Categories Section */}
              <View style={styles.textContainer}>
                <Text style={styles.boldText}>
                  Patients :{" "}
                  <Text style={styles.normalText}>
                    Take charge of your heart health today
                  </Text>
                </Text>
                <View style={styles.line} />

                <Text style={styles.boldText}>
                  Healthcare Providers :{" "}
                  <Text style={styles.normalText}>
                    Partner with us for better patient outcomes
                  </Text>
                </Text>
                <View style={styles.line} />

                <Text style={styles.boldText}>
                  Investors & Innovators:{" "}
                  <Text style={styles.normalText}>
                    Be part of the future of AI-driven healthcare
                  </Text>
                </Text>
                <View style={styles.line} />
              </View>

              
              <View style={styles.ctaBox}>
                <Text style={styles.ctaText}>
                  Your heart deserves the best care
                </Text>
                
                <TouchableOpacity style={styles.ctaButton}>
                  <Text style={styles.ctaButtonText}>Check your heart now</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.FinalThought}>
              <Text style={styles.Heading}>Final Thought</Text>
              <Text style={styles.SubTitle}>
                This is not just another health app-{" "}
                <Text style={styles.TextRed}>
                  This is a revolution in heart care.{" "}
                </Text>
              </Text>
              <Text style={styles.content}>
                With insights from{" "}
                <Text style={styles.TextRed}>Harvard Innovation Labs </Text>,
                Kokoro.Doctor is bridging the gap between{" "}
                <Text style={styles.TextRed}>
                  early detection and life-saving action.
                </Text>
              </Text>
              <Text style={styles.lastPara}>
                Join Us in redefining heart health-
                <Text style={styles.TextRed}>one heartbeat at a time </Text>
              </Text>
              <Text style={styles.kokoro}>Kokoro</Text>
              <Text style={styles.doctor}>Doctor</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  imageContainer: {
    //borderWidth: 2,
    borderColor: "#00ffff",
    height: "100%",
    width: "100%",
  },
  parent: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  Left: {
    height: "100%",
    width: "15%",
  },
  Right: {
    height: "100%",
    width: "85%",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    //transform:[{scale:0.8}],
    opacity: 80,
    //marginVertical:"-5%"
    alignSelf: "center",
    flexDirection: "column",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    width: "12%",
    marginLeft: "70%",
    marginTop: 15,
    // borderColor: "#FFFFFF",
    // borderWidth: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingBottom: 20,
  },
  title: {
    padding: 20,
    height: 180,
    flexDirection: "column",
    backgroundColor: "#dc6060",
    justifyContent: "center",
  },
  brandName: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#D0C4FF",
  },
  doctorText: {
    color: "#B0A0FF",
  },
  tagline: {
    fontSize: 25,
    color: "#e0a8c8",
    marginTop: 5,
  },

  AboutSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  textBox: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    // borderRadius: 10,
    // marginHorizontal: 10,

    width: "66%",
    position: "relative",
  },
  delayedBorder: {
    position: "absolute",
    right: 0,
    top: "15%", 
    height: "50%", 
    width: 2, 
    backgroundColor: "black",
  },
  aboutTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  text: {
    fontFamily: "Noticia Text",
    fontSize: 18,
    color: "black",
    lineHeight: 22,
  },
  bold: {
    fontWeight: "bold",
  },
  rightSection: {
    width: "30%",
    padding: 15,
    paddingLeft: 20, 
    flexShrink: 1,
    maxWidth: "100%",
  },
  urgentNeedTitle: {
    marginTop: "20%",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  highlight: {
    color: "#FFD700", 
  },
  urgentNeedText: {
    fontSize: 14,
    color: "#ed0f0f",
    marginTop: 5,
  },

  //---
  Need: {
    padding: 15,
    backgroundColor: "#B0B6FF",
  },
  headerNeed: {
    marginBottom: 20,
  },
  headerTextNeed: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#666", 
    marginTop: 5,
  },
  problemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
    paddingLeft: "2%",
  },
  problemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 15,
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  problemBox: {
    width: "48%",
    // height:"60%",
    backgroundColor: "#EDE9FE", // Light purple box
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    alignItems: "center",
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 2, height: 2 },
    // shadowRadius: 5,
    // elevation: 5, // For Android shadow
  },
  problemText: {
    fontSize: 15,
    color: "#C20000", // Red text
    fontWeight: "bold",
    textAlign: "center",
  },
  circle1: {
    position: "absolute",
    top: 80,
    right: 40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F4CFA5",
    opacity: 0.6,
  },
  circle2: {
    position: "absolute",
    bottom: 50,
    right: -20,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#B7A2E9",
    opacity: 0.4,
  },
  //----
  access:{
padding:15,
backgroundColor:"#FFFFFF"
  },
  head: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    paddingLeft:"5%"
  },
  subhead: {
    fontSize: 16,
    paddingLeft:"5%",
    color: "#333",
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#333",
    padding: 15,
    paddingLeft:"5%",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
//-------
GlobleMission:{
  padding:15,
},
missionBox: {
  backgroundColor: "#FFF",
  padding: 15,
  borderRadius: 10,
  borderWidth: 4,
  borderColor: "#FECF58", // Yellow border
  width: "100%",
  // alignItems: "center",
  marginBottom: 30,
  paddingBottom:"15%"
},
missionHeader: {
  fontSize: 16,
  fontWeight: "bold",
  // textAlign: "center",
},

missionSubText: {
  fontSize: 14,
  color: "#666",
  // textAlign: "center",
  marginTop: 5,
  marginBottom: 10,
},
benefitsContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
},
benefitBox: {
  backgroundColor: "#E29558", // Orange color
  padding: 10,
  borderRadius: 10,
  width: "30%",
  alignItems: "center",
},
benefitText: {
  color: "#FFF",
  fontSize: 12,
  textAlign: "center",
},
pricingHeader: {
  fontSize: 20,
  fontWeight: "bold",
  alignSelf: "flex-start",
  marginBottom: 5,
},
pricingSubText: {
  fontSize: 22,
  color: "#666",
  // textAlign: "center",
  marginBottom: 20,
},
pricingBox: {
  // backgroundColor: "#",
  paddingVertical: 10,
  marginRight:"70%",
  paddingHorizontal: 20,
  borderRadius: 10,
  borderWidth:2,
  borderColor:"green",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 10,
},
priceText: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#333",
},
priceLabel: {
  fontSize: 14,
  color: "#666",
  marginLeft: 5,
},
discountContainer: {
  marginLeft:"50%",
  flexDirection: "row",
  alignItems: "center",
},
discountBadge: {
  backgroundColor: "#4CAF50", // Green Badge
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 5,
  marginRight: 10,
},
discountText: {
  color: "#FFF",
  fontSize: 12,
  fontWeight: "bold",
},
note: {
  fontSize: 12,
  color: "#120909f3",
  textAlign: "center",
  marginTop: 10,
  marginRight:"20%",
  paddingHorizontal: 10,
},
  //----
  resolution: {
    padding: 15,
    marginRight: "1%",
    marginHorizontal:"2%",
    backgroundColor: "#FFECC4",
    borderRadius: "2%",
  },
  Resheader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  Resdescription: {
    fontSize: 16,
    textAlign: "center",
    color: "#555", // Grey Text
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  normalText: {
    fontWeight: "normal",
  },
  line: {
    width: "80%",
    height: 1,
    backgroundColor: "#000",
    marginVertical: 5,
  },
  ctaBox: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginLeft: "35%",
    marginRight: "35%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
  },
  ctaText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#FF6B6B", // Soft Red Button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  ctaButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  //--------- final page
  FinalThought: {
    backgroundColor: "white",
    padding: 20,
  },
  Heading: {
    fontSize: 28,
    fontWeight: "bold",
  },
  SubTitle: {
    paddingTop: "1%",
    fontSize: 22,
  },
  TextRed: {
    color: "red",
  },
  content: {
    paddingTop: "1%",
    fontSize: 22,
  },
  lastPara: {
    paddingTop: "1%",
    paddingLeft: "20%",
    paddingRight: "20%",
    fontSize: 22,
    // marginBottom:"25%"
  },
  kokoro: {
    fontSize: 120,
    fontFamily: "bold",
    color: "#bebcbc",
  },
  doctor: {
    marginLeft: "30%",
    fontSize: 120,
    fontFamily: "bold",
    color: "#bebcbc",
  },
});

export default AboutUs;
