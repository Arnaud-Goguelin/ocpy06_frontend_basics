import { fetchAllGenreNames, fetchTitles, fetchTitleById, buildTitlesParams } from "./fetch.js";
import { renderBestMovie, renderMovieGrid, renderRandomMovieGrid,renderCategorySelect } from "./render.js";

document.addEventListener("DOMContentLoaded", async () => {

    // ── Fetch films' data from API ──────────────────────────────

    // ── top 7 films sorted by IMDB score ──────────────────────────────
    const { data: titlesData, error: titlesError } = await fetchTitles(
        buildTitlesParams({ page: 1, page_size: 7, sort_by: "-imdb_score" })
    );
    if (titlesError) throw titlesError;

    const [bestMovie, ...topRatedMovies] = titlesData.results;

    // ── full details of the best movie ──
    const { data: bestMovieData, error: bestMovieError } = await fetchTitleById(bestMovie.id);
    if (bestMovieError) throw bestMovieError;

    // ── all genres ─────────────────────────────────────────────────────
    const { data: allGenres, error: genresError } = await fetchAllGenreNames();
    if (genresError) throw genresError;

    const indexOne = Math.floor(Math.random() * allGenres.length);
    const randomGenreOne = allGenres[indexOne];
    allGenres.splice(indexOne, 1);

    const indexTwo = Math.floor(Math.random() * allGenres.length);
    const randomGenreTwo = allGenres[indexTwo];
    allGenres.splice(indexTwo, 1);

    // ── 6 films sorted by random genre one ──────────────────────────────
    const { data: moviesByRandomGenreOne, error: moviesByRandomGenreError } = await fetchTitles(
        buildTitlesParams({ page: 1, page_size: 6, genre: randomGenreOne })
    );
    if (moviesByRandomGenreError) throw moviesByRandomGenreError;

    // ── 6 films sorted by random genre two ──────────────────────────────
    const { data: moviesByRandomGenreTwo, error: moviesByRandomGenreTwoError } = await fetchTitles(
        buildTitlesParams({ page: 1, page_size: 6, genre: randomGenreTwo })
    );
    if (moviesByRandomGenreTwoError) throw moviesByRandomGenreTwoError;

    // ── 6 films of first remaining genre ──────────────────────────────
    const { data: moviesRemainingGenre, error: moviesRemainingGenreError } = await fetchTitles(
        buildTitlesParams({ page: 1, page_size: 6, genre: allGenres[0] })
    );
    if (moviesRemainingGenreError) throw moviesRemainingGenreError;

    // ── Render ───────────────────────────────────────────────────────────────
    renderBestMovie(bestMovieData);
    renderMovieGrid("#top-rated .grid", topRatedMovies);
    renderRandomMovieGrid("random-category-one", randomGenreOne, moviesByRandomGenreOne.results);
    renderRandomMovieGrid("random-category-two", randomGenreTwo, moviesByRandomGenreTwo.results);
    renderMovieGrid("#other-category .grid", moviesRemainingGenre.results);
    renderCategorySelect(allGenres);
     // ── Event listeners ──────────────────────────────────────────────────────
        document.querySelector("#category-select").addEventListener("change", async (e) => {
            const selectedGenre = e.target.value;
            const { data, error } = await fetchTitles(
                buildTitlesParams({ page: 1, page_size: 6, genre: selectedGenre })
            );
            if (error) throw error;
            renderMovieGrid("#other-category .grid", data.results);
        });
});
