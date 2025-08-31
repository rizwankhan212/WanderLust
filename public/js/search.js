document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults");
  const cards = document.querySelectorAll(".list-card"); // ✅ only listing cards

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    let matchFound = false;

    cards.forEach(card => {
      const cardTitle = card.querySelector("h6").innerText.toLowerCase();
      const cardCategory = card.querySelector(".category").innerText.toLowerCase();

      if (cardTitle.includes(query) || cardCategory.includes(query)) {
        card.parentElement.style.display = "block"; // ✅ show the column wrapper
        matchFound = true;
      } else {
        card.parentElement.style.display = "none";  // ✅ hide the column wrapper
      }
    });

    noResults.style.display = matchFound ? "none" : "block";
  });
});
