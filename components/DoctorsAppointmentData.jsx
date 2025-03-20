import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";

const doctors = [
  {
    id: "1",
    name: "Dr Kislay Shrivastava",
    specialization: "MD (Cardiology) - 22 Years Experience",
    description:"MD(Cardiology) Specialization in Treating Heart Conditions Dr. Kislay Shrivastava, MD (Cardiology), is a seasoned cardiologist with over 22 years of experience in treating heart conditions.",
    image: require("../assets/Images/dr_kislay.jpg"),
    slots: ["12:00 PM", "12:30 PM"],
  },
  {
    id: "2",
    name: "Dr. Sandip Rungta",
    specialization: "MD (Cardiology) - 22 Years Experience",
    description:"With 22 years Of practice, Dr. Rungta is known for his proficiency in cardiac electrophysiology.",
    image: require("../assets/Images/Dr_Sandip_Rungta.jpg"),
    slots: ["10:00 AM", "12:00 PM"],
  },
  {
    id: "3",
    name: "Dr. Abhinit Gupta",
    specialization: "MBBS, MD - General Medicine - 14 Years Experience",
    description:"DM - CardiologyCardiologist,Interventional Cardiologist, 14 Years Experience Overall (8 years as specialist)",
    image: require("../assets/Images/Dr_Abhinit_Gupta.jpg"),
    slots: ["15:00 PM", "16:00 PM"],
  },
  {
    id: "4",
    name: "Dr. Ritesh Singh Gangwar",
    specialization:
      "DM - Cardiology, MD - General Medicine- 17 Years Experience",
    description:"MBBS, Interventional Cardiologist, 17 Years Experience Overall (7 years as specialist)",
    image: require("../assets/Images/Dr_Ritesh_Singh.jpg"),
    slots: ["12:00 PM", "12:30 PM"],
  },
  {
    id: "5",
    name: "Dr. Bikash Majumder",
    specialization: "Clinical Cardiology- 28 Years Experience",
    description:"With 28 years in the field. Dr. Majumder is esteemed for his work in clinical cardiology",
    image: require("../assets/Images/Dr_Bikash_Majumder.jpg"),
    slots: ["13:00 PM", "14:30 PM"],
  },
  {
    id: "6",
    name: "Dr. Soumya Patra",
    specialization: "Pediatric Cardiology- 20 Years Experience",
    description:"Dr. Patra has 20 years of experience and specializes in pediatric cardiology.",
    image: require("../assets/Images/dr_kislay.jpg"),
    slots: ["12:00 PM", "12:30 PM"],
  },
  {
    id: "7",
    name: "Dr. Vinesh Jain",
    specialization: "Cardiologist- 14 Years Experience",
    description:"Cardiologist,Interventional Cardiologist, 14 Years Experience Overall  (12 years as specialist)",
    image: require("../assets/Images/Dr_Vinesh_Jain.jpg"),
    slots: ["12:30 PM", "14:30 PM"],
  },
  {
    id: "8",
    name: "Dr. Supratip Kundu",
    specialization: "MBBS, MD - General Medicine- 16 Years Experience",
    description:"DM - Cardiology, Cardiologist,Interventional Cardiologist, 16 Years Experience Overall (7 years as specialist)",
    image: require("../assets/Images/dr_kislay.jpg"),
    slots: ["11:00 AM", "12:30 PM"],
  },
  {
    id: "9",
    name: "Dr. Himanshu Yadav",
    specialization:
      "DM - Cardiology, MD - General Medicine- 17 Years Experience",
    description:"MBBS, Interventional Cardiologist, 17 Years Experience Overall (7 years as specialist)",
    image: require("../assets/Images/dr_kislay.jpg"),
    slots: ["10:00 AM", "11:30 PM"],
  },
];

const DoctorAppointmentScreen = ({navigation, route}) => {
  const [selectedSlot, setSelectedSlot] = useState({});

  const handleSlotSelect = (doctorId, slot) => {
    setSelectedSlot((prevSlots) => ({
      ...prevSlots,
      [doctorId]: prevSlots[doctorId] === slot ? null : slot, // Toggle selection
    }));
  };

  return (
    <View style={styles.container}>
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
                    <Text style={styles.description}>{item.description}</Text>
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
                        selectedSlot[item.id] === slot && styles.selectedSlot,
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
                      navigation.navigate("DoctorsInfoWithRating")
                    }
                  }}
                >
                  <Text>Book Appointment</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
    flexDirection: "column",
  },
  card: {
    marginBottom: "0.5%",
    paddingVertical: "0.5%",
    borderRadius: 2,
    //borderWidth: 2,
    borderColor: "#000000",
    height: "85%",
    backgroundColor: "#FFFFFF",
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
    fontSize: 18,
    fontWeight: "bold",
  },
  specialization: {
    fontSize: 14,
    color: "#666",
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
    // borderWidth: 1,
    // borderColor: "#000000",
    width: "75%",
    flexDirection: "row",
    //justifyContent: "space-around",
  },
  description: {
    fontSize: 14,
    marginTop: "1%",
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
    //borderWidth: 1,
    borderColor: "#000000",
  },
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
    backgroundColor: "#87ceeb",
    color: "#000000",
  },
  slotText: {
    fontSize: 10,
    color: "#1680EC",
  },
  button: {
    marginHorizontal: "3%",
    backgroundColor: "#FF7373",
    height: "27%",
    width: "95%",
    borderRadius: 8,
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DoctorAppointmentScreen;
