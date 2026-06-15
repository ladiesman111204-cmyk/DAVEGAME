console.log("app.js loaded");
let games = [];
let container = document.getElementById("gamecontainer");
let search = document.getElementById("search");

 let currentcategory = "All";

 fetch("data/game.json")
 .then(res => res.json())
 .then(data => {
   games = data;
   rendergames(games);
 })

 function rendergames(list) {
   container.innerHTML = "";
   list.forEach(game => {
      container.innerHTML += `<div class="card" onclick="openGame('${game.url}')">
         <img src="${game.thumb}" alt="${game.title}">
         <h3>${game.title}</h3>
         <p>${game.category}</p>
      </div>`;
   });
 }


 function openGame(url){
   localStorage.setItem("game.url",url);
    window.location.href= "play.html"; 

 }


 search.addEventListener("input",() => {
    filtergames();
 });

 function filtercategory(cat) {
   currentcategory = cat.toLowerCase();
    filtergames();

 }

 function filtergames(){
   let value = search.value.toLowerCase();

   let filtered = games.filter(game => {
       let matchsearch = game.title.toLowerCase().includes(value);

       let matchcategory = currentcategory === "all" || game.category.toLowerCase() === currentcategory;

       return matchsearch && matchcategory;

   });
    rendergames(filtered);

 

}