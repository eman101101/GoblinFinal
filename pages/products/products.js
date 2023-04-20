$(document).ready(async function () {
  const API_URL = "https://api.rawg.io/api/games?key=20ab043164dd4bce984602137384f970&page_size=6";
  $("#header").load("../../template/header/header.html", () => {
    $("#headerHome").removeClass().addClass("nav-link active text-black fw-bold");
});
// Load the footer.html into the footer div, once it's loaded execute callback to add class to footerHome div
$("#footer").load("../../template/footer/footer.html", () => {
    $("#footerHome").removeClass().addClass("nav-link active text-black fw-bold");
});
// Load shoppingCart.html
$("#shoppingCart").load("../../template/shoppingCart/shoppingCart.html");
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const games = data.results;
      displayProducts(games);
    })
    .catch((error) => console.error("Error fetching data:", error));
  
  function displayProducts(games) {
    const productsContainer = document.createElement("div");
    productsContainer.classList.add("products-container");
  
    games.forEach((game) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
  
      const productImage = document.createElement("img");
      productImage.classList.add("product-image");
      productImage.src = game.background_image;
      productCard.appendChild(productImage);
  
      const productDetails = document.createElement("div");
      productDetails.classList.add("product-details");
  
      const productName = document.createElement("h3");
      productName.textContent = game.name;
      productDetails.appendChild(productName);
  
      const productReleaseDate = document.createElement("p");
      productReleaseDate.textContent = `Release Date: ${game.released}`;
      productDetails.appendChild(productReleaseDate);
  
      const productGenre = document.createElement("p");
      productGenre.textContent = `Genre: ${game.genres.map((genre) => genre.name).join(", ")}`;
      productDetails.appendChild(productGenre);
  
      const productRating = document.createElement("p");
      productRating.textContent = `Rating: ${game.rating}`;
      productDetails.appendChild(productRating);
  
      productCard.appendChild(productDetails);
      productsContainer.appendChild(productCard);
    });
  
    document.querySelector("main").appendChild(productsContainer);
  }
});