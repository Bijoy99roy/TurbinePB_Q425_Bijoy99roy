import { getEnvironmentBaseApi } from "../utils/common";


export async function incrementNonce() {
  try {
    const BASE = getEnvironmentBaseApi();

    const response = await fetch(`${BASE}/increment`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const latestId = await response.json();

    return latestId;
  } catch (error) {
    console.error(error);
    throw error;
  }
}