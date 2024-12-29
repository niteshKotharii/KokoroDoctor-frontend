import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from '../constants/ThemeContext';
import { lightTheme, darkTheme } from '../constants/Themes';
import First from "../screens/First";
import Second from "../screens/Second";
import Login from "../screens/Login";
import Home from "../screens/Home";
import DataAssets from "../screens/DataAssets";
import Features from "../screens/Features";
import Ingestion from "../screens/Ingestion";
import Source from "../screens/4StepProcess/Source";
import Transformation from "../screens/4StepProcess/Transformation";
import Target from "../screens/4StepProcess/Target";
import Configure from "../screens/4StepProcess/Configure";
import Error from "../screens/Error";
import WebHeader from "../components/WebHeader";
import { NavigationContainer } from "@react-navigation/native";


export type RootStackParamList = {
  First: undefined;
  Second: undefined;
  Login: undefined;
  Home: undefined;
  DataAssets: undefined,
  Features: {source:string},
  Ingestion: undefined,
  Source:undefined,
  Transformation:undefined,
  Target:undefined,
  Configure:undefined,
  Error: undefined,
  WebHeader: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="First"
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
