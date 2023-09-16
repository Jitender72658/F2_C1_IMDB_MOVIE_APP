
// c03eaba0/
let submitButton = document.getElementById('searchButton');
const moviesSection = document.getElementById('moviesSection');
submitButton.addEventListener('click', displayMovies);
async function displayMovies(){
    let searchInput = document.getElementById('searchInput').value;
    let apiKey = document.getElementById('apiKey').value;
    if(searchInput.length<3){
        moviesSection.innerHTML='';
        alert("Please enter valid movie name. Movie name should contain atleast 3 characters")
        return;
    }
    if(apiKey==""){
        moviesSection.innerHTML='';
        alert("Invalid apiKey.")
        return;
    }
    try {
        const url= `https://www.omdbapi.com/?s=${searchInput}&apikey=${apiKey}`;
        document.getElementById("spinnerContainer").style.display = "flex";
        const response = await fetch(url); 
        if (!response.ok) {
            moviesSection.innerHTML="";
            document.getElementById("spinnerContainer").style.display = "none";
            alert("Invalid api key. Please enter correct api key.")
            throw new Error('Error in fetching api');
        }
         const data = await response.json();
         if(data.Response===false){
            document.getElementById("spinnerContainer").style.display = "none";
            showNoResult();
        }
        else{
            document.getElementById("spinnerContainer").style.display = "none";
            addMoviesToList(data);
        }
           
    } catch (error) {
        document.getElementById("spinnerContainer").style.display = "none";
        console.error('Fetch error:', error);
    }
}
function showNoResult(){
        const noResultHeading = document.createElement('p');
        noResultHeading.innerText="No matching result found";
        moviesSection.appendChild(noResultHeading);
}
function addMoviesToList(movies){
      console.log(movies);
      moviesSection.innerHTML="";
      let number = 1;
      if(movies.Search==null){
        return;
      }
    movies.Search.forEach((movie)=>{
       const movieDiv = document.createElement('div');
       movieDiv.classList.add("movie");
       if(movie.Poster=="N/A"){
        movie.Poster = "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
       }
       movieDiv.innerHTML = `<div class="movie-poster">
                                  <img src=${movie.Poster}>
                            </div>
                            <div class="movie-title">
                                 <p id="number">${number++}</p>
                                 <p id="movieTitle">${movie.Title}</p>
                            </div>
                            <div class="publishDiv"> 
                               <p id="releaseYear">Release Year: ${movie.Year}</p>
                            </div>
                            <div class="typeDiv">
                               <p id="type">Type: ${movie.Type}</p>
                            </div>`;

                            
       moviesSection.appendChild(movieDiv);                      

    })
}