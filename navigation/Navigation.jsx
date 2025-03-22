import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, NavigationContainerRef} from "@react-navigation/native";
import { HeaderButtonsProvider } from "react-navigation-header-buttons/HeaderButtonsProvider";
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../contexts/Themes';
import First from "../screens/First";
import Second from "../screens/Second";
import Login from "../screens/Auth/Login";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import ResetPassword from "../screens/Auth/ResetPassword";
import PasswordSuccess from "../screens/Auth/PasswordSuccess";
import Signup from "../screens/Auth/Signup";
import Home from "../screens/Home";
import LandingPage from "../screens/LandingPage";
import ConsultWithDoctors from "../screens/Doctors/ConsultWithDoctors";
import DoctorResultShow from "../screens/Doctors/DoctorResultShow";
import DoctorsInfoWithRating from "../screens/Doctors/DoctorsInfoWithRating";
import DoctorsPaymentScreen from "../screens/Doctors/DoctorsPaymentScreen";
import Hospitals from "../screens/Hospitals";
import AllHospitals from "../screens/Hospitals/AllHospitals";
import EmergencyLocation from "../screens/Hospitals/EmergencyLocation";
import HospitalDetails from "../screens/Hospitals/HospitalDetails";
import AboutUs from "../screens/AboutUs";
import ContactUs from "../screens/ContactUs";
import Pricing from "../screens/Pricing";
import BillReceipt from "../screens/BillReceipt";
import DataAssets from "../screens/DataAssets";
import Features from "../screens/Features";
import Ingestion from "../screens/Ingestion";
import Source from "../screens/4StepProcess/Source";
import Transformation from "../screens/4StepProcess/Transformation";
import Target from "../screens/4StepProcess/Target";
import Configure from "../screens/4StepProcess/Configure";
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
      <Stack.Screen name="HospitalDetails" component={HospitalDetails} options={{ headerShown: false }} /> 
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
          <Stack.Screen name="First" component={First} options={{ headerShown: false }}/>
          <Stack.Screen name="Second" component={Second} options={{ headerShown: false }} /> 
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> 
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} /> 
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} /> 
          <Stack.Screen name="PasswordSuccess" component={PasswordSuccess} options={{ headerShown: false }} /> 
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} /> 
          <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} /> 
          <Stack.Screen name="Medilocker" component={Medilocker} options={{ headerShown: false }} /> 
          <Stack.Screen name="Doctors" component={DoctorNavigator} options={{ headerShown: false }} /> 
          <Stack.Screen name="Hospitals" component={Hospitals} options={{ headerShown: false }} /> 
          <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} /> 
          <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} /> 
          <Stack.Screen name="Pricing" component={Pricing} options={{ headerShown: false }} />
          <Stack.Screen name="BillReceipt" component={BillReceipt} options={{ headerShown: false }} />
          <Stack.Screen name="MobileChatbot" component={MobileChatbot} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> 
          <Stack.Screen name="DataAssets" component={DataAssets} options={{ headerShown: false }} /> 
          <Stack.Screen name="Features" component={Features} options={{ headerShown: false }} /> 
          <Stack.Screen name="Ingestion" component={Ingestion} options={{ headerShown: false }} /> 
          <Stack.Screen name="Source" component={Source} options={{ headerShown: false }} /> 
          <Stack.Screen name="Transformation" component={Transformation} options={{ headerShown: false }} /> 
          <Stack.Screen name="Target" component={Target} options={{ headerShown: false }} /> 
          <Stack.Screen name="Configure" component={Configure} options={{ headerShown: false }} /> 
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} /> 
          <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} /> 
          <Stack.Screen name="Error" component={Error} /> 
        </Stack.Navigator>
      </HeaderButtonsProvider>
    </NavigationContainer>
  );
}

export default AppNavigation;
