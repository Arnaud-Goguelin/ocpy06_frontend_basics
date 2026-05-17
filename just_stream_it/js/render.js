/**
 * Renders the best movie section with full details
 * @param {Object} movie - Full movie details object from the API (fetched by id)
 */
function renderBestMovie(movie) {
    const container = document.querySelector("#best-movie-content");
    container.setAttribute("data-movie-id", movie.id);

    const img = document.createElement("img");
    img.setAttribute("src", movie.image_url);
    img.setAttribute("alt", `affiche de ${movie.title}`);

    const div = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.textContent = movie.title;

    const p = document.createElement("p");
    p.textContent = movie.description;

    const button = document.createElement("button");
    button.classList.add("primary-button");
    button.textContent = "Détails";

    div.append(h3, p, button);
    container.replaceChildren(img, div);
}

/**
 * Renders a single movie card for the grid sections
 * @param {Object} movie - Movie object from the list API response
 * @returns {HTMLElement} The article element for the movie card
 */
function createMovieCard(movie) {
    const article = document.createElement("article");
    article.setAttribute("data-movie-id", movie.id);

    const img = document.createElement("img");
    img.setAttribute("src", movie.image_url);
    img.setAttribute("alt", `affiche de ${movie.title}`);

    const div = document.createElement("div");

    const h4 = document.createElement("h4");
    h4.textContent = movie.title;

    const button = document.createElement("button");
    button.classList.add("secondary-button");
    button.textContent = "Détails";

    div.append(h4, button);
    article.append(img, div);

    return article;
}

/**
 * Renders the top-rated movies grid (films 2–7)
 * @param {Object[]} movies - Array of movie objects
 * @param {string} querySelector - The CSS selector for the grid container
 */
function renderMovieGrid(querySelector, movies ) {
    const grid = document.querySelector(querySelector);
    grid.replaceChildren(...movies.map(createMovieCard));
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

    const options = genres.map(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        return option;
    });

    select.replaceChildren(...options);
}

/**
 * Creates a dt/dd pair, optionally wrapped in a div with a CSS class
 * @param {string} dtText - The label text
 * @param {string} ddText - The value text
 * @param {string|null} wrapperClass - Optional CSS class for a wrapper div
 * @returns {HTMLElement|DocumentFragment} A wrapper div or a fragment with dt+dd
 */
function createDtDd(dtText, ddText, wrapperClass = null) {
    const dt = document.createElement("dt");
    dt.textContent = dtText;

    const dd = document.createElement("dd");
    dd.textContent = ddText;

    if (wrapperClass) {
        const wrapper = document.createElement("div");
        wrapper.classList.add(wrapperClass);
        wrapper.append(dt, dd);
        return wrapper;
    }

    const fragment = document.createDocumentFragment();
    fragment.append(dt, dd);
    return fragment;
}

/**
 * Creates the left-side movie info block (title + dl metadata)
 * @param {Object} movie
 * @returns {HTMLElement}
 */
function createMovieInfoBlock(movie) {
    const div = document.createElement("div");
    div.classList.add("movie-info");

    const h3 = document.createElement("h3");
    h3.textContent = movie.title;

    const dl = document.createElement("dl");

    const dtYear = document.createElement("dt");
    dtYear.classList.add("dt-hidden");
    dtYear.textContent = "Année - classification";
    const ddYear = document.createElement("dd");
    ddYear.textContent = `${movie.year} - ${movie.genres?.join(", ") ?? ""}`;

    const dtPg = document.createElement("dt");
    dtPg.classList.add("dt-hidden");
    dtPg.textContent = "Filtre PG - Durée";
    const ddPg = document.createElement("dd");
    ddPg.textContent = `${movie.rated ?? "N/A"} - ${movie.duration} minutes (${movie.countries?.join(" / ") ?? ""})`;

    const grossIncome = movie.worldwide_gross_income
        ? `$${Number(movie.worldwide_gross_income).toLocaleString("en-US")}`
        : "N/A";

    dl.append(
        dtYear,
        ddYear,
        dtPg,
        ddPg,
        createDtDd("IMDB score :", `${movie.imdb_score}/10`, "dl-inline"),
        createDtDd("Recettes au box-office :", grossIncome, "dl-inline"),
        createDtDd("Réalisé par :", movie.directors?.join(", ") ?? "N/A", "director"),
    );

    div.append(h3, dl);
    return div;
}

/**
 * Creates the bottom description block (synopsis + image + actors)
 * @param {Object} movie
 * @returns {HTMLElement}
 */
function createMovieDescriptionBlock(movie) {
    const dl = document.createElement("dl");
    dl.classList.add("movie-description");

    const dtSynopsis = document.createElement("dt");
    dtSynopsis.classList.add("dt-hidden");
    dtSynopsis.textContent = "Synopsis";
    const ddSynopsis = document.createElement("dd");
    ddSynopsis.textContent = movie.description;

    const imgTablet = document.createElement("img");
    imgTablet.classList.add("modal-tablet-img");
    imgTablet.setAttribute("src", movie.image_url);
    imgTablet.setAttribute("alt", `affiche du film ${movie.title}`);

    const dtActors = document.createElement("dt");
    dtActors.classList.add("dt-hidden");
    dtActors.textContent = "Acteurs";
    const ddActors = document.createElement("dd");
    ddActors.classList.add("actors");
    const withDiv = document.createElement("div");
    withDiv.textContent = "Avec :";
    ddActors.append(withDiv, ` ${movie.actors?.join(", ") ?? "N/A"}`);

    dl.append(dtSynopsis, ddSynopsis, imgTablet, dtActors, ddActors);
    return dl;
}

/**
 * Creates and returns the full modal element populated with movie data
 * @param {Object} movie - Full movie details object from the API
 * @returns {HTMLElement} The overlay element containing the modal
 */
function createModal(movie) {

    // create wrapper div elements for modal
    const overlay = document.createElement("div");
    overlay.classList.add("background-modal");

    const modal = document.createElement("div");
    modal.classList.add("modal");

    // create close button elements
    const closeButtonMobile = document.createElement("button");
    closeButtonMobile.classList.add("close-button-tablet-mobile");
    closeButtonMobile.setAttribute("aria-label", "close");
    closeButtonMobile.textContent = "❌";

    const closeButtonDesktop = document.createElement("button");
    closeButtonDesktop.classList.add("primary-button", "close-button-desktop");
    closeButtonDesktop.setAttribute("aria-label", "close");
    closeButtonDesktop.textContent = "Fermer";

    // create content elements
    const presentationDiv = document.createElement("div");
    presentationDiv.classList.add("movie-presentation");

    const imgDesktop = document.createElement("img");
    imgDesktop.classList.add("modal-desktop-img");
    imgDesktop.setAttribute("src", movie.image_url);
    imgDesktop.setAttribute("alt", `affiche du film ${movie.title}`);

    presentationDiv.append(createMovieInfoBlock(movie), imgDesktop);

    const descriptionBlock = createMovieDescriptionBlock(movie);

    
    modal.append(
        closeButtonMobile,
        presentationDiv,
        descriptionBlock,
        closeButtonDesktop,
    );

    overlay.appendChild(modal);

    // const main = document.getElementsByTagName("main");
    // main[0].classList.add("hide");

    return overlay;
}

export { renderBestMovie, renderMovieGrid, createMovieCard, renderRandomMovieGrid, renderCategorySelect, createModal };
