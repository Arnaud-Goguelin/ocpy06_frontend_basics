import { fetchTitleById } from "./fetch.js";
import { createModal } from "./render.js";

async function openModal(movieId) {
    const { data, error } = await fetchTitleById(movieId);
    if (error) throw error;

    const overlay = createModal(data);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (event) => {
        if (!event.target.closest(".modal")) closeModal();
    });

    overlay.querySelectorAll(".close-button-tablet-mobile, .close-button-desktop")
        .forEach(btn => btn.addEventListener("click", closeModal));
}

function closeModal() {
    document.querySelector(".background-modal")?.remove();
}

export { openModal, closeModal };
