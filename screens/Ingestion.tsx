import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
// import { Video, AVPlaybackStatus } from 'expo-av';
import MyLinearGradient from "../components/MyLinearGradient";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../navigation/Navigation"
import WebHeader from '../components/WebHeader';

type IngestionProps = NativeStackScreenProps<RootStackParamList, 'Ingestion'>

const Ingestion = ({ navigation }:IngestionProps) => {
  const [appName, setAppName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <MyLinearGradient style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      {Platform.OS !== "web" && (
        <>
          <View style={styles.header}>
            <View style={styles.appName}>
              <Image source={require("../assets/Icons/filter.png")} />
              <TextInput
                style={styles.appNameInput}
                placeholder="App Name"
                placeholderTextColor="#fff"
                value={appName}
                onChangeText={setAppName}
              />
            </View>
            <View style={styles.date}>
              <Image
                source={require("../assets/Icons/dateTime.png")}
                style={styles.profileImage}
              />
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.datePickerButton}
              >
                <Text style={styles.dateText}>{date.toDateString()}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../assets/Images/profile.jpeg")}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </>
      )}
      {Platform.OS === "web" && <WebHeader />}
      <Text style={styles.title}>
        Welcome To <Text style={styles.highlight}>Kokoro.doctor</Text> Ingestion
      </Text>
      { Platform.OS!=='web' &&
      <>
        <Text style={styles.infoText}>
          Create Ingestion Applications <Text style={styles.highlight}>10X</Text>{" "}
          Faster. Ingest data from any source to any destination.
        </Text>
        <Text style={styles.infoText}>
          Pre-built application templates{" "}
          <Text style={styles.highlight}>Zero-code</Text>, wizard based
          application builder.
        </Text>
        <Text style={styles.infoText}>
          Native integration for all sources & targets.
        </Text>
      </>}

      { Platform.OS==='web' &&
      <>
        <Text style={styles.infoText}>
          Create Ingestion Applications 10X Faster. Ingest data from any source to any destination.
          <Text style={styles.lightText}>{" "}Pre-built application templates Zero-code, wizard based application builder. Native integration for all sources & targets.</Text>
        </Text>
      </>}
      <Text style={[styles.highlight, styles.WebText]}>
        Ingest Data from any Source to Target with simple steps
      </Text>
      <TouchableOpacity style={styles.sampleButton}>
        <Text style={styles.sampleButtonText}>View Sample Application</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => {
          navigation.navigate("Features", { source: "Ingestion" });
        }}
      >
        <Text style={styles.createButtonText}>Create {Platform.OS==='web' && "Ingestion Application"}</Text>
      </TouchableOpacity>
      { Platform.OS!=='web' && ''
      //   <Video
      //   ref={video}
      //   style={styles.videoPlayer}
      //   source={{
      //     uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      //   }}
      //   useNativeControls
      //   isLooping
      //   onPlaybackStatusUpdate={status => setStatus(() => status)}
      // />
      }
    </MyLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 6,
  },
  appName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  appNameInput: {
    height: 40,
    color: "#fff",
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    color: "#fff",
    marginRight: 10,
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    color: "#fff",
    fontSize: 34,
    marginBottom: 20,
    ...Platform.select({
      web:{
        fontSize: 44,
        width:"40%",
        fontWeight:"bold",
        marginTop:60,
        marginLeft:100,
      }
    }),
  },
  infoText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
    ...Platform.select({
      web:{
        width:"40%",
        marginLeft:100,
        fontWeight:"400",
      }
    }),
  },
  lightText:{
    ...Platform.select({
      web:{
        color: "#B7B7B7",
      }
    }),
  },
  WebText:{
    fontSize:18,
    ...Platform.select({
      web:{
        fontSize: 30,
        width:"34%",
        marginTop:30,
        marginLeft:800,
      }
    }),
  },
  highlight: {
    color: "#4285F4",
    ...Platform.select({
      web:{
        color: "#fff",
      }
    }),
  },
  sampleButton: {
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginVertical: 20,
    ...Platform.select({
      web:{
        backgroundColor: "#123AD4",
        width:"20%",
        marginTop:10,
        marginLeft:400,
        borderRadius: 5,
      }
    }),
  },
  sampleButtonText: {
    color: "#000",
    fontSize: 16,
    ...Platform.select({
      web:{
        color:"#fff",
        textAlign:"center",
      }
    }),
  },
  createButton: {
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginBottom: 20,
    ...Platform.select({
      web:{
        backgroundColor: "#123AD4",
        width:"20%",
        marginLeft:400,
        borderRadius: 5,
      }
    }),
  },
  createButtonText: {
    color: "#000",
    fontSize: 16,
    ...Platform.select({
      web:{
        color:"#fff",
        textAlign:"center",
      }
    }),
  },
  videoPlayer: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
  },
});

export default Ingestion;
