document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelectorAll("#filters .filter");
    const cards = document.querySelectorAll(".list-card");
    const noResults = document.getElementById("noResults");

    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            const category = filter.querySelector("p").innerText.trim().toLowerCase();
            let matchFound = false;

            cards.forEach(card => {
                const cardCategory = card.querySelector(".category").innerText.trim().toLowerCase();
                if (cardCategory === category) {
                    card.style.display = "block";
                    matchFound = true;
                } else {
                    card.style.display = "none";
                }
            });

            // Show "no results" if nothing matches
            noResults.style.display = matchFound ? "none" : "block";
        });
    });

    // Double click on filter bar → reset all
    document.getElementById("filters").addEventListener("dblclick", () => {
        cards.forEach(card => card.style.display = "block");
        noResults.style.display = "none";
    });
});
