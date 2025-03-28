import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  Platform,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import DoctorsInfoWithRating from "../screens/Doctors/DoctorsInfoWithRating";

const doctors = [
  {
    id: "1",
    name: "Dr Kislay Shrivastava",
    credential: "Cardiologist",
    specialization: "MD (Cardiology) - 22 Years Experience",
    description:
      "MD(Cardiology) Specialization in Treating Heart Conditions, seasoned cardiologist with over 22 years of experience in treating heart conditions.",
    experience: "22 + Years",
    image: require("../assets/Images/dr_kislay.jpg"),
    slots: ["12:00 PM", "12:30 PM"],
    consultationFees: "₹800 fees",
    ratingreview: "4.9 (5000)",
    rating: "4.9",
  },
  {
    id: "2",
    name: "Dr. Sandip Rungta",
    credential: "Cardiologist",
    specialization: "MD (Cardiology) - 22 Years Experience",
    description:
      "With 22 years Of practice, Dr. Rungta is known for his proficiency in cardiac electrophysiology.",
    experience: "22 + Years",
    image: require("../assets/Images/Dr_Sandip_Rungta.jpg"),
    slots: ["10:00 AM", "12:00 PM"],
    consultationFees: "₹800 fees",
    ratingreview: "4.9 (5000)",
    rating: "4.9",
  },
  {
    id: "3",
    name: "Dr. Abhinit Gupta",
    credential: "Interventional Cardiologist",
    specialization: "MBBS, MD - General Medicine - 14 Years Experience",
    description:
      "DM - CardiologyCardiologist,Interventional Cardiologist, 14 Years Experience Overall (8 years as specialist)",
    experience: "14 + Years",
    image: require("../assets/Images/Dr_Abhinit_Gupta.jpg"),
    slots: ["15:00 PM", "16:00 PM"],
    consultationFees: "₹800 fees",
    ratingreview: "4.9 (5000)",
    rating: "4.9",
  },
  {
    id: "4",
    name: "Dr. Ritesh Singh Gangwar",
    credential: "Interventional Cardiologist",
    specialization:
      "DM - Cardiology, MD - General Medicine- 17 Years Experience",
    description:
      "MBBS, Interventional Cardiologist, 17 Years Experience Overall (7 years as specialist)",
    experience: "17 + Years",
    image: require("../assets/Images/Dr_Ritesh_Singh.jpg"),
    slots: ["12:00 PM", "12:30 PM"],
    consultationFees: "₹800 fees",
    ratingreview: "4.9 (5000)",
    rating: "4.9",
  },
  {
    id: "5",
    name: "Dr. Bikash Majumder",
    credential: "Clinical Cardiology",
    specialization: "Clinical Cardiology- 28 Years Experience",
    description:
      "With 28 years in the field. Dr. Majumder is esteemed for his work in clinical cardiology",
    experience: "28 + Years",
    image: require("../assets/Images/Dr_Bikash_Majumder.jpg"),
    slots: ["13:00 PM", "14:30 PM"],
    consultationFees: "₹800 fees",
    ratingreview: "4.9 (5000)",
    rating: "4.9",
  },
  {
    id: "6",
    name: "Dr. Soumya Patra",
    credential: "Pediatric Cardiologist",
    specialization: "Pediatric Cardiology- 20 Years Experience",
    description:
      "Dr. Patra has 20 years of experience and specializes in pediatric cardiology.",
    experience: "20 + Years",
    image: require("../assets/Images/Dr. Soumya Patra.jpg"),
    slots: ["12:00 PM", "12:30 PM"],
    consultationFees: "₹800 fees",
    ratingreview: "4.9 (5000)",
    rating: "4.9",
  },
  {
    id: "7",
    name: "Dr. Vinesh Jain",
    credential: "Cardiologist",
    specialization: "Cardiologist- 14 Years Experience",
    description:
      "Cardiologist,Interventional Cardiologist, 14 Years Experience Overall  (12 years as specialist)",
    experience: "14 + Years",
    image: require("../assets/Images/Dr_Vinesh_Jain.jpg"),
    slots: ["12:30 PM", "14:30 PM"],
    consultationFees: "₹800 fees",
    ratingreview: "4.9 (5000)",
    rating: "4.9",
  },
  {
    id: "8",
    name: "Dr. Supratip Kundu",
    credential: "Interventional Cardiologist",
    specialization: "MBBS, MD - General Medicine- 16 Years Experience",
    description:
      "DM - Cardiology, Cardiologist,Interventional Cardiologist, 16 Years Experience Overall (7 years as specialist)",
    experience: "16 + Years",
    image: require("../assets/Images/Dr. Supratip Kundu.jpeg"),
    slots: ["11:00 AM", "12:30 PM"],
    consultationFees: "₹800 fees",
    ratingreview: "4.9 (5000)",
    rating: "4.9",
  },
  {
    id: "9",
    name: "Dr. Himanshu Yadav",
    credential: "Interventional Cardiologist",
    specialization:
      "DM - Cardiology, MD - General Medicine- 17 Years Experience",
    description:
      "MBBS, Interventional Cardiologist, 17 Years Experience Overall (7 years as specialist)",
    experience: "17 + Years",
    image: require("../assets/Images/Dr. Himanshu Yadav.jpeg"),
    slots: ["10:00 AM", "11:30 PM"],
    consultationFees: "₹800 fees",
    ratingreview: "4.9 (5000)",
    rating: "4.9",
  },
  {
    id: "10",
    name: "Dr. Dhiraj Kumar Giri",
    credential: "Interventional Cardiologist",
    specialization:
      "DM - Cardiology, MD - General Medicine- 17 Years Experience",
    description:
      "MBBS, Interventional Cardiologist, 17 Years Experience Overall (7 years as specialist)",
    experience: "17 + Years",
    image: require("../assets/Images/Dr. Dhiraj Kumar Giri.jpg"),
    slots: ["10:00 AM", "11:30 PM"],
    consultationFees: "₹800 fees",
    ratingreview: "4.9 (5000)",
    rating: "4.9",
  },
  {
    id: "11",
    name: "Dr. Kastubh Mahimane",
    credential: "Interventional Cardiologist",
    specialization: "Interventional Cardiologist",
    description: "Interventional Cardiologist, 15 Years Experience",
    experience: "15 + Years",
    image: require("../assets/Images/Dr. Kastubh Mahimane.jpg"),
    slots: ["10:00 AM", "11:30 PM"],
    consultationFees: "₹800 fees",
    ratingreview: "4.9 (5000)",
    rating: "4.9",
  },
  {
    id: "12",
    name: "Dr. Manidipa Majumdar",
    credential: "Consultation Interventional Cardiologist",
    specialization: "Consultation Interventional Cardiologist",
    description: "Interventional Cardiologist, 9 Years Experience",
    experience: "9 + Years",
    image: require("../assets/Images/Dr. Manidipa Majumdar.jpg"),
    slots: ["10:00 AM", "11:30 PM"],
    consultationFees: "₹800 fees",
    ratingreview: "4.9 (5000)",
    rating: "4.9",
  },
];

