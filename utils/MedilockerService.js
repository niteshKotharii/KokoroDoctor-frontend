import { Alert } from "react-native";
import {API_URL} from "../env-vars";

const medilocker_API = `${API_URL}/medilocker`;

export const fetch = async(email) => {
    try {
        const response = await fetch(`${medilocker_API}/fetch`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
            }),
        });
    
        if (!response.ok) {
        throw new Error("Failed to load files from server");
        }

        const data = await response.json();
        return data;

    } catch (err) {
        alert(`Error: ${err.message}`);
        Alert.alert(`Error: ${err.message}`);
    }
}

export const upload = async (payload) => {
    try {
        const response = await fetch(`${medilocker_API}/upload`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
        throw new Error("File upload failed");
        }
    
        const data = await response.json();
        return data;

    } catch (err) {
        alert(`Error: ${err.message}`);
        Alert.alert(`Error: ${err.message}`);
    }
};

export const download = async (email, fileName) => {
    try {
        const response = await fetch(`${medilocker_API}/download`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                filename: fileName,
            }),
        });

        if (!response.ok) {
            throw new Error("Download request failed");
        }

        const data = await response.json();
        return data;

    } catch (err) {
        alert(`Error: ${err.message}`);
        Alert.alert(`Error: ${err.message}`);
    }
};

export const remove = async (email, fileName) => {
    try {
        const response = await fetch(`${medilocker_API}/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                filename: fileName,
            }),
        });
    
        if (!response.ok) {
            Alert.alert("Error", "Failed to remove file from server.");
            return;
        }

        const data = await response.json();
        return data;

    } catch (err) {
        alert(`Error: ${err.message}`);
        Alert.alert(`Error: ${err.message}`);
    }
};