import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Platform,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Newest Side Navigation Bar Component
const NewestSidebar = ({ activeItem = "Reminder" }) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [selectedItem, setSelectedItem] = useState(activeItem);

  const menuItems = [
    {
      name: "Calendar",
      icon: require("../../assets/DoctorsPortal/Icons/calendar.png"),
    },
    {
      name: "Appointments",
      icon: require("../../assets/DoctorsPortal/Icons/appointment.png"),
    },
    {
      name: "History",
      icon: require("../../assets/DoctorsPortal/Icons/history.png"),
    },
    {
      name: "Reminder",
      icon: require("../../assets/DoctorsPortal/Icons/reminder.png"),
    },
    {
      name: "Notification",
      icon: require("../../assets/DoctorsPortal/Icons/notification2.png"),
    },
  ];

  const lowerMenuItems = [
    {
      name: "Settings",
      icon: require("../../assets/DoctorsPortal/Icons/GearSix.png"),
    },
    {
      name: "Contact Us",
      icon: require("../../assets/DoctorsPortal/Icons/cloudcheck.png"),
    },
    {
      name: "Help",
      icon: require("../../assets/DoctorsPortal/Icons/help.png"),
    },
  ];

  const handleSidebarClick = (menu) => {
    setSelectedItem(menu);
    navigation.navigate(menu);
  };

  return (
    <View style={sidebarStyles.parent}>
      {/* Top Section with Logo */}
      <View style={sidebarStyles.top_sidebar}>
        <View style={sidebarStyles.topimage_sidebar}>
          <Image
            source={require("../../assets/DoctorsPortal/Images/KokoroLogo.png")}
            style={sidebarStyles.heartImage}
          />
        </View>
        <Text style={sidebarStyles.title}>Kokoro.Doctor</Text>
      </View>

      {/* Upper Menu Items */}
      <View style={sidebarStyles.upper_sidebar}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            style={[
              sidebarStyles.menuItemContainer,
              selectedItem === item.name && sidebarStyles.selectedMenuItem,
            ]}
            onPress={() => handleSidebarClick(item.name)}
          >
            <Image source={item.icon} style={sidebarStyles.menuIcon} />
            <Text
              style={[
                sidebarStyles.menuText,
                selectedItem === item.name && sidebarStyles.selectedMenuText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lower Menu Items */}
      <View style={sidebarStyles.lower_sidebar}>
        {lowerMenuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            style={[
              sidebarStyles.menuItemContainer,
              selectedItem === item.name && sidebarStyles.selectedMenuItem,
            ]}
            onPress={() => handleSidebarClick(item.name)}
          >
            <Image source={item.icon} style={sidebarStyles.menuIcon} />
            <Text
              style={[
                sidebarStyles.menuText,
                selectedItem === item.name && sidebarStyles.selectedMenuText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Main Reminder Screen Component
const Reminder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [reminders, setReminders] = useState([
    {
      id: 1,
      time: "9:00 AM",
      priority: "Medium",
      title: "Routine Checkup",
      patient: "Starch Johnson",
      enabled: true,
    },
    {
      id: 2,
      time: "10:30 AM",
      priority: "High",
      title: "Follow-up Visit",
      patient: "Sarah Johnson",
      enabled: false,
    },
    {
      id: 3,
      time: "2:15 PM",
      priority: "Low",
      title: "Annual Physical",
      patient: "Michael Brown",
      enabled: true,
    },
  ]);

  const reminderTypes = [
    "All Types",
    "Routine Checkup",
    "Follow-up",
    "Emergency",
  ];
  const reminderStatuses = ["All Status", "Enabled", "Disabled"];

  const toggleReminder = (id) => {
    setReminders((prevReminders) =>
      prevReminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, enabled: !reminder.enabled }
          : reminder
      )
    );
  };

  const filteredReminders = reminders.filter((reminder) => {
    const matchesSearch =
      reminder.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reminder.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === "All Types" || reminder.title === selectedType;
    const matchesStatus =
      selectedStatus === "All Status" ||
      (selectedStatus === "Enabled" && reminder.enabled) ||
      (selectedStatus === "Disabled" && !reminder.enabled);

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <View style={styles.container}>
      {/* Side Navigation Bar */}
      <NewestSidebar activeItem="Reminder" />

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        <Text style={styles.screenTitle}>Reminder</Text>

        {/* Search and Filter Section */}
        <View style={styles.searchFilterContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search appointments..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.filterContainer}>
            {/* Type Dropdown */}
            <View style={styles.dropdownWrapper}>
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => {
                  setShowTypeDropdown(!showTypeDropdown);
                  setShowStatusDropdown(false);
                }}
              >
                <Text style={styles.filterButtonText}>{selectedType}</Text>
                <Image
                  source={require("../../assets/DoctorsPortal/Icons/DropdownArrow.png")}
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>

              {showTypeDropdown && (
                <View style={[styles.dropdown, { zIndex: 2 }]}>
                  {reminderTypes.map((type, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedType(type);
                        setShowTypeDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Status Dropdown */}
            <View style={styles.dropdownWrapper}>
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => {
                  setShowStatusDropdown(!showStatusDropdown);
                  setShowTypeDropdown(false);
                }}
              >
                <Text style={styles.filterButtonText}>{selectedStatus}</Text>
                <Image
                  source={require("../../assets/DoctorsPortal/Icons/DropdownArrow.png")}
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>

              {showStatusDropdown && (
                <View style={[styles.dropdown, { zIndex: 1 }]}>
                  {reminderStatuses.map((status, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedStatus(status);
                        setShowStatusDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{status}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Reminders List */}
        <ScrollView style={styles.remindersContainer}>
          {filteredReminders.length > 0 ? (
            filteredReminders.map((reminder) => (
              <View key={reminder.id} style={styles.reminderCard}>
                <View style={styles.reminderHeader}>
                  <View style={styles.timePriorityContainer}>
                    <Text style={styles.timeText}>[{reminder.time}]</Text>
                    <Text
                      style={[
                        styles.priorityText,
                        reminder.priority === "High" && styles.highPriority,
                        reminder.priority === "Medium" && styles.mediumPriority,
                        reminder.priority === "Low" && styles.lowPriority,
                      ]}
                    >
                      {reminder.priority}
                    </Text>
                  </View>

                  <View style={styles.reminderTitleContainer}>
                    <Text style={styles.reminderTitle}>{reminder.title}</Text>
                  </View>
                </View>

                <View style={styles.reminderFooter}>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      reminder.enabled
                        ? styles.toggleButtonOn
                        : styles.toggleButtonOff,
                    ]}
                    onPress={() => toggleReminder(reminder.id)}
                  >
                    <Text style={styles.toggleButtonText}>
                      {reminder.enabled ? "Enable" : "Disable"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.snoozeButton}>
                    <Text style={styles.snoozeButtonText}>Snooze</Text>
                  </TouchableOpacity>

                  <Text style={styles.patientName}>{reminder.patient}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No reminders found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

// Main Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF",
    height: "100%",
  },
  mainContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    marginLeft: 5,
  },
  searchFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  searchContainer: {
    width: "50%",
  },
  searchInput: {
    height: 40,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    fontSize: 14,
    color: "#333",
  },
  filterContainer: {
    flexDirection: "row",
    width: "45%",
    justifyContent: "space-between",
  },
  dropdownWrapper: {
    width: "48%",
    position: "relative",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
    width: "100%",
  },
  filterButtonText: {
    color: "#333",
    fontSize: 14,
  },
  dropdownIcon: {
    width: 16,
    height: 16,
    tintColor: "#666",
  },
  dropdown: {
    position: "absolute",
    top: 40,
    left: 0,
    width: "100%",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  dropdownItemText: {
    color: "#333",
    fontSize: 14,
  },
  remindersContainer: {
    flex: 1,
  },
  reminderCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EEE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reminderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  timePriorityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    color: "#555",
    fontSize: 14,
    marginRight: 10,
  },
  priorityText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "500",
  },
  highPriority: {
    backgroundColor: "#FFEBEE",
    color: "#D32F2F",
  },
  mediumPriority: {
    backgroundColor: "#FFF8E1",
    color: "#FFA000",
  },
  lowPriority: {
    backgroundColor: "#E8F5E9",
    color: "#388E3C",
  },
  reminderTitleContainer: {
    flex: 1,
    marginLeft: 15,
  },
  reminderTitle: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  reminderFooter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  toggleButtonOn: {
    backgroundColor: "#4CAF50",
  },
  toggleButtonOff: {
    backgroundColor: "#F44336",
  },
  toggleButtonText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "500",
  },
  snoozeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#2196F3",
    marginRight: "auto",
  },
  snoozeButtonText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "500",
  },
  patientName: {
    color: "#333",
    fontWeight: "600",
    fontSize: 14,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  noResultsText: {
    color: "#666",
    fontSize: 16,
  },
});

// Sidebar Styles (separate to avoid conflicts)
const sidebarStyles = StyleSheet.create({
  parent: {
    width: "15%",
    height: "100%",
    backgroundColor: "#FFF",
    borderRightWidth: 1,
    borderRightColor: "#EEE",
  },
  top_sidebar: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    marginBottom: 40,
    marginTop: 10,
  },
  topimage_sidebar: {
    width: "15%",
    marginVertical: "1%",
    flexDirection: "row",
  },
  heartImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    width: "70%",
    fontSize: 18,
    color: "rgba(0, 0, 0, 0.46)",
    fontWeight: "bold",
    marginLeft: 10,
  },
  upper_sidebar: {
    height: "40%",
    marginBottom: 50,
  },
  lower_sidebar: {
    height: "30%",
    justifyContent: "center",
    paddingBottom: 20,
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 8,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    resizeMode: "contain",
    tintColor: "#666",
  },
  menuText: {
    width: "85%",
    fontSize: 14,
    color: "#333",
  },
  selectedMenuItem: {
    backgroundColor: "#FF7072",
  },
  selectedMenuText: {
    color: "#FFF",
  },
});

export default Reminder;
