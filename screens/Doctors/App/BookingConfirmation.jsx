import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, Linking } from 'react-native';

const { width, height } = Dimensions.get('window');

const BookingConfirmation = ({ navigation }) => {
  const handleAddToCalendar = () => {
    const startDate = new Date(2025, 1, 17, 7, 0, 0);
    const endDate = new Date(2025, 1, 17, 7, 30, 0);
    
    const calendarUrl = Platform.select({
      ios: `calshow:?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&title=Appointment with Dr. Kislay Shrivasatva`,
      android: `content://com.android.calendar/time/${startDate.getTime()}?title=Appointment with Dr. Kislay Shrivasatva`,
    });

    Linking.openURL(calendarUrl).catch(() => {
      Linking.openURL(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${
        startDate.toISOString().replace(/[-:]/g, '').split('.')[0]
      }/${
        endDate.toISOString().replace(/[-:]/g, '').split('.')[0]
      }&text=Appointment with Dr. Kislay Shrivasatva`);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Booking Confirmed</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.messageContainer}>
          <Text style={styles.thanksText}>Thanks Your booking has been</Text>
          <Text style={styles.confirmedText}>confirmed</Text>
        </View>
        
        <View style={styles.doctorInfo}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>KS</Text>
          </View>
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>Dr Kislay Shrivasatva</Text>
            <Text style={styles.doctorSpecialty}>(Cardiologist)</Text>
          </View>
        </View>
        
        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>07:00</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>17Feb,2025</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.calendarButton}
          onPress={handleAddToCalendar}
        >
          <Text style={styles.calendarButtonText}>+Add to Calendar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: width * 0.05,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24, // Fixed value
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thanksText: {
    fontSize: 18, // Fixed value
    color: '#555',
  },
  confirmedText: {
    fontSize: 22, // Fixed value
    fontWeight: 'bold',
    color: '#000',
    marginTop: height * 0.01,
  },
  doctorInfo: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: width * 0.05,
  },
  avatarPlaceholder: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 30, // Fixed value
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.04,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20, // Fixed value
    fontWeight: 'bold',
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18, // Fixed value
    fontWeight: 'bold',
    color: '#000',
  },
  doctorSpecialty: {
    fontSize: 16, // Fixed value
    color: '#666',
    marginTop: height * 0.005,
  },
  bookingDetails: {
    flex: 0.3,
    width: '80%',
    borderTopWidth: 1, // Fixed value
    borderBottomWidth: 1, // Fixed value
    borderColor: '#eee',
    justifyContent: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.01,
  },
  detailLabel: {
    fontSize: 16, // Fixed value
    color: '#666',
  },
  detailValue: {
    fontSize: 16, // Fixed value
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  doneButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: height * 0.02,
    borderRadius: 8, // Fixed value
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18, // Fixed value
    fontWeight: 'bold',
  },
  calendarButton: {
    borderWidth: 1, // Fixed value
    borderColor: '#4a90e2',
    paddingVertical: height * 0.02,
    borderRadius: 8, // Fixed value
    alignItems: 'center',
  },
  calendarButtonText: {
    color: '#4a90e2',
    fontSize: 18, // Fixed value
    fontWeight: 'bold',
  },
});

export default BookingConfirmation;