
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

export default fetchData;
