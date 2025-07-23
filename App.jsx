// import React, { useRef } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { ThemeProvider } from "./contexts/ThemeContext";
// import { ChatbotProvider } from "./contexts/ChatbotContext";
// import ChatBotOverlay from "./components/PatientScreenComponents/ChatbotComponents/ChatbotOverlay";
// import { AuthProvider } from "./contexts/AuthContext";
// import { RoleProvider } from "./contexts/RoleContext";
// import RootNavigation, { linking } from "./navigation/RootNavigator";

// const App = () => {
// 	const navigationRef = useRef(null);

// 	return (
// 		<AuthProvider>
// 			<ThemeProvider>
// 				<ChatbotProvider>
// 					<RoleProvider>
// 						<NavigationContainer
// 							linking={linking}
// 							ref={navigationRef}>
// 							<RootNavigation />
// 							<ChatBotOverlay navigationRef={navigationRef} />
// 						</NavigationContainer>
// 					</RoleProvider>
// 				</ChatbotProvider>
// 			</ThemeProvider>
// 		</AuthProvider>
// 	);
// };

// export default App;

// import React, { useRef } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { ThemeProvider } from "./contexts/ThemeContext";
// import { ChatbotProvider } from "./contexts/ChatbotContext";
// import ChatBotOverlay from "./components/PatientScreenComponents/ChatbotComponents/ChatbotOverlay";
// import { AuthProvider } from "./contexts/AuthContext";
// import { RoleProvider } from "./contexts/RoleContext";
// import RootNavigation, { linking } from "./navigation/RootNavigator";

// const App = () => {
// 	const navigationRef = useRef(null);

// 	return (
// 		<AuthProvider>
// 			<ThemeProvider>
// 				<ChatbotProvider>
// 					<RoleProvider>
// 						<NavigationContainer
// 							linking={linking}
// 							ref={navigationRef}>
// 							<RootNavigation />
// 							<ChatBotOverlay navigationRef={navigationRef} />
// 						</NavigationContainer>
// 					</RoleProvider>
// 				</ChatbotProvider>
// 			</ThemeProvider>
// 		</AuthProvider>
// 	);
// };

// export default App;

import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ChatbotProvider } from "./contexts/ChatbotContext";
import ChatBotOverlay from "./components/PatientScreenComponents/ChatbotComponents/ChatbotOverlay";
import { AuthProvider } from "./contexts/AuthContext";
import { RoleProvider } from "./contexts/RoleContext";
import RootNavigation, { linking } from "./navigation/RootNavigator";
import AllHospitals from "./screens/PatientScreens/Hospitals/AllHospitals";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HospitalsInfoWithRating from "./screens/PatientScreens/Hospitals/HospitalsInfoWithRating";
import DoctorsSignUp from "./screens/DoctorScreens/DoctorRegistration/DoctorsSignUp";
import DoctorAvailabilitySlots from "./screens/PatientScreens/Doctors/App/DoctorAvailabilitySlots";
import HospitalAvailability from "./screens/PatientScreens/Hospitals/App/HospitalAvailability";
const Stack = createNativeStackNavigator();
const App = () => {
	const navigationRef = useRef(null);

	return (
		<AuthProvider>
			<ThemeProvider>
				<ChatbotProvider>
					<RoleProvider>
						<NavigationContainer
							linking={linking}
							ref={navigationRef}>
							{/* <Stack.Navigator initialRouteName="HospitalsInfoWithRating">
								<Stack.Screen
									name="HospitalsInfoWithRating"
									component={HospitalsInfoWithRating}
								/>
							</Stack.Navigator> */}
							<Stack.Navigator initialRouteName="HospitalAvailability">
								<Stack.Screen
									name="HospitalAvailability"
									component={HospitalAvailability}
								/>
							</Stack.Navigator>
							<ChatBotOverlay navigationRef={navigationRef} />
						</NavigationContainer>
					</RoleProvider>
				</ChatbotProvider>
			</ThemeProvider>
		</AuthProvider>

		// <AuthProvider>
		// 	<ThemeProvider>
		// 		<ChatbotProvider>
		// 			<RoleProvider>
		// 				<NavigationContainer
		// 					linking={linking}
		// 					ref={navigationRef}>
		// 					{/* <HospitalsInfoWithRating /> */}
		// 					<RootNavigation />
		// 					<ChatBotOverlay navigationRef={navigationRef} />
		// 				</NavigationContainer>
		// 			</RoleProvider>
		// 		</ChatbotProvider>
		// 	</ThemeProvider>
		// </AuthProvider>
	);
};

export default App;
