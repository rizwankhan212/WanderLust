document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults");
  const cards = document.querySelectorAll(".list-card"); // ✅ only listing cards

  // Check if searchInput exists (only on listings page)
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    let matchFound = false;

    cards.forEach(card => {
      // Since your HTML has: <div class="card h-100 list-card col">
      // The card element itself has both .list-card AND .col classes
      const cardTitle = card.querySelector("h6").innerText.toLowerCase();
      const cardCategory = card.querySelector(".category").innerText.toLowerCase();

      if (cardTitle.includes(query) || cardCategory.includes(query)) {
        card.style.display = "block"; // ✅ show the card (which is also the column)
        matchFound = true;
      } else {
        card.style.display = "none";  // ✅ hide the card (which is also the column)
      }
    });

    if (noResults) {
      noResults.style.display = matchFound ? "none" : "block";
    }
  });
});