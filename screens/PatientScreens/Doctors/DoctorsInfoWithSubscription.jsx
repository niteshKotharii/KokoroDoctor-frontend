import React from "react";
import {
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  useWindowDimensions,
  Dimensions,
  StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SideBarNavigation from "../../../components/PatientScreenComponents/SideBarNavigation";
import Header from "../../../components/PatientScreenComponents/Header";

const { width, height } = Dimensions.get("window");

const DoctorsInfoWithSubscription = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const doctors = route.params?.doctors || {}; // Get doctor data from navigation

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
                      <View style={styles.doctorProfileDetail}>
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
                            <Text style={styles.ratingText}>{"4.5"}</Text>
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
                            {`${doctors.experience} experience`}
                          </Text>
                          <Text style={styles.doctorBio}>
                            {doctors.doctorname} specialized in{" "}
                            {doctors.specialization}, with an experience of{" "}
                            {doctors.experience}.
                          </Text>
                        </View>
                      </View>
                      <View style={styles.reviewsSection}>
                        <Text style={styles.reviewsTitle}>User Reviews</Text>

                        <View style={styles.reviewsList}>
                          {[1, 2, 3].map((id) => (
                            <View key={id} style={styles.reviewCard}>
                              <Text style={styles.reviewText}>
                                Great Doctor !
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
                                  Ram Kapoor
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>

                    {/* Appointment booking section */}
                    <View style={styles.subscriptionSection}>
                      <View style={styles.subscriptionTextHead}>
                        <Text style={styles.subscriptionTextTitle}>
                          To Book Slot of Doctor you have to first subscribe
                          them .{" "}
                        </Text>
                      </View>
                      <View style={styles.subscriptionMetricsBox}>
                        <Text style={styles.metricsTitle}>
                          Metrics Of Subscription
                        </Text>
                        <Text style={styles.metricsTitle}>
                          {" "}
                          1 Free Regular check up
                        </Text>
                        <Text style={styles.metricsTitle}>
                          {" "}
                          1 free emergency checkup
                        </Text>
                        <Text style={styles.metricsTitle}> Medilocker</Text>
                      </View>
                      <View style={styles.subscriptionButtonContainer}>
                        <View style={styles.subscriptionTextBox}>
                          <Text style={styles.priceText}>₹1999</Text>
                          <Text style={styles.feeText}>| Subscription Fee</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.subscribeButton}
                          onPress={() =>
                            navigation.navigate(
                              "DoctorsSubscriptionPaymentScreen"
                            )
                          }
                        >
                          <Text style={styles.subscribeButtonText}>
                            Subscribe Doctor
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
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

  imageContainer: {
    height: "100%",
    width: "100%",
    //borderWidth: 1,
    marginVertical: "10%",
    alignSelf: "center",
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
    padding: "1%",
  },
  doctorProfileCard: {
    width: "60%",
    height: "90%",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: "2%",
    margin: "2%",
    justifyContent: "space-between",
  },
  doctorProfileDetail: {
    height: "72%",
    width: "100%",
    //borderWidth: 1,
    flexDirection: "row",
  },
  doctorLeftSection: {
    width: "20%",
    height: "48%",
    alignItems: "center",
    // borderWidth: 1,
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
    height: "100%",
    paddingLeft: "1%",
    //borderWidth: 1,
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
    marginTop: "3%",
    //borderWidth: 1,
  },
  reviewsTitle: {
    fontSize: 15,
    fontWeight: 500,
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
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
    fontFamily: "Alex Brush",
    fontWeight: 400,
    fontStyle: "italic",
  },
  reviewerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "2%",
    //borderWidth:1
  },
  reviewerName: {
    fontSize: 10,
    color: "#666",
    marginLeft: 5,
  },
  subscriptionSection: {
    width: "30%",
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: "2%",
    marginLeft: "5%",
    //padding: "2%",
  },
  subscriptionTextHead: {
    height: "10%",
    width: "70%",
    //borderWidth: 1,
    marginTop: "20%",
    marginLeft: "8%",
  },
  subscriptionTextTitle: {
    fontSize: 14,
    fontWeight: 400,
    color: "#000000",
  },
  subscriptionMetricsBox: {
    height: "27%",
    width: "85%",
    //borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 5,
    alignSelf: "center",
    marginTop: "1%",
  },
  metricsTitle: {
    fontSize: 13,
    fontWeight: 400,
    color: "#000000",
    marginLeft: "3%",
    marginTop: "1%",
  },
  subscriptionButtonContainer: {
    height: "25%",
    width: "85%",
    //borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    marginTop: "10%",
    flexDirection: "column",
    //justifyContent:"space-around"
  },
  subscriptionTextBox: {
    height: "20%",
    width: "80%",
    //borderWidth: 1,
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  priceText: {
    //fontFamily:"Annapurna SIL",
    fontSize: 16,
    fontWeight: 500,
    color: "#000000",
    marginLeft: "18%",
  },
  feeText: {
    fontSize: 11,
    fontWeight: 400,
    color: "#888888",
    marginRight: "18%",
  },
  subscribeButton: {
    height: "24%",
    width: "80%",
    //borderWidth: 1,
    marginTop: "2%",
    backgroundColor: "#FF7072",
    borderRadius: 5,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#fff",
    alignSelf: "center",
    fontStyle: "Medium",
    padding: "1%",
  },
});

export default DoctorsInfoWithSubscription;
