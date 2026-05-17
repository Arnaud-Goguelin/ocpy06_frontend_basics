import {BASE_URL, TITLES_ENDPOINT_ALLOWED_PARAMS} from "./const.js";

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
 * This function acts like an assert.
 * Filters and validates query parameters against an allowed list for a given endpoint.
 * Adds `page: 1` as a default parameter if not provided.
 *
 * - Throws an Error if an unknown key (not in `allowed`) is passed.
 * - Warns and skips any parameter with a `null` value.
 *
 * @param {string[]} allowed - Array of allowed parameter keys for the target endpoint
 * @param {Object} params - Query parameters to validate and filter
 * @returns {Object} A sanitized object containing only valid, non-null parameters
 * @throws {Error} If a parameter key is not in the `allowed` list
 */
function buildParams(allowed, params = {}) {
    const mergedParams = { page: 1, ...params };
    const result = {};

    for (const key in mergedParams) {
        const value = mergedParams[key];

        if (!allowed.includes(key)) {
            throw new Error(`Invalid param: "${key}" is not allowed for this endpoint.`);
        }
        if (value === null) {
            console.warn(`Param "${key}" is null and will be ignored.`);
            continue;
        }

        result[key] = value;
    }

    return result;
}

/** Arrow function to build query parameters for the titles endpoint */
const buildTitlesParams = (params) => buildParams(TITLES_ENDPOINT_ALLOWED_PARAMS, params);


/**
 * This function reuses fetchData with to get films'titles from the API
 * on a specific endpoint with query parameters added correctly
 * @param {Object} params - Query parameters to be added to the URL
 * @returns {{ data: Object|null, error: Error|null }} An object containing data in JSON format and error object
 */
async function fetchTitles(params = {}) {
    const safeParams = buildTitlesParams(params);
    const queryString = new URLSearchParams(safeParams).toString();
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
 * Fetches all genres from the API, handling pagination
 * @returns {{ data: string[]|null, error: Error|null }} An array of genre names
 */
async function fetchAllGenreNames() {
    let genres = [];
    let url = `${BASE_URL}genres/`;

    while (url) {
        const { data, error } = await fetchData(url);
        if (error) return { data: null, error };
        genres = genres.concat(data.results.map(g => g.name));
        url = data.next;
    }

    return { data: genres, error: null };
}

export { fetchTitles, fetchTitleById, fetchAllGenreNames };
