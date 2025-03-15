import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, Image, useWindowDimensions } from 'react-native';
import MyLinearGradient from '../components/MyLinearGradient';
import SideBarNavigation from '../components/SideBarNavigation';
import LoginSignUp from '../components/LoginSignUp';

const Second = ({navigation}) => {
  const {width} = useWindowDimensions();
  const logos = [
    require('../assets/Icons/Dribbble.png'), 
    require('../assets/Icons/Meta.png'), 
    require('../assets/Icons/Google.png'), 
    require('../assets/Icons/Oracle.png'), 
    require('../assets/Icons/FedEx.png'), 
    require('../assets/Icons/Lego.png'), 
  ];

  return (
    <MyLinearGradient style={styles.container}>
      {/* <StatusBar barStyle="light-content" backgroundColor='#333' /> */}
      
      <View style={styles.parent}>
          {(Platform.OS==='web' && width > 1000) && 
            <View style={styles.Left}>
              <SideBarNavigation navigation={navigation} />
            </View>
          }
          <View style={styles.Right}>
            <View style={styles.header}><LoginSignUp navigation={navigation}/></View>
            <View style={styles.contentContainer}>
            <Text style={styles.title}>
              Your 24/7 AI Heart Specialist – Right in Your Pocket
            </Text>
            <Text style={styles.subtitle}>
              <Text style={styles.highlight}></Text>
              Upload Angiography and Heart Reports for 100% Accurate Analysis of Your Heart Health. Monitor, Measure, and Improve Your Condition Anytime, Anywhere.

            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Home')}}>
                <Text style={styles.buttonText}>Check Your Heart Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.demoButton]}>
                <Text style={[styles.buttonText, styles.demoButtonText]}>Upload Reports for Analysis</Text>
              </TouchableOpacity>
            </View>
            </View>
            {Platform.OS==='web' && 
                <View style={styles.bottomContainer}>
                  <Text style={styles.BottomText}>
                    Join Thousands of Heart Patients Who Trust Kokoro.Doctor
                  </Text>
                  <View style={styles.logosContainer}>
                    {logos.map((logo, index) => (
                      <Image key={index} source={logo} style={styles.Bottomlogo} />
                    ))}
                  </View>
                </View>
            }
          </View>
        </View>
    </MyLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android:{
        justifyContent: 'center',
        alignItems: 'center',
      },
      ios:{
        justifyContent: 'center',
        alignItems: 'center',
      },
      web:{
        padding:0,
        margin:0,
      }
    }),
  },
  parent: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  Left: {
    height: "100%",
    width: "15%",
    //borderWidth: 1,
  },
  Right: {
    height: "100%",
    width: "100%",
  },
  header: {
    ...Platform.select({
      web:{
        width:"12%",
        marginLeft: "70%",
        marginTop: 15,
      }
    })
  },
  whiteText:{
    // color:"black",
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    alignItems: 'center',
    ...Platform.select({
      web:{
        alignItems:"flex-start",
        marginLeft:150,
      }
    }),
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    // color: '#fff',
    textAlign: 'center',
    color: '#00A3FF',
    fontFamily: 'Poppins',
    marginBottom: 10,
    ...Platform.select({
      web:{
        fontSize:50,
        width:600,
        textAlign:"left",
      }
    })
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    ...Platform.select({
      web:{
        textAlign:"left",
        color:"#A4A5AA",
        width:600,
        size:22,
      }
    })
  },
  highlight: {
    color: '#EA00FF',
  },
  buttonContainer:{
    ...Platform.select({
      web:{
        flexDirection:"row",
        gap:20,
      }
    }),
  },
  button: {
    backgroundColor: '#00A3FF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 10,
    ...Platform.select({
      web:{
        borderRadius: 40,
        paddingVertical:10,
      }
    }),
  },
  demoButton: {
    backgroundColor: 'black',
  },
  buttonText1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00A3FF',
    letterSpacing: -1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  demoButtonText: {
    color: 'white',
  },
  bottomContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:"8%",
    borderTopWidth:1,
    borderTopColor:"black",
    marginHorizontal:"10%",
  },
  BottomText: {
    marginBottom: 20,
    fontSize: 16,
    color:"black",
    textAlign: 'center',
  },
  logosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
  },
  Bottomlogo: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});

export default Second;
