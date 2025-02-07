import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from '../constants/ThemeContext';
import { lightTheme, darkTheme } from '../constants/Themes';
import First from "../screens/First";
import Second from "../screens/Second";
import Login from "../screens/Login";
import Home from "../screens/Home";
import LandingPage from "../screens/LandingPage";
import Dashboard from "../screens/Dashboard";
import Hospitals from "../screens/Hospitals";
import AboutUs from "../screens/AboutUs";
import ContactUs from "../screens/ContactUs";
import DataAssets from "../screens/DataAssets";
import Features from "../screens/Features";
import Ingestion from "../screens/Ingestion";
import Source from "../screens/4StepProcess/Source";
import Transformation from "../screens/4StepProcess/Transformation";
import Target from "../screens/4StepProcess/Target";
import Configure from "../screens/4StepProcess/Configure";
import Error from "../screens/Error";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";


export type RootStackParamList = {
  First: undefined;
  Second: undefined;
  Login: undefined;
  LandingPage: undefined;
  Dashboard: undefined;
  Hospitals: undefined;
  AboutUs: undefined;
  ContactUs: undefined;
  Home: undefined;
  DataAssets: undefined,
  Features: {source:string},
  Ingestion: undefined,
  Source:undefined,
  Transformation:undefined,
  Target:undefined,
  Configure:undefined,
  Error: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type AppNavigationProps = {
  navigationRef: React.RefObject<NavigationContainerRef<any>>;
};

const AppNavigation: React.FC<AppNavigationProps> = ({ navigationRef }) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <NavigationContainer ref={navigationRef}>
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
       <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} /> 
       <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} /> 
       <Stack.Screen name="Hospitals" component={Hospitals} options={{ headerShown: false }} /> 
       <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} /> 
       <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} /> 
       <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> 
       <Stack.Screen name="DataAssets" component={DataAssets} options={{ headerShown: false }} /> 
       <Stack.Screen name="Features" component={Features} options={{ headerShown: false }} /> 
       <Stack.Screen name="Ingestion" component={Ingestion} options={{ headerShown: false }} /> 
       <Stack.Screen name="Source" component={Source} options={{ headerShown: false }} /> 
       <Stack.Screen name="Transformation" component={Transformation} options={{ headerShown: false }} /> 
       <Stack.Screen name="Target" component={Target} options={{ headerShown: false }} /> 
       <Stack.Screen name="Configure" component={Configure} options={{ headerShown: false }} /> 
       <Stack.Screen name="Error" component={Error} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
