import { baseUrl } from "@/utils/baseUrl";

const loginAdmin = async (username: string, password: string) => {
  try {
    const response = await fetch(`${baseUrl}/auth/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login"); // Throw an error if response is not successful
    }

    const data = await response.json(); // Parse JSON response

    // Example: Assuming your API returns a token
    if (!data.token) {
      throw new Error("Invalid response: Missing token");
    }

    return data.token; // Return the token
  } catch (error) {
    console.error("Error:", error); // Log any errors
    throw error; // Propagate the error to the caller
  }
};

export default loginAdmin;
