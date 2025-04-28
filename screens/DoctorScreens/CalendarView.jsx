import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  Pressable,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import NewestSidebar from "../../components/DoctorsPortalComponents/NewestSidebar"; // Import the separate sidebar component

const CalendarView = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [viewMode, setViewMode] = useState("Day");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchText, setSearchText] = useState("");

  // Sample data - in a real app this would come from API
  const appointmentData = {
    Monday: [
      {
        time: "9:00 AM",
        patientName: "Sarah Johnson",
        appointmentType: "Regular Checkup",
        status: "Confirmed",
        statusColor: "#4cd964",
      },
    ],
    Tuesday: [],
    Wednesday: [
      {
        time: "9:00 AM",
        patientName: "Sarah Johnson",
        appointmentType: "Acute Pain",
        status: "Emergency",
        statusColor: "#ff3b30",
      },
    ],
    Thursday: [],
    Friday: [
      {
        time: "9:00 AM",
        patientName: "Sarah Johnson",
        appointmentType: "Post Surgery",
        status: "Follow Up",
        statusColor: "#ffcc00",
      },
    ],
    Saturday: [],
    Sunday: [],
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Function to simulate API data loading
  useEffect(() => {
    // This would be an API call in a real app
    console.log("Loading calendar data...");
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderAppointment = (day) => {
    const appointments = appointmentData[day] || [];

    if (appointments.length === 0) {
      return (
        <View style={styles.emptyAppointmentCard}>
          <Text style={styles.availableText}>Available</Text>
        </View>
      );
    }

    return appointments.map((appointment, index) => (
      <View
        key={index}
        style={[
          styles.appointmentCard,
          day === "Monday"
            ? styles.confirmedCard
            : day === "Wednesday"
            ? styles.emergencyCard
            : day === "Friday"
            ? styles.followUpCard
            : styles.emptyAppointmentCard,
        ]}
      >
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{appointment.time}</Text>
        </View>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: appointment.statusColor },
            ]}
          >
            <Text style={styles.statusText}>{appointment.status}</Text>
          </View>
        </View>

        <View style={styles.patientContainer}>
          <Text style={styles.patientName}>{appointment.patientName}</Text>
          <Text style={styles.appointmentType}>
            {appointment.appointmentType}
          </Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Sidebar for larger screens or when open */}
      {(width >= 900 || sidebarOpen) && (
        <View style={styles.sidebarContainer}>
          <NewestSidebar
            navigation={navigation}
            closeSidebar={toggleSidebar}
            activeItem="Calendar"
          />
        </View>
      )}

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Header with menu button for smaller screens */}
        {width < 900 && !sidebarOpen && (
          <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
            <MaterialIcons name="menu" size={24} color="black" />
          </TouchableOpacity>
        )}

        {/* Calendar Header */}
        <View style={styles.calendarHeader}>
          <Text style={styles.calendarTitle}>Calendar</Text>

          <View style={styles.viewToggleContainer}>
            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                viewMode === "Day" && styles.activeViewToggle,
              ]}
              onPress={() => setViewMode("Day")}
            >
              <Text
                style={[
                  styles.viewToggleText,
                  viewMode === "Day" && styles.activeViewToggleText,
                ]}
              >
                Day
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                viewMode === "Week" && styles.activeViewToggle,
              ]}
              onPress={() => setViewMode("Week")}
            >
              <Text
                style={[
                  styles.viewToggleText,
                  viewMode === "Week" && styles.activeViewToggleText,
                ]}
              >
                Week
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                viewMode === "Month" && styles.activeViewToggle,
              ]}
              onPress={() => setViewMode("Month")}
            >
              <Text
                style={[
                  styles.viewToggleText,
                  viewMode === "Month" && styles.activeViewToggleText,
                ]}
              >
                Month
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search and Filter Controls - Now in a single row */}
        <View style={styles.controlsContainer}>
          <View style={styles.filterButtonsContainer}>
            <View style={styles.searchContainer}>
              <MaterialIcons
                name="search"
                size={20}
                color="#888"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Appointment"
                value={searchText}
                onChangeText={setSearchText}
              />
              <MaterialIcons name="filter-list" size={20} color="#ff6347" />
            </View>

            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>All Types</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>All Status</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.syncButton}>
              <Text style={styles.syncButtonText}>Sync Google Calendar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.newAppointmentButton}>
              <Text style={styles.newAppointmentText}>New Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar Grid */}
        <ScrollView style={styles.calendarGrid}>
          <View style={styles.daysContainer}>
            {days.map((day, index) => (
              <View key={index} style={styles.dayColumn}>
                <Text style={styles.dayHeader}>{day}</Text>
                {renderAppointment(
                  day === "Mon"
                    ? "Monday"
                    : day === "Tue"
                    ? "Tuesday"
                    : day === "Wed"
                    ? "Wednesday"
                    : day === "Thu"
                    ? "Thursday"
                    : day === "Fri"
                    ? "Friday"
                    : day === "Sat"
                    ? "Saturday"
                    : "Sunday"
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  sidebarContainer: {
    width: "15%", // Adjusted to percentage
    backgroundColor: "#f5f5f5",
    ...Platform.select({
      web: {
        height: "100vh",
      },
      default: {
        height: "100%",
      },
    }),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FDF8F8", // Lighter background to match design
    padding: "1.5%", // Using percentage for responsiveness
  },
  menuButton: {
    position: "absolute",
    top: "2%",
    left: "2%",
    zIndex: 10,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2%",
    paddingHorizontal: "1%",
  },
  calendarTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  viewToggleContainer: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  viewToggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  activeViewToggle: {
    backgroundColor: "#ff6347",
  },
  viewToggleText: {
    fontSize: 16,
    color: "#333",
  },
  activeViewToggleText: {
    color: "#fff",
  },
  controlsContainer: {
    backgroundColor: "#f0f2ff",
    padding: "1.5%",
    borderRadius: 12,
    marginBottom: "2%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    minWidth: 150,
  },
  filterButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  filterButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  filterButtonText: {
    color: "#333",
    fontSize: 14,
  },
  syncButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  syncButtonText: {
    color: "#333",
    fontSize: 14,
  },
  newAppointmentButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  newAppointmentText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  calendarGrid: {
    flex: 1,
    backgroundColor: "#f0f2ff",
    borderRadius: 12,
  },
  daysContainer: {
    flexDirection: "row",
    flex: 1,
    padding: "1.5%",
  },
  dayColumn: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: "0.5%",
  },
  dayHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  appointmentCard: {
    width: "100%",
    padding: "5%",
    borderRadius: 8,
    marginBottom: 8,
    minHeight: 100,
  },
  emptyAppointmentCard: {
    width: "100%",
    padding: "5%",
    borderRadius: 8,
    marginBottom: 8,
    minHeight: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmedCard: {
    backgroundColor: "#e6ffed",
  },
  emergencyCard: {
    backgroundColor: "#ffebe6",
  },
  followUpCard: {
    backgroundColor: "#fff9e6",
  },
  availableText: {
    color: "#999",
    fontSize: 14,
  },
  timeContainer: {
    marginBottom: "5%",
  },
  timeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  statusContainer: {
    marginBottom: "5%",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  patientContainer: {
    marginTop: "2%",
  },
  patientName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  appointmentType: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});

export default CalendarView;
