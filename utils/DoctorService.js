import {API_URL} from "../env-vars"

export const registerMedicalProof = async (profileData) => {
    const response = await fetch(`${API_URL}/doctorsService/updateProfile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profileData),
    });
    if (!response.ok) {
        throw new Error("Profile update failed");
    }
    return response.json();
};