const DoctorAppointmentScreen = ({ navigation, route }) => {
  const [selectedSlot, setSelectedSlot] = useState({});
  const { width } = useWindowDimensions();

  const handleSlotSelect = (doctorId, slot) => {
    setSelectedSlot((prevSlots) => ({
      ...prevSlots,
      [doctorId]: prevSlots[doctorId] === slot ? null : slot, // Toggle selection
    }));
  };
  
  return (
    <>
      {Platform.OS === "web" && width > 1000 && (
        <View style={styles.webContainer}>
          <FlatList
            data={doctors}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardRow}>
                  {/* Left Section - Doctor Details */}
                  <View style={styles.row}>
                    <Image source={item.image} style={styles.image} />
                    <View style={styles.infoContainer}>
                      <View style={styles.infoBox}>
                        <View style={styles.info}>
                          <Text style={styles.name}>{item.name}</Text>
                          <Text style={styles.specialization}>
                            {item.specialization}
                          </Text>
                        </View>
                        <View style={styles.verifiedContainer}>
                          <Image
                            source={require("../assets/Images/Medical_Council_of_India_Logo.png")}
                            style={styles.imageBox}
                          />
                          <Text style={styles.verifiedBox}>
                            <Text style={styles.verified}>Verified</Text>
                            <Text style={styles.by}>by</Text>
                            <Text style={styles.mci}> MCI</Text>
                          </Text>
                        </View>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Right Section - Slot Booking */}
                  <View style={styles.slotSection}>
                    <View style={styles.slotTitle}>
                      <Text style={styles.title}>Available Slots</Text>
                    </View>

                    <View style={styles.slotRow}>
                      {item.slots.map((slot) => (
                        <TouchableOpacity
                          key={slot}
                          mode="outlined"
                          style={[
                            styles.slot,
                            selectedSlot[item.id] === slot &&
                              styles.selectedSlot,
                          ]}
                          onPress={() => handleSlotSelect(item.id, slot)}
                        >
                          {/* <Text style={styles.slotText}>{slot}</Text> */}
                          <Text
                            style={[
                              styles.slotText,
                              selectedSlot[item.id] === slot &&
                                styles.selectedSlotText, // Optional: Change text color when selected
                            ]}
                          >
                            {slot}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    <Pressable
                      style={styles.button}
                      onPress={() => {
                        if (!selectedSlot[item.id]) {
                          alert(
                            "Please select a time slot before booking an appointment."
                          );
                        } else {
                          // navigation.push("DoctorsInfoWithRating");
                          navigation.navigate("DoctorsInfoWithRating");
                        }
                      }}
                    >
                      <Text style={{ fontWeight: "600" }}>
                        Book Appointment
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      )}
      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.appContainer}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={doctors}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-between",
                paddingVertical: 10,
              }} // Ensures spacing around items
              renderItem={({ item }) => (
                <View style={styles.cardContainer}>
                  <View style={styles.cardBox}>
                    <View style={styles.cardHeaderInfo}>
                      <Image source={item.image} style={styles.doctorImage} />
                      <View style={styles.doctorDetails}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.specialization}>
                          {item.specialization}
                        </Text>
                      </View>
                      <View style={styles.rating}>
                        <Image
                          source={require("../assets/Icons/Star.png")}
                          style={styles.starIcon}
                        />
                        <Text>{item.rating}</Text>
                      </View>
                    </View>
                    <View style={styles.secondSection}>
                      <View style={styles.doctorInfo}>
                        <View style={styles.aboutDoc}>
                          <Text style={styles.aboutDocText}>About Doc</Text>
                          <View style={styles.descriptionContainer}>
                            <Text style={styles.description}>
                              {item.description.slice(0, 70)}...
                            </Text>
                            <TouchableOpacity>
                              <Text style={styles.knowMore}>Know more</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={styles.verticalLine} />
                        <View style={styles.docFees}>
                          <Text style={styles.docFeesText}>
                            Consultation Fees
                          </Text>
                          <Text style={styles.feesText}>
                            {item.consultationFees}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                          navigation.navigate("DoctorsInfoWithRating", {
                            doctors: item,
                          })
                        }
                      >
                        <Text style={styles.buttonText}>Book Appointment</Text>
                        <Image
                          source={require("../assets/Icons/arrow.png")}
                          style={styles.arrowIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    height: "100%",
    Width: "100%",
    backgroundColor: "#f8f8f8",
    padding: 10,
    flexDirection: "column",
  },
  //App design Start

  appContainer: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  cardContainer: {
    height: 204,
    width: "98%",
    //borderWidth: 1,
    borderRadius: 15,
    marginBottom: 14,
    backgroundColor: "#fff",
    alignSelf: "center",
    boxShadow: " 0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
    padding: "0.5%",
  },
  cardBox: {
    flexDirection: "column",
    //backgroundColor: "#fff",
  },
  cardHeaderInfo: {
    height: "37%",
    width: "100%",
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  doctorImage: {
    height: 67,
    width: 67,
    borderRadius: 40,
    marginVertical: "1%",
  },
  doctorDetails: {
    height: "78%",
    width: "52%",
    //borderWidth: 1,
    alignSelf: "center",
  },

  rating: {
    height: "30%",
    width: "15%",
    //borderWidth: 1,
    marginVertical: "3.5%",
    borderRadius: 7,
    boxShadow: " 0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginRight: "4%",
  },
  starIcon: {
    height: 15,
    width: 15,
    alignSelf: "center",
  },
  secondSection: {
    height: "60%",
    width: "90%",
    // borderWidth: 1,
    alignSelf: "center",
    backgroundColor: " rgb(244, 243, 243)",
    borderRadius: 10,
    padding: "2%",
    marginVertical: "0.5%",
  },
  doctorInfo: {
    height: "71%",
    width: "100%",
    //borderWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: "2%",
  },
  aboutDoc: {
    height: "100%",
    width: "50%",
    //borderWidth: 1,
    flexDirection: "column",
  },
  aboutDocText: {
    fontSize: 13,
    fontWeight: 500,
    //paddingHorizontal: "10%",
  },
  aboutDocDetails: {
    fontSize: 10,
    fontWeight: 400,
  },
  docFees: {
    height: "100%",
    width: "50%",
    //borderWidth: 1,
  },
  docFeesText: {
    paddingHorizontal: "5%",
    fontSize: 13,
    fontWeight: 500,
  },
  feesText: {
    fontSize: 13,
    fontWeight: 400,
    color: " rgb(62, 145, 229)",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  verticalLine: {
    height: "90%",
    width: "0.7%",
    //borderWidth:1,
    alignSelf: "center",
    backgroundColor: "rgba(56, 55, 55, 0.12)",
  },
  //App style end

  card: {
    ...Platform.select({
      web: {
        marginBottom: "0.5%",
        paddingVertical: "0.5%",
        borderRadius: 2,
        //borderWidth: 2,
        borderColor: "#000000",
        height: "97%",
        backgroundColor: "#FFFFFF",
      },
    }),
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    //borderWidth: 1,
    borderColor: "#000000",
    width: "70%",
    height: "120%",
    marginHorizontal: "1%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // marginRight: 10,
    marginHorizontal: "1%",
  },
  infoContainer: {
    //flex: 1,
    //borderWidth: 1,
    borderColor: "#000000",
    width: "85%",
  },
  infoBox: {
    //borderWidth: 2,
    borderColor: "#7cfc00",
    width: "75%",
    flexDirection: "row",
  },
  info: {
    //borderWidth: 1,
    borderColor: "#000000",
    width: "65%",
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    ...Platform.select({
      web: {
        fontSize: 18,
        fontWeight: "bold",
      },
    }),
  },
  specialization: {
    fontSize: 12,
    fontWeight: 300,
    color: "#444444",
    ...Platform.select({
      web: {
        fontSize: 14,
        color: "#666",
      },
    }),
  },

  verifiedContainer: {
    width: "35%",
    flexDirection: "row",
    //borderWidth: 1,
    borderColor: "#000000",
    paddingVertical: "0.5%",
  },
  verifiedBox: {
    flexDirection: "row",
    //borderWidth: 1,
    borderColor: "#000000",
    width: "70%",
  },
  verified: {
    fontSize: 14,
    color: "green",
    paddingVertical: "5%",
    paddingHorizontal: "3%",
    fontWeight: 300,
  },
  mci: {
    color: "#FF7373",
  },

  descriptionContainer: {
    height: "77%",
    width: "100%",
    //borderWidth: 1,
    flexDirection: "column",
    ...Platform.select({
      web: {
        // borderWidth: 1,
        // borderColor: "#000000",
        width: "75%",
        flexDirection: "row",
        //justifyContent: "space-around",
      },
    }),
  },
  description: {
    fontSize: 10,
    fontWeight: 500,
    color: "#000",
    ...Platform.select({
      web: {
        fontSize: 14,
        marginTop: "1%",
      },
    }),
  },
  knowMore: {
    alignSelf: "flex-end",
    fontSize: 11,
    fontWeight: 400,
    color: "#2C00D9",
    paddingRight: "2%",
    //marginBottom:"10%"
  },
  slotSection: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    flexDirection: "column",
    marginRight: "2%",
    width: "17%",
    height: "110%",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  slotTitle: {
    backgroundColor: "#FFF0F0",
    width: "100%",
    height: "22%",
    // borderWidth: 1,
    // borderColor: "#000000",
  },
  selectedSlotText: {},
  title: {
    fontSize: 14,
    //fontWeight: "bold",
    alignSelf: "center",
  },
  slotRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingHorizontal: "2%",
  },
  slot: {
    //backgroundColor: "#e8f4ff",
    borderRadius: 1,
    borderColor: "#1680EC",
    flex: 1,
    justifyContent: "center",
    minWidth: "35%", // Prevents slots from being too small
    maxWidth: "43%", // Prevents slots from being too wide
  },
  selectedSlot: {
    // backgroundColor: "#87ceeb",
    // color: "#000000",
    borderWidth: 1,
    borderColor: "#1680EC",
    borderRadius: 5,
    padding: 5,
  },
  slotText: {
    fontSize: 10,
    color: "#1680EC",
  },
  button: {
    marginHorizontal: "3%",
    backgroundColor: "rgb(243, 119, 119)",
    height: "27%",
    width: "95%",
    borderRadius: 8,
    marginVertical: "2%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    ...Platform.select({
      web: {
        marginHorizontal: "3%",
        backgroundColor: "#FF7373",
        height: "27%",
        width: "95%",
        borderRadius: 8,
        marginBottom: "5%",
        justifyContent: "center",
        alignItems: "center",
      },
    }),
  },
  buttonText: {
    color: "#fff",
  },
  arrowIcon: {
    height: 11,
    width: 9,
    marginHorizontal: "5%",
  },
});

export default DoctorAppointmentScreen;
