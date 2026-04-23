import { fetchTitles, fetchTitleById, buildTitlesParams } from "./fetch.js";
import { renderBestMovie, renderTopRated } from "./render.js";

document.addEventListener("DOMContentLoaded", async () => {

    // ── Fetch top 7 films sorted by IMDB score ──────────────────────────────
    const { data: titlesData, error: titlesError } = await fetchTitles(
        buildTitlesParams({ page: 1, page_size: 7, sort_by: "-imdb_score" })
    );
    if (titlesError) throw titlesError;

    const [bestMovie, ...topRatedMovies] = titlesData.results;
    // ── Fetch full details of the best movie (description requires the /id endpoint) ──
    const { data: bestMovieData, error: bestMovieError } = await fetchTitleById(bestMovie.id);
    if (bestMovieError) throw bestMovieError;

    // ── Render ───────────────────────────────────────────────────────────────
    renderBestMovie(bestMovieData);
    renderTopRated(topRatedMovies);
});
