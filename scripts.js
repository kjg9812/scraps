//onclick style change for all buttons
function highlight(element, name, clicked) {
  console.log("changing");
  oppclicked = !clicked;
  window[name] = oppclicked;
  element.style =
    oppclicked == true
      ? "background-color: white; color:rgb(255, 200, 99)"
      : "background-color: rgb(255, 200, 99);color:white";
}

//String for string builder
let foodString = [];

//buttons

//for bananas
let bananas = document.getElementById("bananas");
let bananaName = "bananaClicked";
var bananaClicked = false;
bananas.onclick = () => {
  highlight(bananas, bananaName, bananaClicked);
  if (bananaClicked === true) {
    foodString.push("bananas");
    sendApiRequest(foodString);
  } else {
    const index = foodString.indexOf("bananas");
    if (index > -1) {
      foodString.splice(index, 1);
    }
    sendApiRequest(foodString);
  }
};

//for beans
let beans = document.getElementById("beans");
let beansName = "beansClicked";
var beansClicked = false;
beans.onclick = () => {
  highlight(beans, beansName, beansClicked);
  if (beansClicked === true) {
    foodString.push("canned beans");
    sendApiRequest(foodString);
  } else {
    const index = foodString.indexOf("canned beans");
    if (index > -1) {
      foodString.splice(index, 1);
    }
    
    sendApiRequest(foodString);
  }
};

//for bread
let bread = document.getElementById("bread");
let breadName = "breadClicked";
var breadClicked = false;
bread.onclick = () => {
  highlight(bread, breadName, breadClicked);
  if (breadClicked === true) {
    foodString.push("bread");
    sendApiRequest(foodString);
  } else {
    const index = foodString.indexOf("bread");
    if (index > -1) {
      foodString.splice(index, 1);
    }
    sendApiRequest(foodString);
  }
};

//for eggs
let eggs = document.getElementById("eggs");
let eggsName = "eggsClicked";
var eggsClicked = false;
eggs.onclick = () => {
  highlight(eggs, eggsName, eggsClicked);
  if (eggsClicked === true) {
    foodString.push("eggs");
    sendApiRequest(foodString);
  } else {
    const index = foodString.indexOf("eggs");
    if (index > -1) {
      foodString.splice(index, 1);
    }
    sendApiRequest(foodString);
  }
};

//for peanutbutter
let peanutbutter = document.getElementById("peanut");
let peanutbutterName = "peanutbutterClicked";
var peanutbutterClicked = false;
peanutbutter.onclick = () => {
  highlight(peanutbutter, peanutbutterName, peanutbutterClicked);
  if (peanutbutterClicked === true) {
    foodString.push("peanutbutter");
    sendApiRequest(foodString);
  } else {
    const index = foodString.indexOf("peanutbutter");
    if (index > -1) {
      foodString.splice(index, 1);
    }
    sendApiRequest(foodString);
  }
};

//API tester
// let searchButton = document.querySelector("#search");

// searchButton.addEventListener("click", () => {
//   console.log("button pressed");
//   let food = document.getElementById("searchTerm").value;
//   sendApiRequest(food);
// });

//send API request
async function sendApiRequest(food) {
  if (food == "") {
    clearApiData();
    return;
  }
  let APP_ID = config.APP_ID;
  let API_KEY = config.API_KEY;
  // let food = document.getElementById('searchTerm').value
  let response = await fetch(
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
      food +
      "&app_id=" +
      APP_ID +
      "&app_key=" +
      API_KEY
  );
  console.log(response);
  let data = await response.json();
  console.log(data);
  useApiData(data);
}

//replace content div in HTML with API results
function useApiData(data) {
  let container = []
  for(let i=0; i < data.hits.length; i++){
    container.push((data.hits[i].recipe.ingredients).length);
  }
  let min = Math.min.apply(Math, container);
  let first = container.indexOf(min);
  container.splice(first,1)
  let secmin = Math.min.apply(Math,container)
  let second = container.indexOf(secmin)
  container.splice(second,1)
  let thirdmin = Math.min.apply(Math,container)
  let third = container.indexOf(thirdmin)



  document.querySelector("#content").innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${data.hits[first].recipe.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${data.hits[first].recipe.label}</h5>
      <p class="card-text">Calories: ${data.hits[first].recipe.calories} Main Ingredients: ${data.hits[first].recipe.ingredientLines.slice(0,3)}</p>
      <a href="${data.hits[first].recipe.url}" target="_blank" class="btn btn-primary">Recipe</a>
    </div>
  </div>
  <div class="card" style="width: 18rem;">
    <img src="${data.hits[second].recipe.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${data.hits[second].recipe.label}</h5>
      <p class="card-text">Calories: ${data.hits[second].recipe.calories} Main Ingredients: ${data.hits[second].recipe.ingredientLines.slice(0,3)}</p>
      <a href="${data.hits[second].recipe.url}" target="_blank" class="btn btn-primary">Recipe</a>
    </div>
  </div>
  <div class="card" style="width: 18rem;">
    <img src="${data.hits[third].recipe.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${data.hits[third].recipe.label}</h5>
      <p class="card-text">Calories: ${data.hits[third].recipe.calories} Main Ingredients: ${data.hits[third].recipe.ingredientLines.slice(0,3)}</p>
      <a href="${data.hits[third].recipe.url}" target="_blank" class="btn btn-primary">Recipe</a>
    </div>
  </div>
  <p></p>
  `;
}

//function to clear the content div
function clearApiData() {
  document.querySelector("#content").innerHTML = ``;
}
