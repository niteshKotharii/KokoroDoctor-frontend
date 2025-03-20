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
  TextInput,
  Linking,
  Keyboard,
  Platform,
  Modal,
  useWindowDimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HospitalDetails = ({ navigation, route }) => {
  return (
    <View style={styles.parent}>
      <View style={styles.hospitalImage}>
        <Image
          source={require("../../assets/Images/hospitalImages.png")}
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
        <View style={styles.hospitalDetailsContainer2 }>
          <TouchableOpacity  
           >
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
          <Icon style={styles.bedIcon} name="bed" size={30} color="#25BA58" />
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
        <View style={styles.footerBoxRow1}>
          <View style={styles.box1}>
            <Icon style={styles.bedIcon} name="bed" size={30} color="#25BA58" />

            <View style={styles.box1Body}>
              <Text>Emergency Bed</Text>
              <Text>5 Bed Available</Text>
            </View>
          </View>
          <View style={styles.box1}>
            <Icon style={styles.bedIcon} name="bed" size={30} color="#25BA58" />

            <View style={styles.box1Body}>
              <Text>Emergency Bed</Text>
              <Text>5 Bed Available</Text>
            </View>
          </View>
          <View style={styles.box1}>
            <Icon style={styles.bedIcon} name="bed" size={30} color="#25BA58" />

            <View style={styles.box1Body}>
              <Text>Emergency Bed</Text>
              <Text>5 Bed Available</Text>
            </View>
          </View>
        </View>
        <View style={styles.footerBoxRow2}>
          <View style={styles.box1}>
            <Icon style={styles.bedIcon} name="bed" size={30} color="#25BA58" />

            <View style={styles.box1Body}>
              <Text>Emergency Bed</Text>
              <Text>5 Bed Available</Text>
            </View>
          </View>
          <View style={styles.box1}>
            <Icon style={styles.bedIcon} name="bed" size={30} color="#25BA58" />

            <View style={styles.box1Body}>
              <Text>Emergency Bed</Text>
              <Text>5 Bed Available</Text>
            </View>
          </View>
          <View style={styles.box1}>
            <Icon style={styles.bedIcon} name="bed" size={30} color="#25BA58" />

            <View style={styles.box1Body}>
              <Text>Emergency Bed</Text>
              <Text>5 Bed Available</Text>
            </View>
          </View>
        </View>
        <View style={styles.availabilityButtonConatiner}>
          <TouchableOpacity>
            <View style={styles.availabilityButton}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#333333", fontSize: 16 }}>
                  View Availability
                </Text>
                <Icon name="chevron-forward" size={20} color="#333333" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bookhospitalButtoncontainer}>
        <TouchableOpacity>
        <View style={styles.bookhospitalButton}>
            <Text style={styles.bookHospitalText} >Book Hospital</Text>
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
    borderWidth:5,
    borderColor:"#F4F3F3",
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
  footerBoxRow1: {
    width: "94%",
    height: "33%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
    // backgroundColor:"yellow",
    gap: "1.5%",
  },
  box1: {
    width: "35%",
    height: "100%",
    padding: "2%",
    borderRadius: "5%",
    justifyContent: "space-between",
    backgroundColor: "#F1F1F1",
  },
  footerBoxRow2: {
    width: "94%",
    height: "40%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "1.5%",
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
  bookhospitalButtoncontainer:{
     width:"100%",
     height:"10%",
     justifyContent:"center",
     alignContent:"center",
    //  backgroundColor:"red",

  },
  bookhospitalButton:{

 width:"70%",
 height:"65%",
 marginLeft:"16.5%",
 justifyContent:"center",
 alignItems:"center",
 borderRadius:"2%",
 backgroundColor:"#FF7373",


  },
  bookHospitalText:{
  fontSize:14,
  fontWeight:600,
  },

});
export default HospitalDetails;
