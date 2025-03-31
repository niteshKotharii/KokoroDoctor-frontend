import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Platform,
  Linking,
  useWindowDimensions,
} from "react-native";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";

const BookingConfirmation = ({ navigation }) => {
  const { width, height } = useWindowDimensions();

  const handleAddToCalendar = (date, time) => {
    if (Platform.OS === "ios") {
      Linking.openURL("calshow:");
    }else if (Platform.OS === "android") {
      Linking.openURL("content://com.android.calendar/time/");
    } else {
      Linking.openURL("https://calendar.google.com");
    }
  };

  const handleDone = () => {
    navigation.navigate("LandingPage")
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.bookingLogo}>
          <Image source={require("../../../assets/Icons/BookingConfirmation.png")} style={styles.bookingLogoImage}/>
        </View>
        <View style={styles.topText}>
          <Text style={styles.title}>Booking Confirmed</Text>
          <Text style={styles.description}>Thanks Your booking has been confirmed</Text>
        </View>
      </View>

      <View style={styles.doctorCard}>
        <View style={styles.doctorDetails}>
          <Image source={require("../../../assets/Images/dr_kislay.jpg")} style={styles.drImage}/>
          <Text style={{fontSize: 22, fontWeight:"bold"}}>Dr Kislay Shrivasatva</Text>
          <Text style={{fontSize: 18, fontWeight:"bold"}}>(Cardiologist)</Text>
        </View>
        <View style={styles.dateTime}>
          <View>
            <Text style={styles.lightText}>Time</Text>
            <View style={styles.timeBox}>
              <Feather name="clock" size={14} color="#444444" />
              <Text style={styles.lightText}>7:00</Text>
            </View>
          </View>
          <View>
            <Text style={styles.lightText}>Date</Text>
            <View style={styles.timeBox}>
              <FontAwesome5 name="calendar-alt" size={16} color="#444444" />
              <Text style={styles.lightText}>5 April,2025</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.buttons}>
        <Pressable style={styles.doneButton} onPress={handleDone}>
          <Text style={[styles.lightText, {fontSize:18, textAlign: "center",}]}>Done</Text>
        </Pressable>
        <Pressable style={styles.calendarButton} onPress={handleAddToCalendar}>
          <AntDesign name="plus" size={20} color="black" />
          <Text style={{fontSize:16, fontWeight:"500", textAlign: "center"}}>Add to Calendar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  top:{
    alignItems: "center",
  },
  bookingLogo:{
    alignItems: "center",
    marginBottom: "2%",
  },
  bookingLogoImage:{
    height: 80,
    width: 80,
  },
  topText:{
    alignItems: "center",
    width: "80%",
  },
  title:{
    textAlign: "center",
    fontSize: 26,
    fontWeight: "800",
    paddingBottom: "3%",
  },
  description:{
    fontSize: 18,
    textAlign: "center",
  },
  doctorCard:{
    width: "70%",
    padding: "5%",
    borderRadius: 10,
    marginVertical: "7%",
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  doctorDetails:{
    alignItems: "center",
    marginBottom: "5%",
  },
  drImage:{
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  dateTime:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeBox:{
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  buttons:{
    marginTop: "5%",
    gap: 10,
    width: "60%",
  },
  doneButton: {
    borderWidth: 1,
    borderColor: "#1680EC",
    borderRadius: 5,
    paddingHorizontal: "10%",
    paddingVertical: "2%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  calendarButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7072",
    borderRadius: 5,
    paddingHorizontal: "10%",
    elevation: 2,
    paddingVertical: "3%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  lightText: {
    fontSize:16, 
    fontWeight:"500", 
    color:"#444444",
  },
});

export default BookingConfirmation;