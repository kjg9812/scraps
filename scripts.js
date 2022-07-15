//onclick style change for all buttons
function highlight(element,name,clicked){
  console.log("changing");
  oppclicked = !clicked;
  window[name] = oppclicked
  element.style = (oppclicked == true) ? "background-color: white; color:rgb(255, 200, 99)" : "background-color: rgb(255, 200, 99);color:white"
}

//String for string builder
let foodString = []

//buttons
let bananas = document.getElementById("bananas")
let bananaName = 'bananaClicked';
var bananaClicked = false;
bananas.onclick = () => {
  highlight(bananas,bananaName,bananaClicked)
  if (bananaClicked === true){
    foodString.push("bananas");
    sendApiRequest(foodString)
  }else{
    
    const index = foodString.indexOf("bananas");
    if (index > -1) { 
      foodString.splice(index, 1); 
    }
    sendApiRequest(foodString)
  }
    
}

let beans = document.getElementById("beans")
let beansName = 'beansClicked';
var beansClicked = false;
beans.onclick = () => {
  highlight(beans,beansName,beansClicked)
  if (beansClicked === true){
    foodString.push("beans");
    sendApiRequest(foodString)
  }else{
    const index = foodString.indexOf("beans");
    if (index > -1) { 
      foodString.splice(index, 1); 
    }
    sendApiRequest(foodString)
  }
    
}

//API tester
let searchButton = document.querySelector("#search")

searchButton.addEventListener("click", ()=>{
  console.log("button pressed")
  let food = document.getElementById('searchTerm').value
  sendApiRequest(food)
})


//send API request
async function sendApiRequest(food){
  if(food == ""){
    clearApiData();
    return
  }
  let APP_ID = config.APP_ID
  let API_KEY = config.API_KEY
  // let food = document.getElementById('searchTerm').value
  let response = await fetch('https://api.edamam.com/api/recipes/v2?type=public&q=' + food + '&app_id=' + APP_ID + '&app_key=' + API_KEY);
  console.log(response)
  let data = await response.json()
  console.log(data)
  useApiData(data)
}

//replace content div in HTML with API results
function useApiData(data){
  document.querySelector("#content").innerHTML = `
  <img src="${data.hits[0].recipe.image}">
  <p>${data.hits[0].recipe.ingredients[0].food}</p>
  `
}

//function to clear the content div
function clearApiData(){
  document.querySelector("#content").innerHTML = ``
}