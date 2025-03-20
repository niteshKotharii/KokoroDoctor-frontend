import React, { useCallback, useState } from "react";

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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { useChatbot } from "../../contexts/ChatbotContext";
import { useFocusEffect } from "@react-navigation/native";
import SideBarNavigation from "../../components/SideBarNavigation";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import AppHospitalCard from "../../components/AppHospitalCard";

const hospitalsdata = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
  { id: "7" },
  { id: "8" },
  { id: "9" },
  { id: "10" },
  
];

const AllHospitals = ({ navigation, route }) => {
  return (
    <>
      {Platform !== "web" || width < 1000}
      {
        <View style={styles.appContainer}>
          <View style={styles.headContainer}>
            <Header navigation={navigation} />
          </View>
          <View style={styles.searchBarConatiner}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Hello Alex! </Text>
            </View>
            <SearchBar style={styles.searchinput} />
          </View>
          <View style={styles.body}>
            {/* <View style={styles.cardContainer}> 

              <AppHospitalCard/>
             <AppHospitalCard/>
             <AppHospitalCard/>
             <AppHospitalCard/>
             <AppHospitalCard/>
             <AppHospitalCard/>
             <AppHospitalCard/>
             <AppHospitalCard/>   

              </View>  */}
            <FlatList style={styles.flatListConatainer}
              data={hospitalsdata}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <AppHospitalCard id={item.id}  navigation={navigation} />}
              contentContainerStyle={{ gap: 10 }}
              showsVerticalScrollIndicator={false}
            />
            

          </View>
        </View>
      }
    </>
  );
};
const styles = StyleSheet.create({
  appContainer: {
   height:"100%",
    width: "100%",
  },
  headContainer: {
    height: "12%",
    width: "100%",
    justifyContent: "center",
    paddingTop: "8%",
  },
  searchBarConatiner: {
    height: "10%",
    width: "100%",
    gap: "4%",
  },
  headingContainer: {
    width: "100%",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    paddingLeft: "6%",
  },
  body: {
    height: "78%",
    width: "90%",
    marginLeft: "5%",
    alignItems: "center",
    gap: "2%",
  },

  // cardContainer: {
  //   height: "100%",
  //   width: "100%",
  // },
  flatListConatainer:{
    height:"30%",
  }
});
export default AllHospitals;
