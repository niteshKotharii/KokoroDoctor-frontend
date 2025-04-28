import React, { useState } from "react"
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native"
import SideBarNavigation from "../../../components/DoctorsPortalComponents/NewestSidebar"
import SettingsNavigation from "../../../components/DoctorsPortalComponents/SettingsNavigation"
import HeaderNavigation from "../../../components/DoctorsPortalComponents/HeaderNavigation"

const EstablishmentTimings = ({ navigation, route }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  const toggleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleAddTime = () => {
    if (fromTime && toTime) {
      // Here you would typically save the time range
      setFromTime("");
      setToTime("");
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.parent}>
        {/* Left Sidebar */}
        <View style={styles.Left}>
          <SideBarNavigation navigation={navigation} />
        </View>

        {/* Middle Settings Menu */}
        <View style={styles.Middle}>
          <SettingsNavigation navigation={navigation} />
        </View>

        {/* Right Content Area */}
        <View style={styles.Right}>
          {/* Moved header out of scrollview */}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.contentCard}>
              <Text style={styles.contentTitle}>Profile Setting</Text>
              <Text style={styles.profileSubtitle}>Manage your account settings</Text>
              <HeaderNavigation navigation={navigation} />
              <View style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Days</Text>
                <View style={styles.daysContainer}>
                  {days.map((day) => (
                    <TouchableOpacity 
                      key={day}
                      style={[
                        styles.dayButton,
                        selectedDays.includes(day) && styles.selectedDayButton
                      ]}
                      onPress={() => toggleDaySelection(day)}
                    >
                      <Text style={[
                        styles.dayButtonText,
                        selectedDays.includes(day) && styles.selectedDayButtonText
                      ]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.sessionTitle}>Session 1</Text>
                <View style={styles.sessionContainer}>
                  <View style={styles.timeInputContainer}>
                    <TextInput 
                      style={styles.timeInput} 
                      placeholder="From" 
                      value={fromTime}
                      onChangeText={setFromTime}
                    />
                    <TextInput 
                      style={styles.timeInput} 
                      placeholder="To" 
                      value={toTime}
                      onChangeText={setToTime}
                    />
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={handleAddTime}
                    >
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity 
                    style={styles.timeSlotButton}
                    onPress={() => setShowTimePicker(!showTimePicker)}
                  >
                    <Text style={styles.timeSlotText}>{selectedTime}</Text>
                  </TouchableOpacity>
                  
                  {showTimePicker && (
                    <View style={styles.timePickerContainer}>
                      {timeSlots.map((time) => (
                        <TouchableOpacity
                          key={time}
                          style={[
                            styles.timeOption,
                            selectedTime === time && styles.selectedTimeOption
                          ]}
                          onPress={() => handleTimeSelect(time)}
                        >
                          <Text style={[
                            styles.timeOptionText,
                            selectedTime === time && styles.selectedTimeOptionText
                          ]}>
                            {time}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  parent: {
    flex: 1,
    flexDirection: "row",
  },
  Left: {
    width: "15%",
    backgroundColor: "#FFF5F5",
  },
  Middle: {
    width: "15%",
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#F0F0F0",
  },
  Right: {
    flex: 1,
    backgroundColor: "#FDF4F4CF",
  },
  scrollContainer: {
    padding: 20,
  },
  contentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginTop: "3%",
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileSubtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 10,
  },
  profilePhotoContainer: {
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
    alignSelf: "flex-start",
  },
  profilePhotoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePhoto: {
    width: 78,
    height: 78,
    borderRadius: 39,
  },
  editIconContainer: {
    position: "absolute",
    left: 90,
    bottom: 0,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    width: "20%",
  },
  nameInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  inputField: {
    height: 45,
    borderWidth: 1,
    borderColor: "#9B9A9A",
    borderRadius: 4,
    paddingHorizontal: "5%",
  },
  inputFields: {
    height: 45,
    borderWidth: 1,
    borderColor: "#9B9A9A",
    borderRadius: 4,
    paddingHorizontal: "5%",
    marginRight: "35%",
  },
  fullWidthInput: {
    height: 45,
    borderWidth: 1,
    borderColor: "#9B9A9A",
    borderRadius: 4,
    paddingHorizontal: "16%",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dayButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: "5%",
    marginBottom: 10,
    width: "13%",
    alignItems: "center",
  },
  selectedDayButton: {
    backgroundColor: "#FF7B7B",
    borderColor: "#FF7B7B",
  },
  dayButtonText: {
    fontSize: 14,
    color: "#333",
  },
  selectedDayButtonText: {
    color: "#FFFFFF",
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
    marginTop: 10,
  },
  sessionContainer: {
    marginBottom: 20,
  },
  timeInputContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  timeInput: {
    height: 45,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 4,
    paddingHorizontal: "5%",
    marginRight: 10,
    width: "20%",
  },
  addButton: {
    backgroundColor: "#FF7B7B",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  timeSlotButton: {
    borderWidth: 1,
    borderColor: "#49A9F3",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "10%",
    alignItems: "center",
  },
  timeSlotText: {
    fontSize: 14,
    color: "#333",
  },
  timePickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 4,
    padding: 10,
  },
  timeOption: {
    padding: 8,
    margin: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedTimeOption: {
    backgroundColor: "#49A9F3",
    borderColor: "#49A9F3",
  },
  timeOptionText: {
    fontSize: 12,
    color: "#333",
  },
  selectedTimeOptionText: {
    color: "#FFFFFF",
  },
})

export default EstablishmentTimings;