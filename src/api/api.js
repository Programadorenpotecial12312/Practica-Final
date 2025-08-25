const BASE_URL = "https://adamix.net/medioambiente/";

export async function fetchData(endpoint) {
  try {
    let response = await fetch(BASE_URL + endpoint);
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}
