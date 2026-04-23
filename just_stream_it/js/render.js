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

export { renderBestMovie, renderMovieGrid, createMovieCard, renderRandomMovieGrid };
