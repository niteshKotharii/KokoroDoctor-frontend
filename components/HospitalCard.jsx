import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  TextInput,
  Keyboard,
  Text,
  FlatList,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";

const HospitalCard = ({navigation}) => {

  const handleCardpress = () => {
    navigation.navigate("HospitalsInfoWithRating")
  }

  return (
    <Pressable style={styles.card} onPress={handleCardpress}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/Images/HospitalImage.jpg")} // Importing local image
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Details Section */}

      <View style={styles.detailsContainer}>
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={() => alert("Booking Confirmed!")}
            style={styles.HospitalStyle}
          >
            <Text style={styles.hospitalName}>Apollo</Text>
          </TouchableOpacity>
          <Text style={styles.rating}>⭐ 4.5</Text>
        </View>
        <Text style={styles.description}>Multispaciality Hospital</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  HospitalStyle: {
    cursor: "pointer",
  },
  card: {
    width: "80%",
    height: "90%",
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageContainer: {
    height: "60%",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    height: "40%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#a13721",
   
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hospitalName: {
    fontSize: 16,
    color: "#fff",
    cursor:"pointer",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#black",
  },
  description: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
  },
});

export default HospitalCard;
