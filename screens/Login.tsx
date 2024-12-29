import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import MyLinearGradient from '../components/MyLinearGradient';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../navigation/Navigation"

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login = ({navigation}:LoginProps) => {
  return (
    <MyLinearGradient style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{navigation.navigate('First')}}>
          <View> 
            <Image source={require('../assets/Images/NewLogo.png')} style={styles.logo} />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Welcome to Kokoro.doctor</Text>
        <Text style={styles.subtitle}>Log in or Register your email.</Text>
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#fff" />
        <TouchableOpacity style={styles.continueButton} onPress={()=> {navigation.navigate('Home')}}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </MyLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    width:150,
    height:150,
  },
  title: {
    fontSize: 32,
    color: 'black',
    marginTop: 20,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#B7B7B7',
    marginBottom: 20,
  },
  line:{
    width:250,
    borderColor:'#D9D9D966',
    borderWidth:1,
    marginBottom:20,
  },
  googleButton: {
    width:300,
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  googleButtonText: {
    color: '#D9D9D9',
    fontSize: 16,
    textAlign:"center",
  },
  input: {
    width:300,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
    color: '#D9D9D9',
    textAlign:"center",
  },
  continueButton: {
    width:300,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  continueButtonText: {
    color: '#D9D9D9',
    fontSize: 16,
    textAlign:"center",
  },
});

export default Login;
