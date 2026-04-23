/**
 * Renders the best movie section with full details
 * @param {Object} movie - Full movie details object from the API (fetched by id)
 */
function renderBestMovie(movie) {
    const container = document.querySelector("#best-movie-content");

    container.innerHTML = `
        <img src="${movie.image_url}" alt="affiche de ${movie.title}">
        <div>
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
            <button class="primary-button" data-movie-id="${movie.id}">Détails</button>
        </div>
    `;
}

/**
 * Renders a single movie card for the grid sections
 * @param {Object} movie - Movie object from the list API response
 * @returns {HTMLElement} The article element for the movie card
 */
function createMovieCard(movie) {
    const article = document.createElement("article");

    article.innerHTML = `
        <img src="${movie.image_url}" alt="affiche de ${movie.title}">
        <div>
            <h4>${movie.title}</h4>
            <button class="secondary-button" data-movie-id="${movie.id}">Détails</button>
        </div>
    `;

    return article;
}

/**
 * Renders the top-rated movies grid (films 2–7)
 * @param {Object[]} movies - Array of movie objects
 * @param {string} querySelector - The CSS selector for the grid container
 */
function renderMovieGrid(querySelector, movies ) {
    const grid = document.querySelector(querySelector);

    grid.innerHTML = "";
    movies.forEach(movie => grid.appendChild(createMovieCard(movie)));
}

/**
 * Renders a grid of movies into a given section, and updates the section's h2 title
 * @param {string} genre - The genre name to display in the h2
 * @param {Object[]} movies - Array of movie objects
 */
function renderRandomMovieGrid(sectionId, genre, movies) {
    const section = document.querySelector(`#${sectionId}`);
    const title = section.querySelector("h2");

    title.textContent = `Catégorie ${genre}`;
    renderMovieGrid(`#${sectionId} .grid`, movies);
}

/**
 * Populates the #category-select with the remaining genres
 * @param {string[]} genres - Array of genre names
 */
function renderCategorySelect(genres) {
    const select = document.querySelector("#category-select");

    select.innerHTML = "";
    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        select.appendChild(option);
    });
}

/**
 * Creates and returns the full modal element populated with movie data
 * @param {Object} movie - Full movie details object from the API
 * @returns {HTMLElement} The overlay element containing the modal
 */
function createModal(movie) {
    const overlay = document.createElement("div");
    overlay.classList.add("background-modal");

    overlay.innerHTML = `
        <div class="modal">
            <button class="close-button-tablet-mobile" aria-label="close">❌</button>
            <div class="movie-presentation">
                <div>
                    <h3>${movie.title}</h3>
                    <dl>
                        <dt class="dt-hidden">Année - classification</dt>
                            <dd>${movie.year} - ${movie.genres?.join(", ") ?? ""}</dd>
                        <dt class="dt-hidden">Filtre PG - Durée</dt>
                            <dd>${movie.rated ?? "N/A"} - ${movie.duration} minutes (${movie.countries?.join(" / ") ?? ""})</dd>
                        <div class="dl-inline">
                            <dt>IMDB score :</dt>
                                <dd>${movie.imdb_score}/10</dd>
                        </div>
                        <div class="dl-inline">
                            <dt>Recettes au box-office :</dt>
                                <dd>${movie.worldwide_gross_income ? `$${Number(movie.worldwide_gross_income).toLocaleString("en-US")}` : "N/A"}</dd>
                        </div>
                        <div class="director">
                            <dt>Réalisé par :</dt>
                                <dd>${movie.directors?.join(", ") ?? "N/A"}</dd>
                        </div>
                    </dl>
                </div>
                <img class="modal-desktop-img" src="${movie.image_url}" alt="affiche du film ${movie.title}">
            </div>
            <dl class="movie-description">
                <dt class="dt-hidden">Synopsis</dt>
                    <dd>${movie.description}</dd>
                <img class="modal-tablet-img" src="${movie.image_url}" alt="affiche du film ${movie.title}">
                <dt class="dt-hidden">Acteurs</dt>
                    <dd class="actors"><div>Avec :</div> ${movie.actors?.join(", ") ?? "N/A"}</dd>
            </dl>
            <button class="primary-button close-button-desktop" aria-label="close">Fermer</button>
        </div>
    `;

    return overlay;
}

export { renderBestMovie, renderMovieGrid, createMovieCard, renderRandomMovieGrid, renderCategorySelect, createModal };
