import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthHandler() {
  const navigate = useNavigate();

  useEffect(async () => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get("access_token");

    if (accessToken) {
      console.log("Login successful!", accessToken);
      await AsyncStorage.setItem("token", accessToken); 
      navigate("/");
    }
  }, []);

  return <div>Authenticating...</div>;
}
