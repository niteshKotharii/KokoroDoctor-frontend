const API_URL = "https://b6dy3ctlt9.execute-api.ap-south-1.amazonaws.com/prod";

export const payment_api = async (amount) => {
    try {
      const response = await fetch(`${API_URL}/process-payment`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
  
      if (!response.ok) {
        throw new Error("Payment Failed");
      }
  
      const data = await response.json();
      return data.payment_link;
    } catch (error) {
      console.error("Payment API Error:", error.message);
      throw error;
    }
  };