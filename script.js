
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
        const url= `http://www.omdbapi.com/?s=${searchInput}&apikey=${apiKey}`;
        const response = await fetch(url); 
        if(response==false){
            moviesSection.innerHTML=`<p id="noResultFound">No matching result found</p>`
            return;
          }
        if (!response.ok) {
            moviesSection.innerHTML="";
            alert("Invalid api key. Please enter correct api key.")
            throw new Error('Error in fetching api');
            return;
        }
        if(response.ok){
            const data = await response.json();
           addMoviesToList(data);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function addMoviesToList(movies){
    console.log(movies);
      moviesSection.innerHTML="";
      let number = 1;
    movies.Search.forEach((movie)=>{
       const movieDiv = document.createElement('div');
       movieDiv.classList.add("movie");
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