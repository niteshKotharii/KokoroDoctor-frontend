import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import MyLinearGradient from '../components/MyLinearGradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/Navigation"
import ChatBot from './ChatBot';

type FirstProps = NativeStackScreenProps<RootStackParamList, 'First'>

const First = ({ navigation, route }: FirstProps) => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  return (
    <MyLinearGradient style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Images/NewLogo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Kokoro.doctor</Text>
      </View>
      <TouchableOpacity
        style={styles.arrowContainer}
        onPress={() => {
          navigation.navigate('Second');
        }}>
        <Image
          source={require('../assets/Images/right-arrow.png')}
          style={styles.arrow}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.chatbotButton, { position: 'absolute', bottom: 20, right: 20 }]}
        onPress={() => {
          setChatbotVisible(!isChatbotVisible);
        }}>
        <Image
          source={require('../assets/Images/chaticon.png')}
          style={{ width: 36, height: 36 }}
        />
      </TouchableOpacity>
      <View style={{ position: 'absolute', bottom: 50, right: 20, width: 400, height: 400 }}>
        {isChatbotVisible && (
          <ChatBot navigation={navigation} route={route}
            setChatbotVisible={setChatbotVisible}
          />
        )}
      </View>
    </MyLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
    ...Platform.select({
      web: {
        flex: 1,
      },
    }),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'web' ? '10%' : '75%',
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 10,
    ...Platform.select({
      web: {
        width: 80,
        height: 80,
      },
    }),
  },
  title: {
    fontSize: 50,
    fontWeight: '700',
    color: '#00A3FF',
    letterSpacing: -1,
    ...Platform.select({
      web: {
        fontSize: 70,
      },
    }),
  },
  arrowContainer: {
    marginBottom: 50,
    ...Platform.select({
      web: {
        marginBottom: 80,
      },
    }),
  },
  arrow: {
    width: 50,
    height: 50,
  },
  chatbotButton: {
    // backgroundColor: '#007AFF',
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // borderRadius: 5,
    // marginBottom: 20,
  },
  chatbotButtonText: {
    // color: '#fff',
    // fontSize: 18,
    // fontWeight: 'bold',
  },
});

export default First;
