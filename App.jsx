import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ChatbotProvider } from "./contexts/ChatbotContext";
import ChatBotOverlay from "./components/PatientScreenComponents/ChatbotComponents/ChatbotOverlay";
import { AuthProvider } from "./contexts/AuthContext";
import { RoleProvider } from "./contexts/RoleContext";
import RootNavigation, { linking } from "./navigation/RootNavigator";

import DoctorsSignUp from "./screens/DoctorScreens/DoctorRegistration/DoctorsSignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const App = () => {
	const navigationRef = useRef(null);

	return (
		<AuthProvider>
			<ThemeProvider>
				<ChatbotProvider>
					<RoleProvider>
						<NavigationContainer ref={navigationRef}>
							<Stack.Navigator>
								<Stack.Screen
									name="DoctorSignUp"
									component={DoctorsSignUp}
									options={{ headerShown: false }}
								/>
							</Stack.Navigator>
						</NavigationContainer>
						{/* <NavigationContainer
							linking={linking}
							ref={navigationRef}>
							<RootNavigation />
							<ChatBotOverlay navigationRef={navigationRef} />
						</NavigationContainer> */}
					</RoleProvider>
				</ChatbotProvider>
			</ThemeProvider>
		</AuthProvider>
	);
};

export default App;
