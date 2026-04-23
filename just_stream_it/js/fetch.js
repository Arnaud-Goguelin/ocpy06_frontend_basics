import {BASE_URL, TITLES_ENDPOINT_ALLOWED_PARAMS, GENRES_ENDPOINT_ALLOWED_PARAMS} from "./const.js";

/**
 * This function is used to fetch data from the API
 * @param {string} url - The URL to fetch data from
 * @returns {{ data: Object|null, error: Error|null }} An object containing data in JSON format and error object
 */
async function fetchData(url) {
    let data = null;
    let error = null;

    if (!url) {
        return { data, error };
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            error = new Error(`HTTP error: ${response.status} - ${response.statusText}`);
        } else {
            data = await response.json();
        }
    } catch (err) {
        // Network error or JSON parsing error
        error = err;
    }

    return { data, error };
}

/**
 * This function reuses fetchData with to get films'titles from the API
 * on a specific endpoint with query parameters added correctly
 * @param {Object} params - Query parameters to be added to the URL
 * @returns {{ data: Object|null, error: Error|null }} An object containing data in JSON format and error object
 */
async function fetchTitles(params = {}) {

    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}titles/${queryString ? "?" + queryString : ""}`;
    return fetchData(url);
}

/**
 * This function reuses fetchData with to get one film by its id from the API
 * @param {number} id - The id of the film to fetch
 * @returns {{ data: Object|null, error: Error|null }} An object containing data in JSON format and error object
 */
async function fetchTitleById(id) {
    if (!id) return { data: null, error: new Error("id is required") };
    const url = `${BASE_URL}titles/${id}`;
    return fetchData(url);
}

/**
 * This function reuses fetchData with to get films by genre from the API
 * on a specific endpoint with query parameters added correctly
 * @param {Object} params - Query parameters to be added to the URL
 * @returns {{ data: Object|null, error: Error|null }} An object containing data in JSON format and error object
 */
async function fetchGenres(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}genres/${queryString ? "?" + queryString : ""}`;
    return fetchData(url);
}

/**
 * This function filters the provided parameters to only include those allowed by the API
 * and removes any null values
 * @param {string[]} allowed - Array of allowed parameter keys
 * @param {Object} params - Object containing query parameters
 * @returns {Object} Object with filtered and non-null parameters
 */
function buildParams(allowed, params = {}) {
    return Object.fromEntries(
        Object.entries({ page: 1, ...params })
            .filter(([key, value]) => allowed.includes(key) && value !== null)
    );
}

/** Arrow function to build query parameters for the titles endpoint */
const buildTitlesParams = (params) => buildParams(TITLES_ENDPOINT_ALLOWED_PARAMS, params);
/** Arrow function to build query parameters for the genres endpoint */
const buildGenresParams = (params) => buildParams(GENRES_ENDPOINT_ALLOWED_PARAMS, params);


export { fetchTitles, fetchTitleById, fetchGenres, buildTitlesParams, buildGenresParams };
