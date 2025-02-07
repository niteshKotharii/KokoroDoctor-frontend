import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MyLinearGradient from '../../components/MyLinearGradient';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../../navigation/Navigation"
import WebHeader from '../../components/WebHeader';

type SourceProps = NativeStackScreenProps<RootStackParamList, 'Source'>

const Source = ({navigation}:SourceProps) => {
  const [selectedBottomButton, setSelectedBottomButton] = useState('Configuration');

  const handleBottomButtonPress = (button : any) => {
    setSelectedBottomButton(button);
  };

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
        <TouchableOpacity style={[styles.topButton, styles.selectedTopButton]}>
          <Text style={styles.buttonText}>3D Heart Analysis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton} onPress={()=>{navigation.navigate('Transformation')}}>
          <Text style={styles.buttonText}>Heart Age Calculator</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.buttonText}>Risk Assessment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.buttonText}>Heart attack likelihood</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.BottomButtonRow}>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            selectedBottomButton === 'Configuration' &&
              styles.selectedBottomButton,
          ]}
          onPress={() => handleBottomButtonPress('Configuration')}>
          <Text style={styles.buttonText}>Report Insights</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            selectedBottomButton === 'Schema' && styles.selectedBottomButton,
          ]}
          onPress={() => handleBottomButtonPress('Schema')}>
          <Text style={styles.buttonText}>Schema</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            selectedBottomButton === 'Advanced Configuration' &&
              styles.selectedBottomButton,
          ]}
          onPress={() => handleBottomButtonPress('Advanced Configuration')}>
          <Text style={styles.buttonText}>Advanced Configuration</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Connection name"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Network name"
          placeholderTextColor="black"
        />
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </MyLinearGradient>
  );
};

export default Source;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginVertical:15,
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
        justifyContent:"center",
        marginTop: 80,
        width:"70%",
        marginHorizontal:"auto",
        marginBottom:0,
      }
    }),
  },
  BottomButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    ...Platform.select({
      web:{
        marginTop:40,
        justifyContent:"center",
        width:"55%",
        marginHorizontal:"auto",
      }
    }),
  },
  topButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#00A3FF",
    borderRadius: 20,
    alignItems: "center",
    ...Platform.select({
      web:{
        backgroundColor: 'transparent',
      }
    }),
  },
  selectedTopButton: {
    backgroundColor: '#0892A5',
    ...Platform.select({
      web:{
        backgroundColor: '#ED7390',
      }
    }),
  },
  bottomButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#B8BAC24D",
    borderRadius: 20,
    alignItems: "center",
    ...Platform.select({
      web:{
        backgroundColor: 'transparent',
      }
    }),
  },
  selectedBottomButton: {
    backgroundColor: '#ED7390',
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
    marginTop: 120,
    ...Platform.select({
      web:{
        marginTop: 60,
      }
    }),
  },
  input: {
    height: 40,
    borderColor: '#ED7390',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#B8BAC24D',
    ...Platform.select({
      web:{
        width:500,
        marginHorizontal:"auto",
        backgroundColor: '#B8BAC24D',
        borderWidth: 1,
        borderColor: "#ED7390",
        borderRadius: 5,
        color:"black",
      }
    }),
  },
  continueButton: {
    backgroundColor: '#ED7390',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    ...Platform.select({
      web:{
        width:500,
        marginHorizontal:"auto",
      }
    }),
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
