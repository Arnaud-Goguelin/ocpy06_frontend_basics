import {fetchTitles, buildTitlesParams} from "./fetch.js";

//  ToDo: add loader if get time
// showLoader();
const { data: titlesData, error: titlesError } = await fetchTitles(buildTitlesParams({page: 1, page_size: 7}));
// hideLoader();

if (titlesError) throw titlesError;
console.log(titlesData);
