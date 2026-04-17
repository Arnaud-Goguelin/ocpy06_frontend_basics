
async function fetchData(url) {
    /*
    this function is used to fetch data from the API
    it always return 3 objects: isLoading, data, error
    isLoading: True while function is fetching data
    data : fetched data in JSON format
    error: contains an Error object if there is an error, null otherwise
    */
    let isLoading = true;
    let data = null;
    let error = null;

    if (!url) {
        return { isLoading: false, data, error };
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
    } finally {
        isLoading = false;
    }

    return { isLoading, data, error };
}

export default fetchData;
