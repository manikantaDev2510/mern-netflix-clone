// ✅ Import the axios HTTP client for making API requests
import axios from "axios";

// ✅ Import environment variables (specifically the TMDB API key)
import { ENV_VARS } from "../config/envVars.js";

/**
 * ✅ Function to fetch data from the TMDB API
 * @param {string} url - The complete TMDB API URL to fetch data from
 * @returns {object} - The JSON data returned from TMDB
 */
export const fetchFromTMDB = async (url) => {
    // ✅ Set request headers
    const options = {
        headers: {
            accept: "application/json", // Expecting JSON response from TMDB
            Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY, // Use Bearer token from env variables
        },
    };

    // ✅ Make the GET request to the TMDB API
    const response = await axios.get(url, options);

    // ✅ Handle failed response
    if (response.status !== 200) {
        // Throw an error if status code is not 200 (OK)
        throw new Error("Failed to fetch data from TMDB: " + response.statusText);
    }

    // ✅ Return the actual data from the API response
    return response.data;
};
