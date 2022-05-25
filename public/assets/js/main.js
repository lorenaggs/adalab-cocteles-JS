"use strict";

const buttonSearch = document.querySelector(".button-search");
const cocktailssearch = document.querySelector(".cocktailssearch");
const buttonReset = document.querySelector(".button-reset");
const favoritesHtml = document.querySelector(".favorites");

function handleClickSearch(event) {
  event.preventDefault();
  const input = document.querySelector(".input").value;
  fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      const dataDrinks = data.drinks;
      if (data.drinks === null) {
        cocktailssearch.innerHTML = `El coctel buscado no existe`;
      } else {
        localStorage.setItem("drinkslocal", JSON.stringify(dataDrinks));
        buildCoctails();
      }
    });
}

buttonSearch.addEventListener("click", handleClickSearch);

function buildCoctails() {
  const drinkslocal = JSON.parse(localStorage.getItem("drinkslocal"));
  let html = "";

  for (const drink of drinkslocal) {
    const nameDrink = drink.strDrink;
    const imageDrink = drink.strDrinkThumb;
    const idDrink = drink.idDrink;

    html += `<li class="listsearch">`;
    html += `<div class="cocktails" id="${idDrink}">`;
    html += `<h2>${nameDrink}</h2>`;
    if (imageDrink === "") {
      html += `<img class="image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=C%C3%B3ctel">`;
    } else {
      html += `<img class="image" src="${imageDrink}">`;
    }
    html += `</div>`;
    html += `</li>`;
  }

  cocktailssearch.innerHTML = html;
  handleClickCocktails();
}

function handleClickCocktails() {
  const cocktails = document.querySelectorAll(".cocktails");
  for (const item of cocktails) {
    item.addEventListener("click", addFavorite);
  }
}

function addFavorite(event) {
  // let favHtml = 'Lista de cocteles favoritos';
  const drinkslocal = JSON.parse(localStorage.getItem("drinkslocal"));
  const favoritesHtml = document.querySelector(".favorites");
  const idCocktailsSelect = event.currentTarget.id;

  const favoriteSelect = drinkslocal.find(
    (x) => x.idDrink === idCocktailsSelect
  );

  let drinkslocalFav = JSON.parse(localStorage.getItem("drinkslocalFav"));

  if (drinkslocalFav === null) {
    drinkslocalFav = [];
  }

  const renderCoctelFav = drinkslocalFav.findIndex(
    (x) => x.idDrink === idCocktailsSelect
  );
  // console.log(renderCoctelFav);
  if (renderCoctelFav === -1) {
    drinkslocalFav.push(favoriteSelect);
    localStorage.setItem("drinkslocalFav", JSON.stringify(drinkslocalFav));

    let favHtml = "";

    const nameDrink = favoriteSelect.strDrink;
    const imageDrink = favoriteSelect.strDrinkThumb;
    const idDrink = favoriteSelect.idDrink;
    favHtml += `<li class="favorites">`;
    favHtml += `<div class="cocktailsfavorites">`;
    favHtml += `<h2>${nameDrink}</h2>`;
    favHtml += `<div class="favimage">`;
    favHtml += `<img class="image" src="${imageDrink}">`;
    favHtml += `<p class="selecdelete" id="fav-${idDrink}">x</p>`;
    favHtml += `</div>`;
    favHtml += `</div>`;
    favHtml += `</li>`;

    favoritesHtml.innerHTML += favHtml;
    colorSelecFav(idDrink);
    handleClickDelete();
  }
}

function colorSelecFav(idDrink) {
  const cocktailsFav = document.getElementById(idDrink);
  cocktailsFav.classList.add("selecfavo");
}

function handleClickDelete() {
  const selecdelete = document.querySelectorAll(".selecdelete");
  for (const itemFav of selecdelete) {
    itemFav.addEventListener("click", deleteFavorite);
  }
}

function deleteFavorite(event) {
  const idFavorite = event.currentTarget.id;

  let idCoctel = idFavorite.split("-")[1];

  const drinkslocalFav = JSON.parse(localStorage.getItem("drinkslocalFav"));
  const indexFavorite = drinkslocalFav.findIndex((x) => {
    return x.idDrink === idCoctel;
  });
  drinkslocalFav.splice(indexFavorite, 1);

  localStorage.setItem("drinkslocalFav", JSON.stringify(drinkslocalFav));
  const favoritesHtml = document.querySelector(".favorites");
  favoritesHtml.innerHTML = "";

  let favHtml = "";
  for (const drinks of drinkslocalFav) {
    const nameDrink = drinks.strDrink;
    const imageDrink = drinks.strDrinkThumb;
    const idDrink = drinks.idDrink;
    favHtml += `<li class="favorites">`;
    favHtml += `<div class="cocktailsfavorites">`;
    favHtml += `<h2>${nameDrink}</h2>`;
    favHtml += `<div class="favimage">`;
    favHtml += `<img class="image" src="${imageDrink}">`;
    favHtml += `<p class="selecdelete" id="fav-${idDrink}">x</p>`;
    favHtml += `</div>`;
    favHtml += `</div>`;
    favHtml += `</li>`;

    favoritesHtml.innerHTML = favHtml;
  }
  handleClickDelete();
  deleteBorderSearch(idCoctel);
}

function deleteBorderSearch(idDrink) {
  const cocktailsFav = document.getElementById(idDrink);
  cocktailsFav.classList.remove("selecfavo");
}

function clearSearch() {
  localStorage.removeItem("drinkslocal");
  localStorage.removeItem("drinkslocalFav");
  favoritesHtml.innerHTML = "";
  cocktailssearch.innerHTML = "";
}

buttonReset.addEventListener("click", clearSearch);
clearSearch();
//# sourceMappingURL=main.js.map
