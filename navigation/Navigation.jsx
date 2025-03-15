import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, NavigationContainerRef} from "@react-navigation/native";
import { HeaderButtonsProvider } from "react-navigation-header-buttons/HeaderButtonsProvider";
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../contexts/Themes';
import First from "../screens/First";
import Second from "../screens/Second";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import LandingPage from "../screens/LandingPage";
import Doctors from "../screens/Doctors";
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
import Medilocker from "../screens/Medilocker";
import Settings from "../screens/Settings";
import Help from "../screens/Help";
import { Image, Platform, useWindowDimensions } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screens = {
  LandingPage: LandingPage,
  Doctors: Doctors,
  Medilocker: Medilocker,
  Hospitals: Hospitals,
  AboutUs: AboutUs,
  Settings: Settings,
  Help: Help,
  ContactUs: ContactUs,
  Second: Second,
  Home: Home,
  Login: Login,
  Signup: Signup,
  Ingestion: Ingestion,
  Source: Source,
  Transformation: Transformation,
  Target: Target,
  Configure: Configure,
  Error: Error,
};

function TabStackNavigator({ initialScreen }) {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {screens[initialScreen] && (
        <Stack.Screen name={initialScreen} component={screens[initialScreen]} />
      )}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> 
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} /> 
        <Stack.Screen name="Medilocker" component={Medilocker} options={{ headerShown: false }} /> 
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} /> 
        {/* <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} />  */}
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
  );
}

function MobileNavigator() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      initialRouteName="LandingPage"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.container.backgroundColor,
        },
        headerTintColor: theme.text.color,
      }}
    >
      <Tab.Screen
        name="LandingPage"
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: () => <Image source={require("../assets/Icons/HomeProfile.png")} />,
        }}
      >
        {() => <TabStackNavigator initialScreen="LandingPage" />}
      </Tab.Screen>

      <Tab.Screen name="Doctors" 
        options={{ tabBarLabel: "Doctors", headerShown: false, tabBarIcon: ({ color }) => <Image source={require("../assets/Icons/doctorTool.png")} /> }}>
        {() => <TabStackNavigator initialScreen="Doctors" />}
      </Tab.Screen>

      <Tab.Screen name="Hospitals"
        options={{ tabBarLabel: "Hospitals", headerShown: false, tabBarIcon: ({ color }) => <Image source={require("../assets/Icons/Medical Shield.png")} /> }}>
        {() => <TabStackNavigator initialScreen="Hospitals" />}  
      </Tab.Screen>

      <Tab.Screen name="Second"
        options={{ tabBarLabel: "24/7", headerShown: false, tabBarIcon: ({ color }) => <Image source={require("../assets/Icons/cardiacHealth.png")}/> }}>
        {() => <TabStackNavigator initialScreen="Second" />}
      </Tab.Screen>

      <Tab.Screen name="ContactUs"
        options={{ tabBarLabel: "Profile", headerShown: false, tabBarIcon: ({ color }) => <Image source={require("../assets/Icons/profile.png")}/> }}>
        {() => <TabStackNavigator initialScreen="ContactUs" />}
      </Tab.Screen>
      
    </Tab.Navigator>
  );
}

function WebNavigator() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return(
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
       <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} /> 
       <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} /> 
       <Stack.Screen name="Medilocker" component={Medilocker} options={{ headerShown: false }} /> 
       <Stack.Screen name="Doctors" component={Doctors} options={{ headerShown: false }} /> 
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
       <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} /> 
       <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} /> 
       <Stack.Screen name="Error" component={Error} /> 
    </Stack.Navigator>
  )
}

const AppNavigation = ({ navigationRef }) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const {width} = useWindowDimensions();
  return (
    <NavigationContainer ref={navigationRef}>
      <HeaderButtonsProvider stackType={"native"}>
        {(Platform.OS === "web" && width>1000)  ? <WebNavigator /> : <MobileNavigator />}
      </HeaderButtonsProvider>
    </NavigationContainer>
  );
}

export default AppNavigation;
