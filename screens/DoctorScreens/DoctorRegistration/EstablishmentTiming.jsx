import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import NewSideNav from "../../../components/DoctorsPortalComponents/NewSideNav";
import SideImageStyle from "../../../components/DoctorsPortalComponents/SideImageStyle";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const EstablishmentTiming = ({navigation}) => {
  return (
    <View style={styles.container}>
      <NewSideNav />

      <View style={styles.rightSection}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.heading}>Establishment Timings</Text>

          <Text style={styles.label}>Days</Text>
          <View style={styles.dayRow}>
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day, index) => (
              <TouchableOpacity key={index} style={styles.dayButton}>
                <Text>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Session 1</Text>
          <View style={styles.inputRow}>
            <TextInput placeholder="From" style={styles.inputBox} />
            <TextInput placeholder="To" style={styles.inputBox} />
          </View>

          <Text style={styles.label}>Session 2</Text>
          <View style={styles.inputRow}>
            <TextInput placeholder="From" style={styles.inputBox} />
            <TextInput placeholder="To" style={styles.inputBox} />
          </View>

          <Text style={styles.label}>Fees</Text>
          <TextInput placeholder="₹" style={styles.fullInput} />

          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => navigation.navigate("DoctorCongrats")}
          >
            <Text style={styles.continueText}>Continue</Text>
            <View style={styles.iconCon}>
              <Ionicons
                name="arrow-forward"
                size={20}
                color="red"
                style={{ marginLeft: 6 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => navigation.navigate("DoctorCongrats")}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </ScrollView>

        <SideImageStyle />
      </View>
    </View>
  );
};

export default EstablishmentTiming;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "100%",
    backgroundColor: "#FCF5F7",
  },
  rightSection: {
    width: "85%",
    flexDirection: "row",
    backgroundColor: "#FCF5F7",
  },
  formContainer: {
    width: "85%",
    padding: 30,
  },
  heading: {
    marginTop: "8%",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 8,
    fontWeight: "500",
    color: "#000",
  },
  dayRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  dayButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 10,
    elevation: 1,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    width: "35%",
  },
  inputBox: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "#ccc",
    marginBottom: 10,
    width: "40%",
  },
  fullInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "#ccc",
    marginBottom: 20,
    width: "28%",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
  },

  continueBtn: {
    flexDirection: "row",
    backgroundColor: "#ff5d73",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    elevation: 2,
    width: "22%",
    height: "6%",
    marginBottom: 20,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  continueText: {
    color: "white",
    fontWeight: "bold",
  },
  iconCon: {
    marginLeft: "10%",
    width: 34,
    height: 34,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    marginLeft: "35%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  skipBtn: {
    width: "15%",
    height: "6%",
    backgroundColor: "#20C997",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginLeft: "3%",
    justifyContent: "center",
  },
  skipText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 15,
  },
});
