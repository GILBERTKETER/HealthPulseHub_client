import api from "./api";

export async function checkAuthentication() {
  try {
    const response = await api.get("api/login/auth.php");
    return response.data.authenticated;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}
