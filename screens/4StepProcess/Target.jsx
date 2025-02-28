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
import MyLinearGradient from '../../components/MyLinearGradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MyDropdown from '../../components/MyDropDown';
import WebHeader from '../../components/WebHeader';

const Target = ({navigation}) => {
  const [isPremium, setIsPremium] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <MyLinearGradient style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      {Platform.OS!=='web' &&
      <>
      <View style={styles.header}>
        <View style={styles.toggleContainer}>
          <Image source={require('../../assets/Icons/Home.png')} />
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
          source={require('../../assets/Images/profile.jpeg')}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.buttonText}>Source</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.buttonText}>Target</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.topButton, styles.selectedTopButton]}>
          <Text style={styles.buttonText}>Target</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton} onPress={()=>{navigation.navigate('Configure')}}>
          <Text style={styles.buttonText}>Heart attack likelihood</Text>
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
          <Text style={styles.infoText}>
          Targets define the destination stage of a data ingestion application in Kokoro.doctor. Targets could be a NoSQL store, indexer, relational database, or a third party BI tool.
          </Text>
        </View>
      </View>
      {/* <View style={styles.iconGrid}>
        <View style={styles.iconlayer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../../assets/Icons/Salesforce.png')} />
            <Text style={styles.iconText}>Salesforce</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../../assets/Icons/Act.png')} />
            <Text style={styles.iconText}>Act CRM</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconlayer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../../assets/Icons/Storage_Amazon_S3.png')} />
            <Text style={styles.iconText}>Amazon S3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../../assets/Icons/quickbase.png')} />
            <Text style={styles.iconText}>Quickbase</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconlayer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../../assets/Icons/Jira.png')} />
            <Text style={styles.iconText}>Jira</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../../assets/Icons/Facebook.png')} />
            <Text style={styles.iconText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      </>}

      {Platform.OS==='web' &&
        <>
          <WebHeader navigation={navigation}/>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.topButton}>
                    <Text style={styles.buttonText}>3D Heart Analysis</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topButton}>
                    <Text style={styles.buttonText}>Heart Age Calculator</Text>
                </TouchableOpacity>
                    <TouchableOpacity style={[styles.topButton, styles.selectedTopButton]}>
                <Text style={styles.buttonText}>Risk Assessment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topButton} onPress={()=>{navigation.navigate('Configure')}}>
                    <Text style={styles.buttonText}>Heart attack likelihood</Text>
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
            <View style={styles.webCategoryButtons}>
              {["AM I AT RISK?", "Daily Habits Score", "Stress level risk", "Smoking impact checker", "Diabetes & heart link", "10 Year heart risk predictor", "Stroke Risk ditector"].map((category) => (
                <TouchableOpacity key={category} style={styles.webCategoryButton}>
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* <View style={styles.webIconGrid}>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../../assets/Icons/Source.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>3D Heart Analysis</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../../assets/Icons/CloudUpload.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>File Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../../assets/Icons/data_store.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>Data Assets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../../assets/Icons/Salesforce.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>Salesforce</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../../assets/Icons/Act.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>Act!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../../assets/Icons/quickbase.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>QuickBase</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../../assets/Icons/Facebook.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.webIconButton}>
                  <Image source ={require('../../assets/Icons/Jira.png')} style={styles.iconImg}/>
                  <Text style={styles.webIconLabel}>Jira</Text>
                </TouchableOpacity>
            </View> */}
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    ...Platform.select({
      web:{
        marginTop: 40,
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
        marginTop:40,
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
    marginTop:80,
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
  webIconGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:40,
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

export default Target;
