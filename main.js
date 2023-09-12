var elList = document.querySelector(".list");
var elForm = document.querySelector(".js-form");
var elInput = document.querySelector(".js-input")
var elSelect = document.querySelector(".js-select");

// Search metod

function movieOur(arr){
  elList.innerHTML = null;
  for (const film of arr) {
    var elItem = document.createElement("li");
    var elImg = document.createElement("img");
    var elTitle = document.createElement("h3");
    var elTime = document.createElement("time");
    var elOverview = document.createElement("p");
    var genreList = document.createElement("ul");
    var elLink = document.createElement("a");
    elItem.classList.add("item");
    elImg.classList.add("img");
    elTitle.classList.add("title");
    elTime.classList.add("time");
    elOverview.classList.add("info");
    genreList.classList.add("gener_list");
    elLink.classList.add("link");
    elImg.src = film.Poster;
    elImg.alt = film.Title;
    elTitle.textContent = film.Title;
    elTime.textContent = film.Year;
    elOverview.textContent = film.overview.split(" ").slice(0,15).join(" ") + "...";

    var fragment = document.createDocumentFragment()

    for (const genr of film.genres) {
      
      var genreItem = document.createElement("li");
      var genreText = document.createElement("p");
      
      genreItem.classList.add("gener_item");
      genreText.classList.add("gener_text");
      
      genreText.textContent = genr;
      
      genreItem.appendChild(genreText);
      genreList.appendChild(genreItem);
      //Time metod
      var date = new Date(film.Year);
      var day = date.getDate()
      var month = String(date.getMonth() + 1).padStart(2, 0);
      var year = date.getFullYear()
      elTime.textContent = `${day},${month},${year}`  
      
    }     
    elLink.textContent = "More"
    elLink.href = film.link;  
    elItem.append(elImg,elTitle,elTime,elOverview,genreList,elLink);
    console.log(fragment);
    fragment.appendChild(elItem);
    elList.appendChild(fragment); 
  } 
}

function selectArr(){
   var movieArr = [];
   films.forEach(obj => {
    obj.genres.forEach(function (obj){
      // console.log(obj);
      if(!movieArr.includes(obj)){
        movieArr.push(obj)
      }
    })
   })
   console.log(movieArr);
   movieArr.forEach(kino => {
    var elOption = document.createElement("option");
    elOption.textContent = kino;
    elOption.value = kino
    elSelect.appendChild(elOption);
  })
}
selectArr()

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault(); 
  var  selectVal = elSelect.value;
  var inputValue = elInput.value;
  var newRegex = new RegExp(inputValue , "gi")
  console.log(inputValue);
  
  var resultArr = films.filter(item => {
    return item.Title.match(newRegex)&&(item.genres.includes(selectVal) || selectVal ==("all") );
  });
  console.log(resultArr);
  if(resultArr.length > 0) {
    movieOur(resultArr)
  }else {
    elList.textContent = "Not found 404"
  }
  
});
movieOur(films)