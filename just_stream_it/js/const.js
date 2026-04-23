const BASE_URL = "http://localhost:8000/api/v1/";

const TITLES_ENDPOINT_ALLOWED_PARAMS = [
    // django DRF basic queries
    "page",
    "page_size",
    // API custom queries according to docs
    "sort_by",
    "year",
    "min_year",
    "max_year",
    "imdb_score_min",
    "imdb_score_max",
    "title",
    "title_contains",
    "director",
    "director_contains",
    "writer",
    "writer_contains",
    "actor",
    "actor_contains",
    "genre",
    "genre_contains",
    "country",
    "country_contains",
    "lang",
    "lang_contains",
    "company",
    "company_contains",
    "rating",
    "rating_contains",
];

const GENRES_ENDPOINT_ALLOWED_PARAMS = [
    // API custom queries according to docs
    "name_contains",
    "movie_title_contains",
];

// /api/v1/genres/
let allowedGenres = [
    "Action",
    "Adult",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "News",
    "Reality-TV",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
];

const indexOne = Math.floor(Math.random() * allowedGenres.length);
const randomGenreOne = allowedGenres[indexOne];
allowedGenres.splice(indexOne, 1);

const indexTwo = Math.floor(Math.random() * allowedGenres.length);
const randomGenreTwo = allowedGenres[indexTwo];
allowedGenres.splice(indexTwo, 1);

export {BASE_URL, TITLES_ENDPOINT_ALLOWED_PARAMS, GENRES_ENDPOINT_ALLOWED_PARAMS, randomGenreOne, randomGenreTwo};
