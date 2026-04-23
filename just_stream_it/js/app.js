import { fetchAllGenreNames, fetchTitles, fetchTitleById, buildTitlesParams } from "./fetch.js";
import { renderBestMovie, renderMovieGrid, renderRandomMovieGrid } from "./render.js";

document.addEventListener("DOMContentLoaded", async () => {

    // ── Fetch films' data from API ──────────────────────────────
    // ── all genres ─────────────────────────────────────────────────────
    const { data: allGenres, error: genresError } = await fetchAllGenreNames();
    if (genresError) throw genresError;

    const indexOne = Math.floor(Math.random() * allGenres.length);
    const randomGenreOne = allGenres[indexOne];
    allGenres.splice(indexOne, 1);

    const indexTwo = Math.floor(Math.random() * allGenres.length);
    const randomGenreTwo = allGenres[indexTwo];
    allGenres.splice(indexTwo, 1);
    // ── top 7 films sorted by IMDB score ──────────────────────────────
    const { data: titlesData, error: titlesError } = await fetchTitles(
        buildTitlesParams({ page: 1, page_size: 7, sort_by: "-imdb_score" })
    );
    if (titlesError) throw titlesError;

    const [bestMovie, ...topRatedMovies] = titlesData.results;

    // ── full details of the best movie ──
    const { data: bestMovieData, error: bestMovieError } = await fetchTitleById(bestMovie.id);
    if (bestMovieError) throw bestMovieError;

    // ── 6 films sorted by a random genre ──────────────────────────────
    const { data: moviesByRandomGenreOne, error: moviesByRandomGenreError } = await fetchTitles(
        buildTitlesParams({ page: 1, page_size: 6, genre: randomGenreOne })
    );
    if (moviesByRandomGenreError) throw moviesByRandomGenreError;

    // ── 6 films sorted by another random genre ──────────────────────────────
    const { data: moviesByRandomGenreTwo, error: moviesByRandomGenreTwoError } = await fetchTitles(
        buildTitlesParams({ page: 1, page_size: 6, genre: randomGenreTwo })
    );
    if (moviesByRandomGenreTwoError) throw moviesByRandomGenreTwoError;

    // ── Render ───────────────────────────────────────────────────────────────
    renderBestMovie(bestMovieData);
    renderMovieGrid("#top-rated .grid", topRatedMovies);
    renderRandomMovieGrid("random-category-one", randomGenreOne, moviesByRandomGenreOne.results);
    renderRandomMovieGrid("random-category-two", randomGenreTwo, moviesByRandomGenreTwo.results);
});
