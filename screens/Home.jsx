import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image, StatusBar, Platform} from 'react-native';
import MyLinearGradient from '../components/MyLinearGradient';
import SearchBar, {SearchBarHandle} from '../components/SearchBar';
import WebHeader from '../components/WebHeader';

const Home = ({navigation}) => {
  const searchBarRef = useRef<SearchBarHandle>(null);

  const handleBlur = () => {
    if (searchBarRef.current) {
      searchBarRef.current.blur();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleBlur}>
      <MyLinearGradient style={styles.container}>
      {Platform.OS==='web' && <WebHeader navigation={navigation}/>}
        <StatusBar barStyle="light-content" backgroundColor="#333" />
        {Platform.OS!=='web' &&
        <>
          <View style={styles.header}>
            <SearchBar ref={searchBarRef} />
            <TouchableOpacity>
              <Image source={require('../assets/Images/profile.jpeg')} style={styles.profileImage} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>
            Welcome To <Text style={styles.highlight}>Kokoro.doctor</Text>
          </Text>
          <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('DataAssets')}}>
            <Image source={require('../assets/Images/img2.jpeg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Analyze Heart Reports</Text>
            <Text style={styles.cardDescription}>
              Upload angiography, ECG, or other heart related reoports for accurate AI-driven analysis and guidance.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('../assets/Images/img1.jpeg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Heart Health Dashboard</Text>
            <Text style={styles.cardDescription}>
              Create View personalized heart health insights, risk assessments and actionable recommendations.
            </Text>
          </TouchableOpacity>
        </>
        }
        
        { Platform.OS==='web' &&
          <View style={styles.webCenter}>
            <View style={styles.profilesection}>
              <TouchableOpacity>
                <Image source={require('../assets/Images/profile.jpeg')} style={styles.profileImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.webRight}>
              <View style={styles.cardsContainer}>
                <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('DataAssets')}}>
                  <Image source={require('../assets/Images/img2.jpeg')} style={styles.cardImage} />
                  <Text style={styles.cardTitle}>Analyze Heart Reports</Text>
                  <Text style={styles.cardDescription}>
                    Upload angiography, ECG, or other heart related reports for accurate AI-driven analysis and guidance.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                  <Image source={require('../assets/Images/img1.jpeg')} style={styles.cardImage} />
                  <Text style={styles.cardTitle}>Heart Health Dashboard</Text>
                  <Text style={styles.cardDescription}>
                    Create View personalized heart health insights, risk assessments, and actionable recommendations.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginVertical: 20,
    fontWeight: '900',
  },
  highlight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00A3FF',
    letterSpacing: -1,
  },
  cardsContainer:{
    ...Platform.select({
      web:{
        flexDirection:"row",
        gap:30,
      }
    }),
  },
  card: {
    backgroundColor: '#206CFF5C',
    // backgroundColor: '#F6F6F6',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    ...Platform.select({
      web:{
        width: '40%',
        justifyContent:"center",
        alignItems:"flex-start",
        paddingHorizontal:30,
      }
    }),
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    ...Platform.select({
      web:{
        height: 300,
        borderRadius: 20,
      }
    }),
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    ...Platform.select({
      web:{
        textAlign: 'left',
      }
    }),
  },
  webCenter:{
    marginHorizontal:40,
    backgroundColor:"#ED7390",
    borderRadius:20,
    flexDirection:"row",
    gap:100,
  },
  profilesection:{
    backgroundColor:"#E59850",
    padding:10,
    paddingTop:50,
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20,
  },
  webRight:{
    padding:80,
    justifyContent:"center",
    alignItems:"center",
  },
});

export default Home;
