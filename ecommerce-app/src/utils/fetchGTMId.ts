import axios from "axios";

export async function fetchGTMId() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/settings`);
    return response.data[0]?.gtm_id || null;
  } catch (error) {
    console.error("Erreur lors de la récupération du GTM ID depuis Strapi", error);
    return null;
  }
}
