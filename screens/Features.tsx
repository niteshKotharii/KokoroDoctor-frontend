import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Switch,
  Platform,
  StatusBar,
} from 'react-native';
import MyLinearGradient from '../components/MyLinearGradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MyDropdown from '../components/MyDropDown';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../navigation/Navigation"
import WebHeader from '../components/WebHeader';

type FeaturesProps = NativeStackScreenProps<RootStackParamList, 'Features'>

const Features = ( {navigation, route}: FeaturesProps) => {
  const {source} = route.params;
  const [isPremium, setIsPremium] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <MyLinearGradient style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#333" />
      {Platform.OS!=='web' &&
      <>
      <View style={styles.header}>
        <View style={styles.toggleContainer}>
          <Image source={require('../assets/Icons/Home.png')} />
          <Text style={styles.toggleText}>Standard</Text>
          <Switch
            value={isPremium}
            onValueChange={value => setIsPremium(value)}
            thumbColor={isPremium ? '#4285F4' : '#f4f3f4'}
            trackColor={{false: '#767577', true: '#81b0ff'}}
          />
          <Text style={styles.toggleText}>Premium</Text>
        </View>
        <Image
          source={require('../assets/Images/profile.jpeg')}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.headerButton} onPress={()=>{navigation.navigate('Source')}}>
          <Text style={styles.headerButtonText}>Source</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          {source=='Ingestion' && <Text style={styles.headerButtonText}> Transformation </Text> }
          {source=='DataAssets' && <Text style={styles.headerButtonText}> Config </Text> }
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          {source=='Ingestion' && <Text style={styles.headerButtonText}> Target </Text> }
          {source=='DataAssets' && <Text style={styles.headerButtonText}> Preview </Text> }
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          {source=='Ingestion' && <Text style={styles.headerButtonText}> Configure </Text> }
          {source=='DataAssets' && <Text style={styles.headerButtonText}> Save </Text> }
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#fff" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#fff"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <View style={styles.middle}>
        <View style={styles.dropdown}>
          <MyDropdown/>
        </View>
        <View style={styles.infocontainer}>
          {source==='DataAssets' && <Text style={styles.infoText}>
            Experience the power of Kokoro.doctor data asset feature by uploading a
            CSV, JSON, TEXT, Parquet, or ORC file (up to 10 MB) directly from
            your PC using the Upload File option. To create data assets from
            sources like Amazon S3, BigQuery, or other data repositories, simply
            select the Featuresropriate option from the grid below.
          </Text>}

          {source==='Ingestion' && <Text style={styles.infoText}>
            Upload CSV, JSON, TEXT, Parquet, or ORC file (up to 10 MB).
          </Text>}
        </View>
      </View>

      <View style={styles.iconGrid}>
        <View style={styles.iconlayer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../assets/Icons/Source.png')} />
            <Text style={styles.iconText}>Health Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../assets/Icons/Salesforce.png')} />
            <Text style={styles.iconText}>Consult Experts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../assets/Icons/Act.png')} />
            <Text style={styles.iconText}>Act CRM</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconlayer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../assets/Icons/CloudUpload.png')} />
            <Text style={styles.iconText}>File Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../assets/Icons/Storage_Amazon_S3.png')} />
            <Text style={styles.iconText}>Amazon S3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../assets/Icons/quickbase.png')} />
            <Text style={styles.iconText}>Track Health Trends</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconlayer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../assets/Icons/data_store.png')} />
            <Text style={styles.iconText}>Data Assets</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../assets/Icons/Jira.png')} />
            <Text style={styles.iconText}>Jira</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../assets/Icons/Facebook.png')} />
            <Text style={styles.iconText}>Knowledge Hub</Text>
          </TouchableOpacity>
        </View>
      </View>
      </>}

      {Platform.OS==='web' &&
        <>
          <WebHeader/>
          <View style={styles.webContainer}>
            <View style={styles.flexrow}>
              <View style={styles.webHeader}>
                <TouchableOpacity style={styles.webHeaderButton} onPress={()=>{navigation.navigate('Source')}}><Text style={{color:"#fff"}}>Get Started</Text></TouchableOpacity>
                <TouchableOpacity style={styles.webHeaderButton}><Text style={{color:"#D4AF37"}}>Explore Features</Text></TouchableOpacity>
              </View>
              {/* <View style={styles.webNavBar}>
                <TouchableOpacity style={styles.webNavButton} onPress={()=>{navigation.navigate('Source')}}><Text>Source</Text></TouchableOpacity>
                <TouchableOpacity style={styles.webNavButton}><Text>Configuration</Text></TouchableOpacity>
                <TouchableOpacity style={styles.webNavButton}><Text>Preview</Text></TouchableOpacity>
                <TouchableOpacity style={styles.webNavButton}><Text>Save</Text></TouchableOpacity>
              </View> */}
            </View>
            <View style={styles.searchContainer}>
              <Icon name="search" size={24} color="#fff" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#fff"
                value={searchText}
                onChangeText={text => setSearchText(text)}
              />
            </View>
            <View style={styles.webCategoryButtons}>
              {["heart health overview", "Know your Heart", "Symptom Analysis", "Prevention Tips", "Consult Experts", " Chat with AI heart assistant", ].map((category) => (
                <TouchableOpacity key={category} style={styles.webCategoryButton}>
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
                {source==='DataAssets' && <Text style={styles.webDescription}>
                Get AI-driven insights for your heart health. Upload your angiography reports, ECG, or other related files (up to 10 MB) to receive accurate analysis and expert recommendations. Select options below to explore. 
              </Text>}

              {source==='Ingestion' && <Text style={styles.webDescription}>
                Upload CSV, JSON, TEXT, Parquet, or ORC file (up to 10 MB).
              </Text>}
            {/* <View style={styles.webIconGrid}>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../assets/Icons/Source.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>Sample Source</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../assets/Icons/CloudUpload.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>Upload Reports</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../assets/Icons/data_store.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>Data Assets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../assets/Icons/Salesforce.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>Salesforce</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../assets/Icons/Act.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>Act!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../assets/Icons/quickbase.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>QuickBase</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../assets/Icons/Facebook.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../assets/Icons/Jira.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>Jira</Text>
                </TouchableOpacity>
            </View> */}
          </View>
        </>
      }
    </MyLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    ...Platform.select({
      web:{
        flex:0,
        padding:10,
      }
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    color: '#fff',
    marginHorizontal: 10,
    fontSize: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerButton: {
    backgroundColor: '#B8BAC24D',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B8BAC24D',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    ...Platform.select({
      web:{
        width:"50%",
        marginLeft:50,
        alignSelf:"center",
      }
    }),
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
    ...Platform.select({
      web:{
          outlineStyle: 'none',
          borderWidth: 0,
      }
  }),
  },
  middle:{
    flexDirection:"row",
    justifyContent:"center",
    gap:5,
  },
  dropdown: {
    marginLeft: 10,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
  },
  infocontainer : {
    backgroundColor:"#B8BAC24D",
    borderColor:"#000",
    borderRadius:10,
    paddingHorizontal:10,
    paddingVertical:7,
    width:"60%",
    marginBottom: 20,
    marginRight: 15,
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems:"flex-start",
    marginTop:10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconlayer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  iconText: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  webContainer: {
    flex: 1,
    backgroundColor: '#ED7390',
    padding: 20,
  },
  flexrow:{
    flexDirection:"row",
    gap:300,
  },
  webHeader: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  webHeaderButton: {
    backgroundColor: '#0892A591',
    padding: 10,
    marginRight: 10,
    maxWidth:100,
    marginBottom:10,
    justifyContent:"center",
  },
  webNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor:"#B8BAC24D",
    paddingHorizontal:100,
    paddingVertical:15,
    borderRadius: 40,
    alignSelf:"center",
  },
  webNavButton: {
    backgroundColor: '#a8a7a5',
    padding: 10,
    borderRadius: 5,
    marginHorizontal:30,
  },
  webCategoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width:"90%",
    marginHorizontal:"auto",
    marginTop:30,
  },
  webCategoryButton: {
    backgroundColor: '#CCCCCC',
    padding: 10,
    borderRadius: 5
  },
  categoryText:{
    fontWeight:"bold",
  },
  webDescription: {
    color: '#FFF',
    marginBottom: 20,
    width:"50%",
    marginHorizontal:"auto",
    fontSize:24,
  },
  webIconGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconImg:{
    width:20,
    height:20,
    resizeMode:"contain",
  },
  webIconButton: {
    alignItems: 'center',
    margin: 10,
    paddingHorizontal:20,
    paddingVertical:8,
    backgroundColor:"#D9D9D9",
    maxWidth:80,
  },
  webIconLabel: {
    color: '#000',
    marginTop: 5,
    fontSize:10,
  }
});

export default Features;
