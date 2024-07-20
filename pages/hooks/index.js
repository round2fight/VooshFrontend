import axios from "axios";

const API_URL = "http://localhost:3000";

export const signIn = async () => {
  try {
    const response = await axios.get(`${API_URL}/signin`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
