const BASE_URL = " http://localhost:8000/api/v1/";

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

export {BASE_URL, TITLES_ENDPOINT_ALLOWED_PARAMS, GENRES_ENDPOINT_ALLOWED_PARAMS};
