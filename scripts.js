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
  document.querySelector("#content").innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${data.hits[0].recipe.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${data.hits[0].recipe.label}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
  <div class="card" style="width: 18rem;">
    <img src="${data.hits[1].recipe.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${data.hits[1].recipe.label}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
  <p></p>
  `;
}

//function to clear the content div
function clearApiData() {
  document.querySelector("#content").innerHTML = ``;
}
