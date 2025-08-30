document.addEventListener("DOMContentLoaded", () => {
        const filters = document.querySelectorAll("#filters .filter");
        const cards = document.querySelectorAll(".list-card");
        const noResults = document.getElementById("noResults");

        filters.forEach(filter => {
            filter.addEventListener("click", () => {
                const category = filter.querySelector("p").innerText.trim();
                let matchFound = false;

                cards.forEach(card => {
                    const cardCategory = card.querySelector(".category").innerText.trim();
                    if (cardCategory === category) {
                        card.style.display = "block";
                         matchFound = true;
                    } else {
                        card.style.display = "none";
                    }
                });
                // Agar koi match nahi mila
            if (!matchFound) {
                noResults.style.display = "block";
            } else {
                noResults.style.display = "none";
            }
            });
        });

        // Optional: Reset filter on clicking the filter section again
        document.getElementById("filters").addEventListener("dblclick", () => {
            cards.forEach(card => card.style.display = "block");
        });
    });