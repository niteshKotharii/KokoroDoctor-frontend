import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, NavigationContainerRef} from "@react-navigation/native";
import { HeaderButtonsProvider } from "react-navigation-header-buttons/HeaderButtonsProvider";
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../contexts/Themes';
import Login from "../screens/PatientScreens/Auth/Login";
import ForgotPassword from "../screens/PatientScreens/Auth/ForgotPassword";
import ResetPassword from "../screens/PatientScreens/Auth/ResetPassword";
import PasswordSuccess from "../screens/PatientScreens/Auth/PasswordSuccess";
import Signup from "../screens/PatientScreens/Auth/Signup";
import LandingPage from "../screens/PatientScreens/LandingPage";
import DoctorPatientLandingPage from "../screens/DoctorScreens/DoctorRegistration/DoctorPatientLandingPage";
import DoctorsSignUp from "../screens/DoctorScreens/DoctorRegistration/DoctorsSignUp";

//Doctors
import ConsultWithDoctors from "../screens/PatientScreens/Doctors/ConsultWithDoctors";
import DoctorNearYou from "../screens/PatientScreens/Doctors/DoctorNearYou";
import DoctorResultShow from "../screens/PatientScreens/Doctors/DoctorResultShow";
import DoctorsInfoWithRating from "../screens/PatientScreens/Doctors/DoctorsInfoWithRating";
import DoctorAvailabilitySlots from "../screens/PatientScreens/Doctors/App/DoctorAvailabilitySlots";
import AppDoctorsRating from "../screens/PatientScreens/Doctors/App/AppDoctorsRating";
import DoctorsPaymentScreen from "../screens/PatientScreens/Doctors/DoctorsPaymentScreen";
import BookingConfirmation from "../screens/PatientScreens/Doctors/App/BookingConfirmation";

//Hospitals
import AllHospitals from "../screens/PatientScreens/Hospitals/AllHospitals";
import EmergencyLocation from "../screens/PatientScreens/Hospitals/App/EmergencyLocation";
import HospitalsInfoWithRating from "../screens/PatientScreens/Hospitals/HospitalsInfoWithRating";
import HospitalBookingNext from "../screens/PatientScreens/Hospitals/App/HospitalBookingNext";
import BookHospitals from "../screens/PatientScreens/Hospitals/BookHospitals";
import HospitalCard from "../components/PatientScreenComponents/HospitalComponents/HospitalCard";
import HospitalAvailability from"../screens/PatientScreens/Hospitals/App/HospitalAvailability";
import HospitalAvailabilitySlots from"../screens/PatientScreens/Hospitals/App/HospitalAvailabilitySlots";
import HospitalPaymentApp from"../screens/PatientScreens/Hospitals/App/HospitalPaymentApp";

//AboutUs
import AboutUsMain from "../screens/PatientScreens/AboutUs/AboutUsMain";
import AboutUsWhat from "../screens/PatientScreens/AboutUs/AboutUsWhat";
import AboutUsHow from "../screens/PatientScreens/AboutUs/AboutUsHow";
import AboutUsWhy from "../screens/PatientScreens/AboutUs/AboutUsWhy";

//Pricing
import MainPricing from "../screens/PatientScreens/Pricing/MainPricing";
import ElitePlan from "../screens/PatientScreens/Pricing/App/ElitePlan";
import ExecutivePlan from "../screens/PatientScreens/Pricing/App/ExecutivePlan";
import PlatinumPlan from "../screens/PatientScreens/Pricing/App/PlatinumPlan";

//Other Screens
import BillReceipt from "../screens/PatientScreens/BillReceipt";
import Error from "../screens/PatientScreens/Error";
import Medilocker from "../screens/PatientScreens/Medilocker";
import Settings from "../screens/PatientScreens/Settings";
import Help from "../screens/PatientScreens/Help";
import ContactUs from "../screens/PatientScreens/ContactUs";
import MobileChatbot from "../components/PatientScreenComponents/ChatbotComponents/MobileChatbot";

const Stack = createNativeStackNavigator();

//It will allow native stack to behave as web stack so that we could see the url and navigate using browser buttons
const linking = {
  prefixes: ['/', 'https://kokoro.doctor'],
  config: {
    screens: {
      DoctorPatientLandingPage:"Home",
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
      <Stack.Screen name="DoctorAvailabilitySlots" component={DoctorAvailabilitySlots} options={{ headerShown: false }} /> 
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

const AboutUsNavigator = ({navigationRef}) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Stack.Navigator
      initialRouteName="AboutUsMain"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.container.backgroundColor,
          },
          headerTintColor: theme.text.color,
        }}
    >

      <Stack.Screen name="AboutUsMain" component={AboutUsMain} options={{ headerShown: false }} /> 
      <Stack.Screen name="AboutUsWhat" component={AboutUsWhat} options={{ headerShown: false }} /> 
      <Stack.Screen name="AboutUsHow" component={AboutUsHow} options={{ headerShown: false }} /> 
      <Stack.Screen name="AboutUsWhy" component={AboutUsWhy} options={{ headerShown: false }} /> 
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
          initialRouteName="DoctorPatientLandingPage"
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
          <Stack.Screen name="AboutUs" component={AboutUsNavigator} options={{ headerShown: false }} /> 
          <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} /> 
          <Stack.Screen name="Pricing" component={PricingNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="BillReceipt" component={BillReceipt} options={{ headerShown: false }} />
          <Stack.Screen name="MobileChatbot" component={MobileChatbot} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} /> 
          <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} /> 
          <Stack.Screen name="Error" component={Error} /> 
          <Stack.Screen name="DoctorPatientLandingPage" component={DoctorPatientLandingPage} options={{ headerShown: false }} /> 
          <Stack.Screen name="DoctorsSignUp" component={DoctorsSignUp} options={{headerShown:false}}/>
        </Stack.Navigator>
      </HeaderButtonsProvider>
    </NavigationContainer>
  );
}

export default AppNavigation;
