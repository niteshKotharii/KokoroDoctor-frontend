import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Alert,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const HospitalAvailability = ({ navigation, route }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const morningSlotArray = [
    "9:45",
    "10:00",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
  ];
  const afternoonSlotArray = [
    "12:00",
    "12:30",
    "12:45",
    "1:15",
    "1:00",
    "1:45",
  ];
  const toggleSlotSelection = (slot) => {
    setSelectedSlot(selectedSlot === slot ? null : slot);
  };
  return (
    <View style={styles.parent}>
      <View style={styles.hospitalImage}>
        <Image
          source={require("../../../assets/Images/hospitalImage.jpeg")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.hospitalDetails}>
        <View style={styles.hospitalDetailsContainer1}>
          <View style={styles.hospitalDetailsContainer1Top}>
            <Text style={styles.hospitalname}>Apollo Hospital</Text>
            <Text style={styles.hospitaltype}>Multispecialty</Text>
          </View>
          <View style={styles.hospitalDetailsContainer1Bottom}>
            <View style={styles.distanceconatiner}>
              <Text style={styles.distanceHeading}>Distance</Text>
              <Text style={styles.distanceAway}>2.3 km away</Text>
            </View>
            <View style={styles.arrivalContainer}>
              <Text style={styles.arrivalHeading}>Arrival time</Text>
              <Text style={styles.arrivingIn}>Reaches in 10 min</Text>
            </View>
          </View>
        </View>
        <View style={styles.hospitalDetailsContainer2}>
          <TouchableOpacity>
            <Icon
              style={styles.icondesign}
              name="call-outline"
              size={30}
              color="#FF7072"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bedReviewContainer}>
        <View style={styles.emergencyBed}>
          <Image source={require("../../../assets/Icons/hospital-bed.png")} />
          <View style={styles.emergencyBedBody}>
            <Text style={styles.bedHeading}>Emergency Beds </Text>
            <Text style={styles.bedAvailability}>
              Emergenecy Beds Avialable{" "}
            </Text>
          </View>
        </View>
        <View style={styles.review}>
          <Icon style={styles.starIcon} name="star" size={30} color="#FFD500" />
          <View style={styles.emergencyBedBody}>
            <Text style={styles.bedHeading}>Rating & Reviews </Text>
            <Text style={styles.bedAvailability}>4.9 (5000)</Text>
          </View>
        </View>
      </View>
      <View style={styles.serviceheadingContainer}>
        <Text style={styles.serviceheading}>Services & Availability</Text>
      </View>
      <View style={styles.footerBox}>
        <View style={styles.footerSection1}>
          <View style={styles.slotstoday}>
            <Text style={{ fontSize: 13 }}>Today</Text>
            <Text style={{ fontSize: 10 }}>No slots today</Text>
          </View>
          <View style={styles.slotsnextDay}>
            <Text style={{ fontSize: 13 }}>Tomorrow</Text>
            <Text style={{ fontSize: 10, color: "#1FBF86" }}>
              2 slots Avialable{" "}
            </Text>
          </View>
          <View style={styles.slotsnextDate}>
            <Text style={{ fontSize: 13 }}>Mon,2 feb</Text>
            <Text style={{ fontSize: 10, color: "#1FBF86" }}>
              2 slots Avialable{" "}
            </Text>
          </View>
        </View>

        <View style={styles.footerSection2}>
          <View style={styles.slotHeading}>
            <Text>Morning</Text>
          </View>
          <View style={styles.slotbox}>
            {morningSlotArray.map((slot, index) => {
              const isSelected = selectedSlot === slot;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    // styles.symptomCard,
                    styles.slot,
                    isSelected && styles.selectedBed, // Apply selected style
                  ]}
                  onPress={() => toggleSlotSelection(slot)}
                >
                  <Text
                    style={[
                      styles.symptomText,
                      isSelected && styles.selectedCardText, // Change text color if selected
                    ]}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.footerSection3}>
          <View style={styles.slotHeading}>
            <Text>Afternoon</Text>
          </View>
          <View style={styles.slotbox}>
            {afternoonSlotArray.map((slot, index) => {
              const isSelected = selectedSlot === slot;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.slot,
                    isSelected && styles.selectedBed, // Apply selected style
                  ]}
                  onPress={() => toggleSlotSelection(slot)}
                >
                  <Text
                    style={[
                      styles.symptomText,
                      isSelected && styles.selectedCardText, // Change text color if selected
                    ]}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.availabilityButtonConatiner}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AllAvilability")}
          >
            <View style={styles.availabilityButton}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  View All Availability
                </Text>
                <Icon name="chevron-forward" size={20} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bookhospitalButtoncontainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("HospitalPaymentApp")}
        >
          <View style={styles.bookhospitalButton}>
            <Text style={styles.bookHospitalText}>Book Hospital</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  hospitalImage: {
    height: "25%",
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  hospitalDetails: {
    height: "15%",
    width: "100%",
    padding: "5%",

    flexDirection: "row",
  },
  hospitalDetailsContainer1: {
    width: "65%",
    height: "100%",
    // backgroundColor:"blue",
  },
  hospitalDetailsContainer1Top: {
    width: "100%",
    height: "50%",
  },
  hospitalname: {
    fontSize: 24,
    fontStyle: "Poppins",
    fontWeight: "bold",
  },
  hospitaltype: {
    fontSize: 14,
    fontStyle: "Poppins",
    fontWeight: "bold",
  },

  hospitalDetailsContainer1Bottom: {
    width: "80%",
    height: "50%",
  },

  distanceconatiner: {
    height: "50%",
    width: "100%",
    paddingTop: "2%",
    flexDirection: "row",
    paddingRight: "30%",
    justifyContent: "space-between",
  },
  distanceHeading: {
    fontStyle: "Sunflower",
    fontSize: 14,
    fontWeight: 300,
    color: "#9B9A9A",
  },
  distanceAway: {
    fontStyle: "Poppins",
    fontSize: 10,
    fontWeight: 300,
    color: "#FF0000",
  },

  arrivalContainer: {
    height: "50%",
    width: "100%",
    flexDirection: "row",
    paddingRight: "15%",
    justifyContent: "space-between",
  },
  arrivalHeading: {
    fontStyle: "Sunflower",
    fontSize: 14,
    fontWeight: 300,
    color: "#9B9A9A",
  },
  arrivingIn: {
    fontStyle: "Poppins",
    fontSize: 10,
    fontWeight: 300,
    color: "#2CBE5E",
  },

  hospitalDetailsContainer2: {
    width: "35%",
    height: "100%",
    // backgroundColor:"yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  icondesign: {
    padding: 10,
    borderWidth: 5,
    borderColor: "#F4F3F3",
    borderRadius: 50,
    backgroundColor: "#FFFF",
  },
  bedReviewContainer: {
    width: "85%",
    height: "8%",
    marginLeft: "7.5%",
    flexDirection: "row",
    backgroundColor: "#FFFCFC",
    borderRadius: 5,

    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
  },
  emergencyBed: {
    width: "50%",
    height: "100%",
    paddingLeft: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRightWidth: 1,
  },
  emergencyBedBody: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 8,
  },
  bedHeading: {
    fontStyle: "Poppins",
    fontSize: 16,
    fontWeight: "bold",
    padding: "1%",
    color: "#444444",
  },
  bedAvailability: {
    fontStyle: "Poppins",
    fontSize: 10,
    padding: "1%",
    color: "#444444",
  },
  review: {
    width: "50%",
    height: "100%",
    paddingLeft: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceheadingContainer: {
    width: "85%",
    height: "4%",
    justifyContent: "center",
    marginLeft: "7.5%",
    // backgroundColor: "red",
  },
  serviceheading: {
    fontSize: 12,
    fontWeight: 600,
  },
  footerBox: {
    width: "85%",
    height: "38%",
    marginLeft: "7.5%",
    padding: "2%",
    backgroundColor: "#FFFCFC",
    borderRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    gap: "2%",
    backgroundColor: "#FFFFFF",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
  },

  footerSection1: {
    height: "20%",
    width: "94%",
    // backgroundColor:"red",
    flexDirection: "row",

    justifyContent: "space-between",
  },
  slotstoday: {
    gap: 2,
  },
  slotsnextDay: {
    gap: 2,
  },
  slotsnextDate: {
    gap: 2,
  },
  footerSection2: {
    height: "30%",
    width: "94%",
    // backgroundColor: "green",
    gap: 2,
    paddingLeft: "2%",
  },
  slotbox: {
    width: "90%",
    height: "90%",
    flexDirection: "row",
    gap: 2,
    flexWrap: "wrap",
  },
  slot: {
    height: "40%",
    width: "20%",
    padding: "1%",
    borderWidth: 1,
    borderColor: "#1680EC",
    alignItems: "center",
    justifyContent: "center",
  },
  footerSection3: {
    height: "30%",
    width: "94%",
    // backgroundColor: "blue",
    gap: 2,
    paddingLeft: "2%",
  },

  availabilityButtonConatiner: {
    width: "100%",
    height: "18%",
    padding: "1%",
    justifyContent: "center",
    // backgroundColor: "yellow",
  },
  availabilityButton: {
    width: "80%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",

    marginLeft: "10%",
    borderRadius: 5,
    padding: "1%",
    backgroundColor: "#FF7373",
  },
  bookhospitalButtoncontainer: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignContent: "center",
    //  backgroundColor:"red",
  },
  bookhospitalButton: {
    width: "70%",
    height: "65%",
    marginLeft: "16.5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    backgroundColor: "#FF7373",
  },
  bookHospitalText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#fff",
  },
  selectedCardText: {
    color: "#fff",
    fontWeight: "600",
  },
  selectedBed: {
    backgroundColor: "#FFB6C1",
    borderColor: "#FF69B4",
  },
});
export default HospitalAvailability;
