import React, { useState, useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, Platform } from 'react-native';
import MyLinearGradient from '../components/MyLinearGradient';
import SearchBar, {SearchBarHandle} from '../components/SearchBar';
import WebHeader from '../components/WebHeader';

const DataAssets = ({navigation}) => {
  const searchBarRef = useRef(null);

  const handleBlur = () => {
    if (searchBarRef.current) {
      searchBarRef.current.blur();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleBlur}>
      <MyLinearGradient style={styles.container}>
        {Platform.OS !== "web" && (
          <>
            <View style={styles.header}>
              <SearchBar ref={searchBarRef} />
              <TouchableOpacity>
                <Image
                  source={require("../assets/Images/profile.jpeg")}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>
              Welcome To <Text style={styles.highlight}>Kokoro.doctor</Text> Data
              Assets
            </Text>
            <View style={styles.features}>
              <View style={styles.left}>
                <TouchableOpacity onPress={() => {navigation.navigate("Ingestion")}}>
                  <Image
                    source={require("../assets/Icons/database.png")}
                    style={styles.icons}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/Icons/download.png")}
                    style={styles.icons}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/Icons/recycle.png")}
                    style={styles.icons}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/Icons/stack.png")}
                    style={styles.icons}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.line}></View>
              <View style={styles.FeatureTextContainer}>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>
                    Unlock The True Potential Of Your Data With Kokoro.doctor.
                    Effortlessly Manage And Optimize Your Data Assets With:
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>
                    <Text style={styles.highlight}>
                      Centralized Management :
                    </Text>{" "}
                    Organize And Index Data Resources For Easy Access And
                    Discoverability.
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>
                    <Text style={styles.highlight}>Schema Customization :</Text>{" "}
                    Modify And Enhance Schemas With Rules Tailored To Your
                    Needs.
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>
                    <Text style={styles.highlight}>Automatic Versioning :</Text>{" "}
                    Track Transformation History With Clear Records Of Changes.
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>
                    <Text style={styles.highlight}>Data Quality Assurance :
                    </Text>{" "}
                    Run Comprehensive Profiling For Accuracy, Quality, And
                    Completeness.
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>
                    <Text style={styles.highlight}>Seamless Integration :</Text>{" "}
                    Effortlessly Integrate Data Assets Into Kokoro.doctor
                    Applications And Trace Their Lineage.
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                navigation.navigate("Features", { source: "DataAssets" });
              }}
            >
              <Text style={styles.addButtonText}>+ Add Datasets</Text>
            </TouchableOpacity>
          </>
        )}
        
        {Platform.OS==='web' && 
          <>
            <WebHeader navigation={navigation}/>
            <View style={styles.webCenter}>
              <Text style={styles.title}>
              Welcome to Kokoro: Your AI Heart Health Companion
              </Text>
              <View style={styles.flexrow}>
                <View style={styles.FeatureTextContainer}>
                  <View style={styles.featureItem}>
                    <Text style={styles.featureText}>
                    Transform Your Heart Health Journey with Advanced AI-Powered Analysis and Insights:
                    </Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Text style={styles.featureText}>
                      <Text style={styles.highlight}>
                        Centralized Report Management :
                      </Text>{" "}
                      Upload, store, and manage your angiography, ECG, and other medical reports in one place.
                    </Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Text style={styles.featureText}>
                      <Text style={styles.highlight}>Personalized Insights :</Text>{" "}
                      Receive tailored recommendations based on your unique heart health profile.
                    </Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Text style={styles.featureText}>
                      <Text style={styles.highlight}>Progress Tracking :</Text>{" "}
                      Monitor your heart health over time with detailed analytics.
                    </Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Text style={styles.featureText}>
                      <Text style={styles.highlight}>Accurate Diagnostics :</Text>{" "}
                      Let AI identify risks and provide actionable steps for a healthier heart.
                    </Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Text style={styles.featureText}>
                      <Text style={styles.highlight}>Seamless Integration :</Text>{" "}
                      Access your heart health data anytime, anywhere, securely.
                    </Text>
                  </View>
                </View>
                <View style={styles.logosContainer}>
                  <View style={styles.logoTop}>
                    <TouchableOpacity style={styles.logoButton} onPress={() => {navigation.navigate("Ingestion")}}>
                      <Image source={require('../assets/Icons/webChart.png')} style={styles.logobox}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoButton}>
                      <Image source={require('../assets/Icons/webSearch.png')} style={styles.logobox}/>
                    </TouchableOpacity>               
                  </View>
                  <View style={styles.logoBottom}>
                    <TouchableOpacity style={styles.logoButton}>
                      <Image source={require('../assets/Icons/webNetwork.png')} style={styles.logobox}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoButton}>
                      <Image source={require('../assets/Icons/webRecycle.png')} style={styles.logobox}/>
                    </TouchableOpacity>                                   
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.addButton}
                onPress={() => {
                  navigation.navigate("Features", { source: "DataAssets" });
                }}>
                <Text style={styles.addButtonText}>Upload Your Reports</Text>
              </TouchableOpacity>
            </View>
          </>
        }

      </MyLinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android:{
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
      },
      ios:{
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
      },
      web:{
        flex:1,
      }
    }),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginVertical: 20,
    textAlign: "center",
    fontWeight: "900",
    ...Platform.select({
      web:{
        fontWeight:"400",
        fontSize:40,
        textAlign: "left",
      }
    }),
  },
  highlight: {
    color: "black",
  },
  features: {
    flexDirection: "row",
    width: "100%",
  },
  icons: {
    width: 40,
    height: 40,
    marginTop: 20,
    marginBottom: 60,
  },
  left: {
    marginRight: 15,
  },
  line: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    height: 480,
  },
  flexrow:{
    flexDirection:"row",
    gap:150,
  },
  FeatureTextContainer: {
    flex: 1,
    ...Platform.select({
      web:{
        width:"60%",
      }
    }),
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    ...Platform.select({
      web:{
        marginBottom: 10,
      }
    }),
  },
  featureText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 19,
    flex: 1,
    ...Platform.select({
      web:{
        fontSize: 17,
        fontWeight:"100",
      }
    }),
  },
  logosContainer:{
    flexDirection:"row",
    alignItems:"center",
    width:"40%",
  },
  logoTop:{

  },
  logoBottom:{

  },
  logoButton:{
    backgroundColor:"#D9D9D9",
    padding:15,
    margin:10,
    width:60,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5,
  },
  logobox:{ 
    width:25,
    height:25, 
  },
  addButton: {
    backgroundColor: "#006973",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,    
    ...Platform.select({
      web:{
        backgroundColor: "#123AD4",
        width:300,
        alignItems:"center",
        marginTop:5,
      }
    }),
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  webCenter:{
    marginHorizontal:40,
    backgroundColor:"#ED7390",
    borderRadius:20,
    borderWidth:1,
    borderColor:"#00DCFB",
    paddingHorizontal:100,
    paddingVertical:70,
  },
});


export default DataAssets;
