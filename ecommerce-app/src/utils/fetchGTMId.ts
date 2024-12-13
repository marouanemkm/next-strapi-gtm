import axios from "axios";

export async function fetchGTMId() {
  try {
    const response = await axios.get("http://localhost:1337/api/settings");
    return response.data[0]?.gtm_id || null;
  } catch (error) {
    console.error("Erreur lors de la récupération du GTM ID depuis Strapi", error);
    return null;
  }
}
