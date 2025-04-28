import React, { useRef, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppNavigation from "./navigation/PatientNavigation";
import { ChatbotProvider } from "./contexts/ChatbotContext";
import ChatBotOverlay from "./components/PatientScreenComponents/ChatbotComponents/ChatbotOverlay";
import { AuthProvider } from "./contexts/AuthContext";
import DoctorAppNavigation from "./navigation/DoctorsNavigation";
import { RegistrationProvider } from "./contexts/RegistrationContext";
import { RoleProvider, useRole } from "./contexts/RoleContext";

const NavigationHandler = ({ navigationRef }) => {
  const { role } = useRole();

  if (role === "doctor") {
    return (
      <RegistrationProvider>
        <DoctorAppNavigation navigationRef={navigationRef} />
      </RegistrationProvider>
    );
  } else {
    return <AppNavigation navigationRef={navigationRef} />;
  }
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
