import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import NewestSidebar from "../../components/DoctorsPortalComponents/NewestSidebar";

const ReminderScreen = () => {
  // Existing state
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
      patient: "Sarah Johnson",
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
  ]);

  // Add Reminder Modal State
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: "",
    patient: "",
    date: "",
    time: "",
    description: "",
    pushNotification: true,
    emailNotification: false,
    smsNotification: false,
    priority: "Medium",
    repeat: "None",
  });

  // Toggle functions
  const toggleReminder = (id) => {
    setReminders(prevReminders =>
      prevReminders.map(reminder =>
        reminder.id === id
          ? { ...reminder, enabled: !reminder.enabled }
          : reminder
      )
    );
  };

  const toggleNotification = (type) => {
    setNewReminder(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // Add new reminder
  const handleAddReminder = () => {
    const newId = reminders.length > 0 ? Math.max(...reminders.map(r => r.id)) + 1 : 1;
    
    const addedReminder = {
      id: newId,
      time: newReminder.time || "00:00 AM",
      priority: newReminder.priority,
      title: newReminder.title || "Reminder",
      patient: newReminder.patient || "Patient X",
      enabled: true,
    };

    setReminders([...reminders, addedReminder]);
    setShowAddReminder(false);
    resetNewReminder();
  };

  const resetNewReminder = () => {
    setNewReminder({
      title: "",
      patient: "",
      date: "",
      time: "",
      description: "",
      pushNotification: true,
      emailNotification: false,
      smsNotification: false,
      priority: "Medium",
      repeat: "None",
    });
  };

  // Filter reminders
  const filteredReminders = reminders.filter(reminder => {
    const matchesSearch = reminder.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reminder.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All Types" || reminder.title === selectedType;
    const matchesStatus = selectedStatus === "All Status" || 
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
                  {["All Types", "Routine Checkup", "Follow-up", "Emergency"].map((type, index) => (
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
                  {["All Status", "Enabled", "Disabled"].map((status, index) => (
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
                    <Text style={[
                      styles.priorityText,
                      reminder.priority === "High" && styles.highPriority,
                      reminder.priority === "Medium" && styles.mediumPriority,
                      reminder.priority === "Low" && styles.lowPriority,
                    ]}>
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
                      reminder.enabled ? styles.toggleButtonOn : styles.toggleButtonOff
                    ]}
                    onPress={() => toggleReminder(reminder.id)}
                  >
                    <Text style={styles.toggleButtonText}>
                      {reminder.enabled ? "Enabled" : "Disabled"}
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
          
          {/* Add Reminder Button */}
          <TouchableOpacity 
            style={styles.addReminderButton}
            onPress={() => setShowAddReminder(true)}
          >
            <Text style={styles.addReminderButtonText}>+ New Reminder</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Add Reminder Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddReminder}
        onRequestClose={() => setShowAddReminder(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowAddReminder(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        
        <View style={styles.addReminderContainer}>
          <Text style={styles.addReminderTitle}>Add Reminder</Text>
          
          <ScrollView style={styles.addReminderForm}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Reminder title</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter title"
                value={newReminder.title}
                onChangeText={(text) => setNewReminder({...newReminder, title: text})}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Patient</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Patient X"
                value={newReminder.patient}
                onChangeText={(text) => setNewReminder({...newReminder, patient: text})}
              />
            </View>
            
            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.formLabel}>Date</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="DD/MM/YYYY"
                  value={newReminder.date}
                  onChangeText={(text) => setNewReminder({...newReminder, date: text})}
                />
              </View>
              
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.formLabel}>Time</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="00:00 AM"
                  value={newReminder.time}
                  onChangeText={(text) => setNewReminder({...newReminder, time: text})}
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Add Description</Text>
              <TextInput
                style={[styles.formInput, { height: 80, textAlignVertical: 'top' }]}
                placeholder="Enter description"
                multiline
                value={newReminder.description}
                onChangeText={(text) => setNewReminder({...newReminder, description: text})}
              />
            </View>
            
            {/* Notification Toggles */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Notifications</Text>
              <View style={styles.notificationOptions}>
                <TouchableOpacity 
                  style={styles.notificationOption}
                  onPress={() => toggleNotification('pushNotification')}
                >
                  <View style={[
                    styles.checkbox,
                    newReminder.pushNotification && styles.checkboxChecked
                  ]}>
                    {newReminder.pushNotification && (
                      <Text style={styles.checkboxTick}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.notificationOptionText}>Push Notification</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.notificationOption}
                  onPress={() => toggleNotification('emailNotification')}
                >
                  <View style={[
                    styles.checkbox,
                    newReminder.emailNotification && styles.checkboxChecked
                  ]}>
                    {newReminder.emailNotification && (
                      <Text style={styles.checkboxTick}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.notificationOptionText}>Email Notification</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.notificationOption}
                  onPress={() => toggleNotification('smsNotification')}
                >
                  <View style={[
                    styles.checkbox,
                    newReminder.smsNotification && styles.checkboxChecked
                  ]}>
                    {newReminder.smsNotification && (
                      <Text style={styles.checkboxTick}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.notificationOptionText}>SMS Notification</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Priority Selection */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Priority</Text>
              <View style={styles.priorityOptions}>
                {['Low', 'Medium', 'High'].map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityOption,
                      newReminder.priority === priority && styles.priorityOptionSelected,
                      priority === 'Low' && styles.priorityLow,
                      priority === 'Medium' && styles.priorityMedium,
                      priority === 'High' && styles.priorityHigh,
                    ]}
                    onPress={() => setNewReminder({...newReminder, priority})}
                  >
                    <Text style={[
                      styles.priorityOptionText,
                      newReminder.priority === priority && styles.priorityOptionSelectedText
                    ]}>
                      {priority}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Repeat Dropdown */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Repeat</Text>
              <TouchableOpacity style={styles.repeatContainer}>
                <Text style={styles.repeatText}>{newReminder.repeat}</Text>
                <Image
                  source={require("../../assets/DoctorsPortal/Icons/DropdownArrow.png")}
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
          
          {/* Save/Cancel Buttons */}
          <View style={styles.formButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => {
                setShowAddReminder(false);
                resetNewReminder();
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleAddReminder}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF",
    height: "100%",
  },
  mainContent: {
    flex: 1,
    padding: "5%",
    backgroundColor: "#F8F8F8",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5%",
    marginLeft: "1%",
  },
  searchFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5%",
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
  addReminderButton: {
    backgroundColor: '#FF7072',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  addReminderButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  addReminderContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: Dimensions.get('window').width * 0.4,
    backgroundColor: '#FFF',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  addReminderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  addReminderForm: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    color: '#555',
    marginBottom: 5,
    fontSize: 14,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#FFF',
    fontSize: 14,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  notificationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 3,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF7072',
    borderColor: '#FF7072',
  },
  checkboxTick: {
    color: '#FFF',
    fontSize: 12,
  },
  notificationOptionText: {
    fontSize: 14,
    color: '#333',
  },
  priorityOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DDD',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  priorityOptionSelected: {
    borderColor: '#FF7072',
    backgroundColor: '#FF7072',
  },
  priorityOptionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  priorityOptionSelectedText: {
    color: '#FFF',
  },
  priorityLow: {
    backgroundColor: '#E8F5E9',
  },
  priorityMedium: {
    backgroundColor: '#FFF8E1',
  },
  priorityHigh: {
    backgroundColor: '#FFEBEE',
  },
  repeatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    padding: 10,
  },
  repeatText: {
    fontSize: 14,
    color: '#333',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 20,
  },
  cancelButton: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DDD',
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#FF7072',
    flex: 1,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ReminderScreen;