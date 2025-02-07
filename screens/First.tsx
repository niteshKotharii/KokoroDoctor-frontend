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

type FirstProps = NativeStackScreenProps<RootStackParamList, 'First'>

const First = ({ navigation, route }: FirstProps) => {
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
    fontSize: 45,
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
});

export default First;
