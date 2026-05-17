import { fetchAllGenreNames, fetchTitles, fetchTitleById } from "./fetch.js";
import { renderBestMovie, renderMovieGrid, renderRandomMovieGrid,renderCategorySelect } from "./render.js";
import { openModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", async () => {

     // ── Fetch films' data from API ──────────────────────────────

    // ── top 7 films + all genres fetched in parallel ──────────────────
    const [
        { data: titlesData, error: titlesError },
        { data: allGenres, error: genresError }
    ] = await Promise.all([
        fetchTitles({ page_size: 7, sort_by: "-imdb_score" }),
        fetchAllGenreNames()
    ]);

    if (titlesError) {
        console.error("Could not reach the API for fetching top rated movies.", titlesError);
        return;
    }
    if (genresError) {
        console.error("Could not reach the API for fetching genre names.", genresError);
        return;
    }

    const [bestMovie, ...topRatedMovies] = titlesData.results;

    const indexOne = Math.floor(Math.random() * allGenres.length);
    const randomGenreOne = allGenres[indexOne];
    allGenres.splice(indexOne, 1);

    const indexTwo = Math.floor(Math.random() * allGenres.length);
    const randomGenreTwo = allGenres[indexTwo];
    allGenres.splice(indexTwo, 1);

    // ── Fetch best movie details + 3 genre grids in parallel ────────
    const [
        { data: bestMovieData, error: bestMovieError },
        { data: moviesByRandomGenreOne, error: moviesByRandomGenreError },
        { data: moviesByRandomGenreTwo, error: moviesByRandomGenreTwoError },
        { data: moviesRemainingGenre, error: moviesRemainingGenreError }
    ] = await Promise.all([
        fetchTitleById(bestMovie.id),
        fetchTitles({ page_size: 6, genre: randomGenreOne }),
        fetchTitles({ page_size: 6, genre: randomGenreTwo }),
        fetchTitles({ page_size: 6, genre: allGenres[0] })
    ]);

    if (bestMovieError) {
        console.error("Could not reach the API for fetching movie details.", bestMovieError);
        return;
    }
    if (moviesByRandomGenreError) {
        console.error("Could not reach the API for fetching movies for random genre one.", moviesByRandomGenreError);
        return;
    }
    if (moviesByRandomGenreTwoError) {
        console.error("Could not reach the API for fetching movies for random genre two.", moviesByRandomGenreTwoError);
        return;
    }
    if (moviesRemainingGenreError) {
        console.error("Could not reach the API for fetching movies for remaining genres. Is your local server running?", moviesRemainingGenreError);
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
