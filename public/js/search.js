  document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
   const noResults = document.getElementById("noResults");
    const cards = document.querySelectorAll(".card");

   
   searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        console.log("Search query:", query); // Debugging line
        let matchFound = false;

        cards.forEach(card => {
           const cardTitle = card.querySelector(".card-text b").innerText.toLowerCase();
            if (cardTitle.includes(query)) {
                card.style.display = "block";
                matchFound = true;
            } else {
                card.style.display = "none";
            }
        });

        if (!matchFound) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }
    });
  });