function highlight(element){
  console.log("changing")
  isClicked = !isClicked;
  element.style = (isClicked == true) ? "background-color: white; color:rgb(255, 200, 99)" : "background-color: rgb(255, 200, 99);color:white";
}

var element = document.getElementById("bananas")
var isClicked = false;
element.onclick = () => {
  highlight(element)
  if (isClicked === true){
    sendApiRequest("bananas")
  }else{
    clearApiData();
  }
    
}

var beanselement = document.getElementById("beans")
var beansisClicked = false;
beanselement.onclick = () => {
  highlight(beanselement,beansisClicked)
  sendApiRequest("beans")
}

let searchButton = document.querySelector("#search")

searchButton.addEventListener("click", ()=>{
  console.log("button pressed")
  let food = document.getElementById('searchTerm').value
  sendApiRequest(food)
})

async function sendApiRequest(food){
  let APP_ID = config.APP_ID
  let API_KEY = config.API_KEY
  // let food = document.getElementById('searchTerm').value
  let response = await fetch('https://api.edamam.com/api/recipes/v2?type=public&q=' + food + '&app_id=' + APP_ID + '&app_key=' + API_KEY);
  console.log(response)
  let data = await response.json()
  console.log(data)
  useApiData(data)
}

function useApiData(data){
  document.querySelector("#content").innerHTML = `
  <img src="${data.hits[0].recipe.image}">
  <p>${data.hits[0].recipe.ingredients[0].food}</p>
  `
}

function clearApiData(){
  document.querySelector("#content").innerHTML = ``
}