import fetchData from "./fetch.js";
import API_URL from "./const.js";

let pageNumber = 1;
const filmUrl = API_URL + `titles/?page=${pageNumber}`;

//  ToDo: add loader if get time
// showLoader();
const {data, error} = await fetchData(filmUrl);
// hideLoader();

if (error) {
    throw error;
}

console.log(data);
