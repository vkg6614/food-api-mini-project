var popup = document.querySelector(".nameDiv");
var showdata = document.querySelector(".showdata");
var btn = document.getElementById("searchBtn");
var navbarDiv = document.querySelector(".mainDiv");
var iBox = document.querySelector("input");
import navbar from "./component/navbar.js";
import getData from "./script/function.js";
navbarDiv.innerHTML = navbar();
await getData(`https://www.themealdb.com/api/json/v1/1/search.php?s&apikey=1`);
var fName = document.querySelector("input").value;

var data = await getData(
  `https://www.themealdb.com/api/json/v1/1/search.php?s=${fName}&apikey=1`
);

// console.log(data);
// start debouncing
// let fName = document.querySelector(".header input");
function append(d) {
  popup.innerHTML = null;
  d.forEach(({ strMeal, strArea, strMealThumb }) => {
    let food = document.createElement("p");
    food.textContent = strMeal;
    popup.append(food);

    food.addEventListener("click", function () {
      iBox.value = strMeal;
      popup.style.display = "none";
    });

    btn.addEventListener("click", function () {
      showdata.innerHTML = "";
      var image = document.createElement("img");
      var area = document.createElement("p");
      var food_name = document.createElement("p");
      area.textContent = `Country : ${strArea}`;
      food_name.textContent = `Name : ${iBox.value}`;
      image.src = strMealThumb;
      showdata.append(image, food_name, area);
      setTimeout(() => {
        iBox.value = "";
      });
    });
  });
}
// debounce();
async function main() {
  fName = document.querySelector("input").value;
  data = await getData(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${fName}&apikey=1`
  );
  append(data.meals);
  if (iBox.value == "") {
    popup.style.display = "none";
  } else {
    popup.style.display = "block";
  }
}
iBox.addEventListener("input", main);
// iBox.onclick = debounce;

// let timerId;
// function debounce(func, delay) {
//   fName = document.querySelector("input").value;
//   if (timerId) {
//     clearTimeout(timerId);
//   }
//   timerId = setTimeout(() => {
//     func();
//   }, delay);
// }
// debounce(main, 3000);
