import React, { useCallback, useState, useEffect } from "react";
import {
  Alert,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Platform,
  useWindowDimensions,
  Dimensions,
  StatusBar,
  ScrollView
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SideBarNavigation from "../../../components/PatientScreenComponents/SideBarNavigation";
import Header from "../../../components/PatientScreenComponents/Header";
import { API_URL } from "../../../env-vars";

const { width, height } = Dimensions.get("window");

const DoctorsInfoWithRating = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const doctors = route.params?.doctors || {}; // Get doctor data from navigation
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const handleSearch = () => {
    Alert.alert(`Search Results for: ${searchQuery}`);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // const handleDateSelect = (date) => {
  //   setSelectedDate(date);
  // };

  const handleTimeSelect = (time) => {
    setSelectedTimeSlot(time);
  };

  // Function to handle redirection for booking
  const handleBooking = (timeSlot, doctorData, clinicData) => {
    setSelectedTimeSlot(timeSlot);
    // Navigate to a payment page passing the data through the route params
    navigation.navigate("DoctorsPaymentScreen");
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot((prevSlot) => (prevSlot === slot ? null : slot));
  };
  const selectedSlots =
    selectedDay && doctors.availability[selectedDay]?.slots
      ? doctors.availability[selectedDay].slots
      : { morning: [], afternoon: [] };

  const chunkSize = 3;

  const availabilityArray = doctors?.availability
    ? Object.keys(doctors.availability).map((day) => ({
        day,
        slotsAvailable: doctors.availability[day]?.slotsAvailable || 0,
        slots: doctors.availability[day]?.slots || [0],
      }))
    : [];

  const chunkedAvailability = [];
  for (let i = 0; i < availabilityArray.length; i += chunkSize) {
    chunkedAvailability.push(availabilityArray.slice(i, i + chunkSize));
  }

  const [visibleChunks, setVisibleChunks] = useState(1); // Show first 3 days initially
  const loadMoreDays = () => {
    if (visibleChunks < chunkedAvailability.length) {
      setVisibleChunks(visibleChunks + 1);
    }
  };

  const clinicData = {
    name: "Wisdom Clinics",
    fee: "₹800 fee",
    waitTime: "Max 15 min wait",
    layout: "Hsr Layout",
  };

  // const availableDates = [
  //   { id: "today", label: "Today", slotsAvailable: 0 },
  //   { id: "tomorrow", label: "Tomorrow", slotsAvailable: 2 },
  //   { id: "dayAfter", label: "Mon, 2 feb", slotsAvailable: 2 },
  // ];

  // const timeSlots = {
  //   morning: { label: "Morning (1 slot)", slots: ["10:30 AM"] },
  //   afternoon: { label: "Afternoon (1 slot)", slots: ["12:30 PM"] },
  // };
  // useEffect(() => {
  //   const getDatesAndSlots = async () => {
  //     const today = new Date();
  //     const days = [0, 1, 2]; // Today, Tomorrow, Day After
  //     const promises = days.map(async (offset) => {
  //       const date = new Date(today);
  //       date.setDate(today.getDate() + offset);
  //       const dateString = date.toISOString().slice(0, 10); // 'YYYY-MM-DD'

  //       try {
  //         const res = await fetch(`${API_URL}/doctorBookings/available`, {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             doctor_id: doctors.id || doctors.email,
  //             date: dateString,
  //           }),
  //         });
  //         console.log(`Response status for ${dateString}:`,res.status);

  //         const data = await res.json();
  //         console.log("Slots fetched for", dateString, data.slots);
  //         return {
  //           id: offset === 0 ? "today" : offset === 1 ? "tomorrow" : "dayAfter",
  //           label:
  //             offset === 0
  //               ? "Today"
  //               : offset === 1
  //               ? "Tomorrow"
  //               : date.toLocaleDateString("en-US", {
  //                   weekday: "short",
  //                   day: "numeric",
  //                   month: "short",
  //                 }),
  //           date: dateString,
  //           slots: data.slots || [],
  //         };
  //       } catch (e) {
  //         console.error(`Error fetching slots for ${dateString}:`, e);
  //         return {
  //           // id: offset,
  //           id: `err-${offset}`,
  //           label: date.toDateString(),
  //           date: dateString,
  //           slots: [],
  //         };
  //       }
  //     });

  //     const results = await Promise.all(promises);
  //     setAvailableDates(results);
  //     if (results.length>0) {
  //       setSelectedDate(results[0].date); // Default to today
  //       setAvailableSlots(results[0].slots);
  //       console.log(results);
  //     }
  //   };

  //   if (doctors?.id || doctors?.email) {
  //     console.log("doctors object:", doctors);
  //     getDatesAndSlots();
  //   }
  // }, [doctors]);
  useEffect(() => {
    const getDatesAndSlots = async () => {
      const today = new Date();
      const next3Days = Array.from({ length: 3 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return date;
      });

      const promises = next3Days.map(async (date) => {
        const dateString = date.toISOString().slice(0, 10); // 'YYYY-MM-DD'
        const weekday = date.toLocaleDateString("en-US", { weekday: "long" }); // "Monday"

        try {
          const res = await fetch(`${API_URL}/doctorBookings/available`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              doctor_id: doctors.id || doctors.email,
              date: dateString,
            }),
          });

          console.log(`Response ${res.status} for ${weekday} (${dateString})`);
          const data = await res.json();
          console.log(
            `Slots for ${weekday} (${dateString}):`,
            JSON.stringify(data, null, 2)
          );

          return {
            id: dateString,
            label: `${weekday}, ${date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })}`,
            date: dateString,
            slots: data.slots || [],
          };
        } catch (e) {
          console.error(`Error fetching slots for ${dateString}:`, e);
          return {
            id: dateString,
            label: `${weekday}, ${date.toDateString()}`,
            date: dateString,
            slots: [],
          };
        }
      });

      const results = await Promise.all(promises);
      setAvailableDates(results);

      if (results.length > 0) {
        console.log("Selected date's slots:", results[0].slots);
        setSelectedDate(results[0].date);
        setAvailableSlots(results[0].slots);
      }
    };

    if (doctors?.id || doctors?.email) {
      console.log("Doctor ID:", doctors.id || doctors.email);
      getDatesAndSlots();
    }
  }, [doctors]);

  const handleDateSelect = (dateStr) => {
    const selected = availableDates.find((d) => d.date === dateStr);
    setSelectedDate(dateStr);
    setAvailableSlots(selected?.slots || []);
    setSelectedTimeSlot(null);
  };

  const handleBookAppointment = () => {
    navigation.navigate("AppDoctorsRating");
  };

  return (
    <>
      {Platform.OS === "web" && width > 1000 && (
        <View style={styles.webContainer}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../../../assets/Images/MedicineBackground.png")}
              style={styles.imageBackground}
            >
              <View
                style={[
                  styles.overlay,
                  { backgroundColor: "rgba(16, 16, 16, 0.3)" },
                ]}
              />

              <View style={styles.parent}>
                {/* Keeping the existing sidebar navigation as requested */}
                <View style={styles.Left}>
                  <SideBarNavigation navigation={navigation} />
                </View>

                <View style={styles.Right}>
                  <View style={styles.header}>
                    <Header navigation={navigation} />
                  </View>

                  <View style={styles.contentContainer}>
                    {/* Doctor profile card */}
                    <View style={styles.doctorProfileCard}>
                      <View style={styles.doctorLeftSection}>
                        <Image
                          source={doctors.profilePhoto}
                          style={styles.doctorImage}
                        />
                        <View style={styles.ratingContainer}>
                          <MaterialIcons
                            name="star"
                            size={20}
                            color="#FFD700"
                          />
                          <Text style={styles.ratingText}>
                            {"4.5"}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.doctorInfoSection}>
                        <Text style={styles.doctorName}>
                          {doctors.doctorname}
                        </Text>
                        <Text style={styles.doctorCredentials}>
                          {doctors.specialization}
                        </Text>
                        <Text style={styles.doctorExperience}>
                          {doctors.experience}
                        </Text>
                        <Text style={styles.doctorBio}>
                          {doctors.doctorname} specialized in{" "}
                          {doctors.specialization}, with an experience of{" "}
                          {doctors.experience}.
                        </Text>

                        <View style={styles.reviewsSection}>
                          <Text style={styles.reviewsTitle}>User Reviews</Text>

                          <View style={styles.reviewsList}>
                            {[1, 2, 3].map((id) => (
                              <View key={id} style={styles.reviewCard}>
                                <Text style={styles.reviewText}>
                                  Very good Doctor
                                </Text>
                                <View style={styles.reviewerContainer}>
                                  {[...Array(5)].map((_, i) => (
                                    <MaterialIcons
                                      key={i}
                                      name="star"
                                      size={16}
                                      color="#FFD700"
                                    />
                                  ))}
                                  <Text style={styles.reviewerName}>
                                    Mr Donald
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* Appointment booking section */}
                    <View style={styles.appointmentSection}>
                      <View style={styles.appointmentHeader}>
                        <Text style={styles.appointmentTitle}>
                          Clinic Appointment
                        </Text>
                        <Text style={styles.appointmentFee}>
                          {clinicData.fee}
                        </Text>
                      </View>

                      <View style={styles.clinicDetails}>
                        <Text style={styles.clinicName}>{clinicData.name}</Text>
                        <Text style={styles.clinicWaitTime}>
                          {clinicData.waitTime}
                        </Text>
                        <Text style={styles.clinicLocation}>
                          {clinicData.layout}
                        </Text>
                      </View>

                      {/* <View style={styles.dateSelector}>
                        {availableDates.map((date) => (
                          <TouchableOpacity
                            key={date.id}
                            style={[
                              styles.dateOption,
                              selectedDate === date.label &&
                                styles.selectedDate,
                            ]}
                            onPress={() => handleDateSelect(date.label)}
                          >
                            <Text style={styles.dateLabel}>{date.label}</Text>
                            <Text style={styles.slotsAvailable}>
                              {date.slotsAvailable > 0
                                ? `${date.slotsAvailable} slots Available`
                                : "No slot today"}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View> */}
                      <View style={styles.dateSelector}>
                        {availableDates.map((date) => (
                          <TouchableOpacity
                            key={date.id}
                            style={[
                              styles.dateOption,
                              selectedDate === date.date && styles.selectedDate,
                            ]}
                            onPress={() => handleDateSelect(date.date)}
                          >
                            <Text style={styles.dateLabel}>{date.label}</Text>
                            <Text style={styles.slotsAvailable}>
                              {date.slots.length > 0
                                ? `${date.slots.length} slots Available`
                                : "No slot"}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>

                      {/* <View style={styles.timeSlotSection}>
                        <View style={styles.timeSlotsGroup}>
                          <Text style={styles.timeGroupLabel}>
                            {timeSlots.morning.label}
                          </Text>
                          <View style={styles.timeSlotsContainer}>
                            {timeSlots.morning.slots.map((time) => (
                              <TouchableOpacity
                                key={time}
                                style={[
                                  styles.timeSlot,
                                  selectedTimeSlot === time &&
                                    styles.selectedTimeSlot,
                                ]}
                                onPress={() =>
                                  handleBooking(time, doctors, clinicData)
                                }
                              >
                                <Text style={styles.timeSlotText}>{time}</Text>
                                <Text style={styles.bookNowText}>Book Now</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>

                        <View style={styles.timeSlotsGroup}>
                          <Text style={styles.timeGroupLabel}>
                            {timeSlots.afternoon.label}
                          </Text>
                          <View style={styles.timeSlotsContainer}>
                            {timeSlots.afternoon.slots.map((time) => (
                              <TouchableOpacity
                                key={time}
                                style={[
                                  styles.timeSlot,
                                  selectedTimeSlot === time &&
                                    styles.selectedTimeSlot,
                                ]}
                                onPress={() =>
                                  handleBooking(time, doctors, clinicData)
                                }
                              >
                                <Text style={styles.timeSlotText}>{time}</Text>
                                <Text style={styles.bookNowText}>Book Now</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      </View> */}
                      <View style={styles.timeSlotSection}>
                        {availableSlots.length > 0 ? (
                          <ScrollView
                            style={styles.timeSlotScroll}
                            contentContainerStyle={styles.timeSlotsContainer}
                          >
                            {availableSlots.map((slot, idx) => {
                              const isFull = slot.available === 0;
                              return (
                                <TouchableOpacity
                                  key={idx}
                                  disabled={isFull}
                                  style={[
                                    styles.timeSlot,
                                    selectedTimeSlot === slot.start &&
                                      styles.selectedTimeSlot,
                                    isFull && { backgroundColor: "#ccc" },
                                  ]}
                                  onPress={() => {
                                    setSelectedTimeSlot(slot.start);
                                    handleBooking(
                                      slot.start,
                                      doctors,
                                      clinicData
                                    );
                                  }}
                                >
                                  <Text style={styles.timeSlotText}>
                                    {slot.start} - {slot.end}
                                  </Text>
                                  <Text style={styles.bookNowText}>
                                    {isFull ? "Full" : `${slot.available}`}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </ScrollView>
                        ) : (
                          <Text style={styles.noSlotText}>
                            No slots available for this date
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      )}
      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.appContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#fff" />
          {/* <View style={{ flex: 1 }}> */}
          <View style={styles.appImageContainer}>
            <Image source={doctors.image} style={styles.doctorImage} />
            <Text style={styles.doctorName}>{doctors.name}</Text>
            <Text style={styles.doctorCredentials}>({doctors.credential})</Text>
          </View>

          <View style={styles.experienceRatingContainer}>
            <View style={styles.experienceSection}>
              <Image
                source={require("../../../assets/Icons/doctorTool.png")}
                style={styles.doctorIcon}
              />
              <View style={styles.experienceDetail}>
                <Text style={styles.experienceText}>Total Experience</Text>
                <Text style={styles.experience}>{doctors.experience}</Text>
              </View>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.ratingSection}>
              <Image
                source={require("../../../assets/Icons/Star.png")}
                style={styles.doctorIcon}
              />
              <TouchableOpacity style={styles.ratingDetail}>
                <Text style={styles.ratingText}>Rating & Reviews</Text>
                <Text style={styles.rating}>{doctors.ratingreview}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.OfflineOnlineMode}>
            <TouchableOpacity style={styles.OfflineMode}>
              <Image
                source={require("../../../assets/Icons/offline.png")}
                style={styles.offlineIcon}
              />
              <Text style={styles.offlineText}>Offline Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.OnlineMode}>
              <Image
                source={require("../../../assets/Icons/videocall.png")}
                style={styles.onlineIcon}
              />
              <Text style={styles.onlineText}>Online Appointment</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.consultationFess}>
            <View style={styles.iconBox}>
              <Image
                source={require("../../../assets/Icons/dollarIcon.png")}
                style={styles.dollarIcon}
              />
            </View>
            <View style={styles.feesBox}>
              <Text style={styles.fees}>{doctors.consultationFees}</Text>
              <Text style={styles.feesText}>Consultation fees</Text>
            </View>
          </View>

          <View style={styles.availabilityContainer}>
            <Text style={styles.availabilityTimeText}>Available Time</Text>
            <View style={styles.availabilityShowBox}>
              <View style={styles.availabilityBox}>
                <FlatList
                  //   data={availabilityList}
                  data={chunkedAvailability.slice(0, visibleChunks).flat()}
                  horizontal
                  keyExtractor={(item) => item.day}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 8 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.dayColumn,
                        selectedDay === item.day && styles.selectedDay,
                      ]}
                      onPress={() => setSelectedDay(item.day)}
                    >
                      <Text style={styles.dayTitle}>
                        {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                      </Text>
                      <Text style={styles.slotsAvailable}>
                        {item.slotsAvailable > 0
                          ? `${item.slotsAvailable} slots Available`
                          : "No slot today"}
                      </Text>
                    </TouchableOpacity>
                  )}
                  onEndReached={loadMoreDays}
                  onEndReachedThreshold={0.5}
                />
              </View>

              {selectedDay && (
                <View style={styles.timeSlotContainer}>
                  {/* Check if all slots are empty */}
                  {selectedSlots.morning.length === 0 &&
                  selectedSlots.afternoon.length === 0 ? (
                    <View style={styles.noSlotsContainer}>
                      <Text style={styles.noSlots}>No slots available</Text>
                    </View>
                  ) : (
                    <>
                      {/* Morning Slots */}
                      <Text style={styles.slotCategory}>Morning</Text>
                      <View style={styles.slotGrid}>
                        {selectedSlots.morning.length > 0 ? (
                          selectedSlots.morning
                            .slice(0, 2)
                            .map((slot, index) => (
                              <TouchableOpacity
                                key={index}
                                style={[
                                  styles.slotButton,
                                  selectedSlot === slot && styles.selectedSlot, // Apply selected style
                                ]}
                                onPress={() => handleSlotSelection(slot)}
                              >
                                <Text
                                  style={[
                                    styles.slotText,
                                    selectedSlot === slot &&
                                      styles.selectedSlotText, // Change text color
                                  ]}
                                >
                                  {slot}
                                </Text>
                              </TouchableOpacity>
                            ))
                        ) : (
                          <Text style={styles.noSlots}>
                            No morning slots available
                          </Text>
                        )}
                      </View>

                      {/* Afternoon Slots */}
                      <Text style={styles.slotCategory}>Afternoon</Text>
                      <View style={styles.slotGrid}>
                        {selectedSlots.afternoon.length > 0 ? (
                          selectedSlots.afternoon
                            .slice(0, 2)
                            .map((slot, index) => (
                              <TouchableOpacity
                                key={index}
                                style={[
                                  styles.slotButton,
                                  selectedSlot === slot && styles.selectedSlot, // Apply selected style
                                ]}
                                onPress={() => handleSlotSelection(slot)}
                              >
                                <Text
                                  style={[
                                    styles.slotText,
                                    selectedSlot === slot &&
                                      styles.selectedSlotText, // Change text color
                                  ]}
                                >
                                  {slot}
                                </Text>
                              </TouchableOpacity>
                            ))
                        ) : (
                          <Text style={styles.noSlots}>
                            No afternoon slots available
                          </Text>
                        )}
                      </View>
                    </>
                  )}
                </View>
              )}

              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() =>
                  navigation.navigate("DoctorAvailabilitySlots", {
                    doctors: doctors,
                  })
                }
              >
                <Text style={styles.viewAllText}>View All Availability →</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.bookAppointmentButton}
            onPress={handleBookAppointment}
          >
            <Text style={styles.bookAppointmentText}>Subscribe</Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  appContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    //borderWidth: 1,
    marginVertical: "10%",
    alignSelf: "center",
  },
  appImageContainer: {
    height: "17%",
    width: "75%",
    //borderWidth: 1,
    marginVertical: "8%",
    alignSelf: "center",
  },
  experienceRatingContainer: {
    height: "7%",
    width: "88%",
    //borderWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5,
    boxShadow: " 0px 0px 4px 3px rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgba(255, 252, 252, 1)",
    padding: "2%",
    ...Platform.select({
      web: {
        minHeight: 60, // Ensures visibility in web view
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderWidth: 1,
        borderColor: "#ddd",
        boxShadow: " 0px 0px 4px 3px rgba(0, 0, 0, 0.25)",
        // marginTop: "-165%",
      },
    }),
  },
  experienceSection: {
    height: "100%",
    width: "49%",
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  doctorIcon: {
    alignSelf: "center",
    height: 28,
    width: 28,
    marginHorizontal: "3%",
    borderRadius: 50,
  },
  experienceDetail: {
    height: "94%",
    width: "78%",
    //borderWidth: 1,
    alignSelf: "center",
    flexDirection: "column",
  },
  experienceText: {
    fontSize: 14,
    fontWeight: 600,
    color: " rgb(94, 93, 93)",
    paddingHorizontal: "4%",
  },
  experience: {
    fontSize: 14,
    fontWeight: 600,
    color: "#000000",
    paddingHorizontal: "4%",
  },
  verticalLine: {
    height: "75%",
    width: "0.4%",
    //borderWidth:1,
    alignSelf: "center",
    backgroundColor: "#000000",
  },
  ratingSection: {
    height: "100%",
    width: "48.8%",
    //borderWidth: 1,
    flexDirection: "row",
  },
  rating: {
    fontSize: 14,
    fontWeight: 600,
    color: "#000000",
    alignSelf: "center",
  },

  OfflineOnlineMode: {
    //borderWidth:1,
    height: "7%",
    width: "88%",
    alignSelf: "center",
    marginVertical: "2%",
    borderRadius: 5,
    boxShadow: " 0px 0px 4px 3px rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgba(255, 252, 252, 1)",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  OfflineMode: {
    borderWidth: 1,
    height: "90%",
    width: "49%",
    alignSelf: "center",
    borderColor: "#FF7072",
    backgroundColor: "rgb(237, 111, 128)",
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  offlineIcon: {
    alignSelf: "center",
    height: 20,
    width: 20,
  },
  offlineText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 14,
    fontWeight: 500,
  },
  OnlineMode: {
    //borderWidth: 1,
    height: "90%",
    width: "49%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  onlineIcon: {
    alignSelf: "center",
    width: 20,
    height: 14,
  },
  onlineText: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: 500,
  },
  consultationFess: {
    height: "7%",
    width: "88%",
    //borderWidth: 1,
    alignSelf: "center",
    marginVertical: "0.4%",
    borderRadius: 5,
    //borderColor:"red",
    boxShadow: " 0px 0px 4px 3px rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgba(255, 252, 252, 1)",
    flexDirection: "row",
    paddingHorizontal: "2%",
    ...Platform.select({
      web: {
        height: "auto",
        width: "88%",
        //borderWidth: 1,
        minHeight: 60,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
    }),
  },
  iconBox: {
    height: "52%",
    width: "9%",
    //borderWidth: 1,
    alignSelf: "center",
    borderRadius: 40,
    backgroundColor: "#D9D9D9",
  },
  dollarIcon: {
    height: 20,
    width: 11,
    alignSelf: "center",
    marginVertical: "16%",
  },
  feesBox: {
    height: "90%",
    width: "60%",
    //borderWidth: 1,
    marginHorizontal: "3.5%",
    alignSelf: "center",
    flexDirection: "column",
  },
  fees: {
    fontSize: 16,
    fontWeight: 600,
    color: "#000000",
    paddingVertical: "1%",
  },
  feesText: {
    fontSize: 14,
    fontWeight: 600,
    color: " rgb(94, 93, 93)",
  },
  availabilityContainer: {
    height: "40%",
    width: "88%",
    //borderWidth: 1,
    alignSelf: "center",
    marginVertical: "4%",
    overflow: "hidden",
    ...Platform.select({
      web: {
        marginBottom: "5%",
      },
    }),
  },
  availabilityTimeText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#444444",
    paddingHorizontal: "2%",
  },
  availabilityShowBox: {
    height: "91%",
    width: "98%",
    //borderWidth:1,
    alignSelf: "center",
    borderRadius: 15,
    boxShadow: " 0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
    marginVertical: "2%",
    paddingTop: "3%",
    paddingHorizontal: "2%",
    flexDirection: "column",
  },
  availabilityBox: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    //borderWidth: 1,
  },

  dayColumn: {
    alignItems: "center",
    //borderWidth: 1,
    width: 108,
  },
  selectedDay: {
    backgroundColor: " rgb(254, 248, 248)",
    borderWidth: 1,
    borderColor: "rgba(255, 112, 114, 1)",
    paddingHorizontal: "0%",
  },

  dayTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },

  noSlots: {
    color: "gray",
    fontSize: 15,
  },

  slotsAvailable: {
    color: "green",
    fontSize: 12,
  },
  noSlot: {
    color: "gray",
    fontSize: 15,
    fontWeight: 400,
    alignSelf: "center",
    marginTop: "20%",
  },
  noSlotsContainer: {
    alignSelf: "center",
    //borderWidth:1,
    marginVertical: "15%",
  },

  timeSlotContainer: {
    marginTop: "2%",
    flexDirection: "column",
    //borderWidth: 1,
    height: "57%",
    //justifyContent: "space-around",
  },

  slotHeading: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: "2",
  },

  slotButton: {
    //backgroundColor: "#E0EBFF",
    paddingVertical: "3%",
    paddingHorizontal: "4%",
    borderRadius: 5,
    alignSelf: "flex-start",
    // marginTop: "2%",
    borderColor: "rgba(22, 128, 236, 0.75)",
    borderWidth: 1,
  },

  slotText: {
    color: "#3366CC",
    fontSize: 13,
    fontWeight: 400,
    //   // alignSelf:"center"
  },
  slotCategory: {
    fontSize: 15,
    fontWeight: 500,
    marginBottom: "2%",
    color: "#000000",
    marginTop: "2%",
  },
  slotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: "1%",
  },
  selectedSlot: {
    backgroundColor: "#007BFF", // Highlighted color when selected
  },
  selectedSlotText: {
    color: "#FFFFFF", // Text color when selected
  },

  viewAllButton: {
    backgroundColor: "rgb(237, 109, 111)",
    paddingVertical: "2%",
    alignItems: "center",
    borderRadius: 8,
    width: "85%",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "5%",
    ...Platform.select({
      web: {
        paddingVertical: "2%",
      },
    }),
  },

  viewAllText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bookAppointmentButton: {
    height: "5%",
    width: "70%",
    //borderWidth: 1,
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "rgb(237, 109, 111)",
    ...Platform.select({
      web: {
        marginBottom: "15%",
      },
    }),
  },
  bookAppointmentText: {
    alignSelf: "center",
    paddingVertical: "3.5%",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 600,
  },
  imageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    borderWidth: 1,
    opacity: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  parent: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  Left: {
    height: "100%",
    width: "15%",
    backgroundColor: "#f5f5f5",
  },
  Right: {
    height: "100%",
    width: "85%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    // borderWidth: 5,
    // borderColor: "black",
    zIndex: 2,
    ...Platform.select({
      web: {
        width: "100%",
        marginBottom: 20,
      },
    }),
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(138, 112, 255, 0.8)",
    marginBottom: "10%",
    borderRadius: 20,
    overflow: "hidden",
    width: "90%",
    marginHorizontal: "5%",
  },
  doctorProfileCard: {
    width: "60%",
    height: "80%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: "2%",
    margin: 10,
  },
  doctorLeftSection: {
    width: "20%",
    alignItems: "center",
  },
  doctorImage: {
    height: 90,
    width: 90,
    alignSelf: "center",
    borderRadius: 40,
    ...Platform.select({
      web: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
      },
    }),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingDetail: {
    ...Platform.select({
      web: {
        flexDirection: "column",
        width: "80%",
        //borderWidth:1
      },
    }),
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 600,
    color: " rgb(94, 93, 93)",
    paddingHorizontal: "4%",
    ...Platform.select({
      web: {
        marginLeft: "1%",
        fontSize: 14,
        fontWeight: 600,
      },
    }),
  },
  doctorInfoSection: {
    width: "80%",
    paddingLeft: 20,
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 600,
    color: "#000000",
    alignSelf: "center",
    ...Platform.select({
      web: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        alignSelf: "flex-start",
      },
    }),
  },
  doctorCredentials: {
    fontSize: 14,
    alignSelf: "center",
    fontWeight: 600,
    ...Platform.select({
      web: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
        alignSelf: "flex-start",
      },
    }),
  },
  doctorExperience: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
    marginBottom: 10,
  },
  doctorBio: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 15,
  },
  reviewsSection: {
    marginTop: 10,
  },
  reviewsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewsList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewCard: {
    width: "30%",
    backgroundColor: "#ffebee",
    borderRadius: 10,
    padding: 10,
  },
  reviewText: {
    fontSize: 12,
    color: "#333",
    marginBottom: 5,
  },
  reviewerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  reviewerName: {
    fontSize: 10,
    color: "#666",
    marginLeft: 5,
  },
  appointmentSection: {
    width: "35%",
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: 10,
    padding: 20,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff7072",
  },
  appointmentFee: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff7072",
  },
  clinicDetails: {
    marginBottom: 20,
  },
  clinicName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  clinicWaitTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  clinicLocation: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    //borderWidth: 2,
    borderColor: "#d3d3d3",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
  },
  dateOption: {
    width: "30%",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  selectedDate: {
    borderBottomColor: "#ff7072",
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  slotsAvailable: {
    fontSize: 12,
    color: "#388e3c",
    marginTop: 5,
  },
  timeSlotSection: {
    marginTop: 10,
  },
  timeSlotsGroup: {
    marginBottom: 20,
  },
  timeGroupLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  timeSlotScroll: {
    maxHeight: 200,
    width: "100%",
  },
  timeSlotsContainer: {
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "flex-start", 
    gap: 10, 
    rowGap: 10, 
    columnGap: 5,
    width: "100%",
  },
  timeSlot: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedTimeSlot: {
    backgroundColor: "#e0f2f1",
    borderWidth: 1,
    borderColor: "#80cbc4",
  },
  timeSlotText: {
    fontSize: 14,
    color: "#333",
  },
});

export default DoctorsInfoWithRating;
