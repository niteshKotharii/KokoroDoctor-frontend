import React, { useRef } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ChatbotProvider } from "./contexts/ChatbotContext";
import ChatBotOverlay from "./components/PatientScreenComponents/ChatbotComponents/ChatbotOverlay";
import { AuthProvider } from "./contexts/AuthContext";
import { RegistrationProvider } from "./contexts/RegistrationContext";
import { RoleProvider, useRole } from "./contexts/RoleContext";
import AppNavigation from "./navigation/PatientNavigation";
import DoctorAppNavigation from "./navigation/DoctorsNavigation";

// New component to conditionally render navigation based on role
const NavigationHandler = ({ navigationRef }) => {
  const { role } = useRole();

  if (role === "doctor") {
    return (
      <RegistrationProvider>
        <DoctorAppNavigation navigationRef={navigationRef} />
      </RegistrationProvider>
    );
  }

  if (role === "patient") {
    return <AppNavigation navigationRef={navigationRef} />;
  }

  // Default: show landing screen with buttons to set role
  return <AppNavigation navigationRef={navigationRef} />;
};

const App = () => {
  const navigationRef = useRef(null);

  return (
    <AuthProvider>
      <ThemeProvider>
        <ChatbotProvider>
          <RoleProvider>
            <NavigationHandler navigationRef={navigationRef} />
            <ChatBotOverlay navigationRef={navigationRef} />
          </RoleProvider>
        </ChatbotProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
