import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

const WebHeader = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
  
  return (
    <View style={styles.webHeader}>
        <TouchableOpacity style={styles.leftWeb} onPress={()=>{navigation.navigate("Home")}}>
            <Image source={require('../assets/Images/NewLogo.png')} style={styles.logo}/>
            <Text style={styles.logoText}>Kokoro.doctor</Text>
        </TouchableOpacity>
        <View style={styles.rightWeb}>
            <TouchableOpacity><Image source={require('../assets/Icons/TopDropDown/home.png')} style={styles.logo}/></TouchableOpacity>
            <TouchableOpacity><Image source={require('../assets/Icons/TopDropDown/Messages.png')} style={styles.logo}/></TouchableOpacity>
            <TouchableOpacity><Image source={require('../assets/Icons/TopDropDown/Notification.png')} style={styles.logo}/></TouchableOpacity>
            <TouchableOpacity><Image source={require('../assets/Icons/TopDropDown/FAQ.png')} style={styles.logo}/></TouchableOpacity>
            <TouchableOpacity><Image source={require('../assets/Icons/TopDropDown/Collab.png')} style={styles.logo}/></TouchableOpacity>
            {/* <TouchableOpacity style={styles.SignUpButton}>
                <Text style={styles.whiteText}>Sign Up</Text>
            </TouchableOpacity> */}
        </View>
    </View>
  )
}

export default WebHeader

const styles = StyleSheet.create({
    webHeader:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:20,
        marginTop:20,
        marginHorizontal:30,
      },
      logo:{
        width:25,
        height:25,
      },
      logoText:{
        color:"#fff",
        fontWeight:"500", 
        fontSize:18,
      },
      leftWeb:{
        flexDirection:"row",
        gap:5,
      },
      rightWeb:{
        flexDirection:"row",
        alignItems:"center",
        gap:15,
      },
      SignUpButton:{
        backgroundColor:"#B8BAC24D",
        borderRadius:30,
        padding:10,
        width:100,
        justifyContent:"center",
        alignItems:"center",
      },
      whiteText:{
        color:"#fff",
      },
})