import {BASE_URL, TITLES_ENDPOINT_ALLOWED_PARAMS, GENRES_ENDPOINT_ALLOWED_PARAMS} from "./const.js";

async function fetchData(url) {
    /*
    this function is used to fetch data from the API
    it always return 2 objects: data, error
    data : fetched data in JSON format
    error: contains an Error object if there is an error, null otherwise
    */
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

async function fetchTitles(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}titles/${queryString ? "?" + queryString : ""}`;
    return fetchData(url);
}

async function fetchTitleById(id) {
    const url = `${BASE_URL}titles/${id}`;
    return fetchData(url);
}

async function fetchGenres(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}genres/${queryString ? "?" + queryString : ""}`;
    return fetchData(url);
}

function buildParams(allowed, params = {}) {
    return Object.fromEntries(
        Object.entries({ page: 1, ...params })
            .filter(([key, value]) => allowed.includes(key) && value !== null)
    );
}

const buildTitlesParams = (params) => buildParams(TITLES_ENDPOINT_ALLOWED_PARAMS, params);
const buildGenresParams = (params) => buildParams(GENRES_ENDPOINT_ALLOWED_PARAMS, params);


export { fetchTitles, fetchTitleById, fetchGenres, buildTitlesParams, buildGenresParams };
