import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  Platform,
} from 'react-native';
import MyLinearGradient from '../../components/MyLinearGradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MyDropdown from '../../components/MyDropDown';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../../navigation/Navigation"
import WebHeader from '../../components/WebHeader';
import WebDropdown from '../../components/WebDropDown';

type TransformationProps = NativeStackScreenProps<RootStackParamList, 'Transformation'>

const Transformation = ( {navigation}: TransformationProps) => {
  const [searchText, setSearchText] = useState('');

  return (
    <MyLinearGradient style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      {Platform.OS!=='web' &&
      <>
      <View style={styles.header}>
        <View style={styles.toggleContainer}>
          <Image source={require('../../assets/Icons/Home.png')} />
        </View>
        <Image
          source={require('../../assets/Images/profile.jpeg')}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.buttonText}>3D Heart Analysis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.topButton, styles.selectedTopButton]}>
          <Text style={styles.buttonText}>Heart Age Calculator</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton} onPress={()=>{navigation.navigate('Target')}}>
          <Text style={styles.buttonText}>Risk Assessment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton}>
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
      </View>
      <View style={styles.transformContainer}>
        <Image source={require('../../assets/Images/Transformation.png')}/>
      </View>
      </>}

      {Platform.OS==='web' &&
        <>
          <WebHeader/>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.topButton}>
                    <Text style={styles.buttonText}>3D Heart Analysis</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.topButton, styles.selectedTopButton]}>
                    <Text style={styles.buttonText}>Heart Age Calculator</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topButton} onPress={()=>{navigation.navigate('Target')}}>
                    <Text style={styles.buttonText}>Risk Assessment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topButton}>
                    <Text style={styles.buttonText}>Heart attack likelihood</Text>
                </TouchableOpacity>
            </View>
          <View style={styles.webContainer}>
            <View style={styles.imgContainer}><Image source={require('../../assets/Images/hearth.png')} style={styles.webTransformation}/></View>
            {/* <View>
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
                <WebDropdown/>  
            </View>      */}
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
        padding:0,
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
        marginTop: 0,
        width:"70%",
        marginHorizontal:"auto",
        marginBottom:10,
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
        width:500,
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
    gap:5,
  },
  dropdown: {
    marginLeft: 10,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
  },
  transformContainer:{
    justifyContent:"center",
    alignItems:"center",
    marginTop:80,
  },
  transformationImg:{
    width:200,
    height:200,
  },
  webContainer: {
    flex: 1,
    backgroundColor: '#381BAB4D',
    padding: 20,
    flexDirection:"row",
    justifyContent:"space-around",
  },
  imgContainer:{
    // height:"50%",
    justifyContent:"center",
    alignItems:"center",
  },
  webTransformation:{
    resizeMode:"cover",
  },
});

export default Transformation;
