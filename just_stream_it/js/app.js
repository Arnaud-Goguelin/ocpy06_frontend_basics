import { fetchAllGenreNames, fetchTitles, fetchTitleById } from "./fetch.js";
import { renderBestMovie, renderMovieGrid, renderRandomMovieGrid,renderCategorySelect } from "./render.js";
import { openModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", async () => {

    // ── Fetch films' data from API ──────────────────────────────

    // ── top 7 films sorted by IMDB score ──────────────────────────────
    const { data: titlesData, error: titlesError } = await fetchTitles({ page_size: 7, sort_by: "-imdb_score" });
    if (titlesError){
        console.error("Could not reach the API for fetching top rated movies.", titlesError);
        return;
    }

    const [bestMovie, ...topRatedMovies] = titlesData.results;

    // ── full details of the best movie ──
    const { data: bestMovieData, error: bestMovieError } = await fetchTitleById(bestMovie.id);
    if (bestMovieError){
        console.error("Could not reach the API for fetching movie details.", bestMovieError);
        return;
    }

    // ── all genres ─────────────────────────────────────────────────────
    const { data: allGenres, error: genresError } = await fetchAllGenreNames();
    if (genresError){
        console.error("Could not reach the API for fetching genre names.", genresError);
        return;
    }

    const indexOne = Math.floor(Math.random() * allGenres.length);
    const randomGenreOne = allGenres[indexOne];
    allGenres.splice(indexOne, 1);

    const indexTwo = Math.floor(Math.random() * allGenres.length);
    const randomGenreTwo = allGenres[indexTwo];
    allGenres.splice(indexTwo, 1);

    // ── 6 films sorted by random genre one ──────────────────────────────
    const { data: moviesByRandomGenreOne, error: moviesByRandomGenreError } = await fetchTitles(
        { page: 1, page_size: 6, genre: randomGenreOne }
    );
    if (moviesByRandomGenreError){
        console.error("Could not reach the API for fetching movies for radom genre one.", moviesByRandomGenreError);
        return;
    }

    // ── 6 films sorted by random genre two ──────────────────────────────
    const { data: moviesByRandomGenreTwo, error: moviesByRandomGenreTwoError } = await fetchTitles(
        { page: 1, page_size: 6, genre: randomGenreTwo }
    );
    if (moviesByRandomGenreTwoError){
        console.error("Could not reach the API for fetching movies for radom genre two.", moviesByRandomGenreTwoError);
        return;
    }

    // ── 6 films of first remaining genre ──────────────────────────────
    const { data: moviesRemainingGenre, error: moviesRemainingGenreError } = await fetchTitles(
        { page: 1, page_size: 6, genre: allGenres[0] }
    );
    if (moviesRemainingGenreError){
        console.error("Could not reach the API for fetching movies for remaining genres. Is your local server" +
            " running?", moviesRemainingGenreError);
        return;
    }
    // ── Render ───────────────────────────────────────────────────────────────
    renderBestMovie(bestMovieData);
    renderMovieGrid("#top-rated .grid", topRatedMovies);
    renderRandomMovieGrid("random-category-one", randomGenreOne, moviesByRandomGenreOne.results);
    renderRandomMovieGrid("random-category-two", randomGenreTwo, moviesByRandomGenreTwo.results);
    renderMovieGrid("#other-category .grid", moviesRemainingGenre.results);
    renderCategorySelect(allGenres);
     // ── Event listeners ──────────────────────────────────────────────────────
        document.querySelector("#category-select").addEventListener("change", async (event) => {
            const selectedGenre = event.target.value;
            const { data, error } = await fetchTitles(
                { page: 1, page_size: 6, genre: selectedGenre }
            );
            if (error){
                console.error("Could not reach the API for fetching movies for selected genre.", error);
                return;
            }
            renderMovieGrid("#other-category .grid", data.results);
        });

        document.addEventListener("click", (event) => {
            const btn = event.target.closest("[data-movie-id]");
            if (btn) openModal(btn.dataset.movieId);
        });
});

window.addEventListener("unhandledrejection", (event) => {
    console.error("Unexpected error:", event.reason);
});
