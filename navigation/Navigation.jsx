import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, NavigationContainerRef} from "@react-navigation/native";
import { HeaderButtonsProvider } from "react-navigation-header-buttons/HeaderButtonsProvider";
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../contexts/Themes';
import Login from "../screens/Auth/Login";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import ResetPassword from "../screens/Auth/ResetPassword";
import PasswordSuccess from "../screens/Auth/PasswordSuccess";
import Signup from "../screens/Auth/Signup";
import LandingPage from "../screens/LandingPage";
//Doctors
import ConsultWithDoctors from "../screens/Doctors/ConsultWithDoctors";
import DoctorNearYou from "../screens/Doctors/DoctorNearYou";
import DoctorResultShow from "../screens/Doctors/DoctorResultShow";
import DoctorsInfoWithRating from "../screens/Doctors/DoctorsInfoWithRating";
import AppDoctorsRating from "../screens/Doctors/App/AppDoctorsRating";
import DoctorsPaymentScreen from "../screens/Doctors/DoctorsPaymentScreen";
import BookingConfirmation from "../screens/Doctors/App/BookingConfirmation";

//Hospitals
import AllHospitals from "../screens/Hospitals/AllHospitals";
import EmergencyLocation from "../screens/Hospitals/App/EmergencyLocation";
import HospitalsInfoWithRating from "../screens/Hospitals/HospitalsInfoWithRating";
import HospitalBookingNext from "../screens/Hospitals/App/HospitalBookingNext";
import BookHospitals from "../screens/Hospitals/BookHospitals";
import HospitalCard from "../components/HospitalCard";
import HospitalAvailability from"../screens/Hospitals/App/HospitalAvailability";
import HospitalAvailabilitySlots from"../screens/Hospitals/App/HospitalAvailabilitySlots";
import HospitalPaymentApp from"../screens/Hospitals/App/HospitalPaymentApp";

import AboutUs from "../screens/AboutUs";
import ContactUs from "../screens/ContactUs";

//Pricing
import MainPricing from "../screens/Pricing/MainPricing";
import ElitePlan from "../screens/Pricing/App/ElitePlan";
import ExecutivePlan from "../screens/Pricing/App/ExecutivePlan";
import PlatinumPlan from "../screens/Pricing/App/PlatinumPlan";

import BillReceipt from "../screens/BillReceipt";
import Error from "../screens/Error";
import Medilocker from "../screens/Medilocker";
import Settings from "../screens/Settings";
import Help from "../screens/Help";
import MobileChatbot from "../components/MobileChatbot";

const Stack = createNativeStackNavigator();

//It will allow native stack to behave as web stack so that we could see the url and navigate using browser buttons
const linking = {
  prefixes: ['/', 'https://kokoro.doctor'],
  config: {
    screens: {
      LandingPage: '',
      //Add any other screen which requires id to be passed in the url
      //e.g - 
      // DoctorResultShow: 'doctor/:id'
      // where id could be user id or any specific detail of user
    },
  },
};

const DoctorNavigator = ({navigationRef}) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Stack.Navigator
      initialRouteName="ConsultWithDoctors"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.container.backgroundColor,
          },
          headerTintColor: theme.text.color,
        }}
    >
      <Stack.Screen name="ConsultWithDoctors" component={ConsultWithDoctors} options={{ headerShown: false }} /> 
      <Stack.Screen name="DoctorResultShow" component={DoctorResultShow} options={{ headerShown: false }} /> 
      <Stack.Screen name="DoctorsInfoWithRating" component={DoctorsInfoWithRating} options={{ headerShown: false }} /> 
      <Stack.Screen name="DoctorsPaymentScreen" component={DoctorsPaymentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DoctorNearYou" component={DoctorNearYou} options={{ headerShown: false }} /> 
      <Stack.Screen name="AppDoctorsRating" component={AppDoctorsRating} options={{ headerShown: false }} /> 
      <Stack.Screen name="BookingConfirmation" component={BookingConfirmation} options={{ headerShown: false }} />  
    </Stack.Navigator>
  );
}

const HospitalNavigator = ({navigationRef}) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Stack.Navigator
      initialRouteName="AllHospitals"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.container.backgroundColor,
          },
          headerTintColor: theme.text.color,
        }}
    >

      <Stack.Screen name="AllHospitals" component={AllHospitals} options={{ headerShown: false }} /> 
      <Stack.Screen name="EmergencyLocation" component={EmergencyLocation} options={{ headerShown: false }} /> 
      <Stack.Screen name="BookHospitals" component={BookHospitals} options={{ headerShown: false }} /> 
      <Stack.Screen name="HospitalsInfoWithRating" component={HospitalsInfoWithRating} options={{ headerShown: false }} /> 
      <Stack.Screen name="HospitalCard" component={HospitalCard} options={{ headerShown: false }} /> 
      <Stack.Screen name="HospitalAvailability" component={HospitalAvailability} options={{ headerShown: false }} /> 
      <Stack.Screen name="HospitalBookingNext" component={HospitalBookingNext} options={{ headerShown: false }} />
      <Stack.Screen name="HospitalAvailabilitySlots" component={HospitalAvailabilitySlots} options={{ headerShown: false }} />
      <Stack.Screen name="HospitalPaymentApp" component={HospitalPaymentApp} options={{ headerShown: false }} />  
    </Stack.Navigator>
  );
}

const PricingNavigator = ({navigationRef}) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Stack.Navigator
      initialRouteName="MainPricing"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.container.backgroundColor,
          },
          headerTintColor: theme.text.color,
        }}
    >

      <Stack.Screen name="MainPricing" component={MainPricing} options={{ headerShown: false }} /> 
      <Stack.Screen name="ElitePlan" component={ElitePlan} options={{ headerShown: false }} /> 
      <Stack.Screen name="ExecutivePlan" component={ExecutivePlan} options={{ headerShown: false }} /> 
      <Stack.Screen name="PlatinumPlan" component={PlatinumPlan} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
}

const AppNavigation = ({ navigationRef }) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <HeaderButtonsProvider stackType={"native"}>
        <Stack.Navigator
          initialRouteName="LandingPage"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.container.backgroundColor,
              },
              headerTintColor: theme.text.color,
            }}
        >
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> 
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} /> 
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} /> 
          <Stack.Screen name="PasswordSuccess" component={PasswordSuccess} options={{ headerShown: false }} /> 
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} /> 
          <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} /> 
          <Stack.Screen name="Medilocker" component={Medilocker} options={{ headerShown: false }} /> 
          <Stack.Screen name="Doctors" component={DoctorNavigator} options={{ headerShown: false }} /> 
          <Stack.Screen name="Hospitals" component={HospitalNavigator} options={{ headerShown: false }} /> 
          <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} /> 
          <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} /> 
          <Stack.Screen name="Pricing" component={PricingNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="BillReceipt" component={BillReceipt} options={{ headerShown: false }} />
          <Stack.Screen name="MobileChatbot" component={MobileChatbot} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} /> 
          <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} /> 
          <Stack.Screen name="Error" component={Error} /> 
        </Stack.Navigator>
      </HeaderButtonsProvider>
    </NavigationContainer>
  );
}

export default AppNavigation;
