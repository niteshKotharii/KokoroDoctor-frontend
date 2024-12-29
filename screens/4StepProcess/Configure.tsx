import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import React from "react";
import MyLinearGradient from "../../components/MyLinearGradient";
import WebHeader from "../../components/WebHeader";

const Configure = () => {

  return (
    <MyLinearGradient style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      {Platform.OS === "web" && <WebHeader />}
      {Platform.OS !== "web" && (
        <View style={styles.header}>
          <Image
            source={require("../../assets/Icons/Home.png")}
            style={styles.homeicon}
          />
          <Image
            source={require("../../assets/Images/profile.jpeg")}
            style={styles.profileImage}
          />
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.buttonText}>3D Heart Analysis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.buttonText}>Heart Age Calculator</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.buttonText}>Risk Assessment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.topButton, styles.selectedTopButton]}>
          <Text style={styles.buttonText}>Heart attack likelihood</Text>
        </TouchableOpacity>
      </View>

      {Platform.OS!=='web' &&
      <>
        <View style={styles.inputContainer}>
          <Text style={styles.InputTitle}>Age & Gender:</Text>
          <TextInput style={styles.input}/>
          <Text style={styles.InputTitle}>Smoking Status:</Text>
          <TextInput style={styles.input}/>
          <Text style={styles.InputTitle}>Blood Pressure levels:</Text>
          <TextInput style={styles.input}/>
        </View>
      </>}

      {Platform.OS==='web' && 
        <>
          <View style={styles.inputContainer}>
            <View style={styles.WebInput}>
              <Text style={styles.InputTitle}>Age & Gender:</Text>
              <Text style={styles.InputTitle}>Smoking Status:</Text>
              <Text style={styles.InputTitle}>Blood Pressure levels:</Text>
              
            </View>
            <View style={styles.WebInput}>
              <TextInput style={styles.input} />
              <TextInput style={styles.input} />
              <TextInput style={styles.input} />
            </View>
          </View>
        </>
      }
      {Platform.OS !== "web" && <>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.continueButtonText}>Know my heart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.continueButtonText}>Make Changes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.continueButtonText}>Save File</Text>
          </TouchableOpacity>
        </View>
      </>}
      {Platform.OS==='web' && 
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.continueButtonText}>Know my heart</Text>
        </TouchableOpacity>
      }
    </MyLinearGradient>
  );
};

export default Configure;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  homeicon: {
    width: 35,
    height: 35,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    ...Platform.select({
      web:{
        marginTop: 80,
        width:"70%",
        marginHorizontal:"auto",
      }
    }),
    
  },
  topButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#ED7390",
    borderRadius: 20,
    alignItems: "center",
    ...Platform.select({
      web:{
        backgroundColor: 'transparent',
      }
    }),
  },
  selectedTopButton: {
    backgroundColor: '#ED7390',
    ...Platform.select({
      web:{
        backgroundColor: '#ED7390',
      }
    }),
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    ...Platform.select({
      web:{
        fontWeight:"600",
        fontSize:22,
        color:"black",
      }
    }),
  },
  inputContainer: {
    marginTop: 60,
    ...Platform.select({
      web:{
        marginTop:100,
        flexDirection:"row",
        justifyContent:"center",
        gap:60,
      }
    }),
  },
  WebInput:{
    flexDirection:"column",
  },
  InputTitle: {
    color: "black",
    fontSize: 18,
    marginBottom: 2,
    ...Platform.select({
      web:{
        marginBottom: 25,
      }
    }),
  },
  input: {
    height: 40,
    borderColor: "#ED7390",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
    ...Platform.select({
      web:{
        backgroundColor: "transparent",
        borderColor: "#ED7390",
        borderRadius: 5,
        width:350,
        color:"black",
      }
    }),
  },
  bottomButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  bottomButton: {
    marginTop: 15,
    borderRadius: 30,
    paddingVertical: 15,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ED7390",
    ...Platform.select({
      web:{
        borderRadius:5,
        justifyContent:"center",
        backgroundColor:"#ED7390",
        alignItems:"center",
        marginHorizontal:"auto",
      }
    }),
  },
  continueButtonText: {
    color: "#000",
    fontSize: 16,
    ...Platform.select({
      web:{
        color: "#fff",
      }
    }),
  },
  saveButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  saveButton: {
    borderRadius: 30,
    paddingVertical: 10,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
  },
});
