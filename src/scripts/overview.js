import Axios from "axios";
import {
    KEY
} from "./config";
import queryString from "query-string";


export function initOverview() {
    document.getElementById("index").style.display = "block";
    getData();
}

let movies;

function getData() {
    Axios.get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" + KEY)
        .then(response => {
            movies = response.data.results;
            getGenres(movies);
            // url = location.search + "&page=1";
        });
};

let genres;

function getGenres() {
    Axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=" + KEY).then(response => {
        genres = response.data.genres;

        // Pagina laden
        renderPage(movies);
    });
}

function renderPage() {
    
    movies.forEach(movie => {
        
        document.querySelector("#index .row").innerHTML += `
        <div class="col-md-4 mb-4">
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${movie.title} <span class="badge badge-primary">${movie.vote_average}</span></h5>
                    <h6 class="card-subtitle mb-4">Release: ${movie.release_date}</h6>
                    <p class="card-text mb-4">${movie.overview}</p>
                    <div class="card mb-4 bg-white p-2">
                        <h6 class="card-title ">Genres</h6>
                        <p class="genres" id="genres${movie.id}"></p>
                    </div>
                    <a href="?movie=${movie.id}" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>
        `;

        genres.forEach(genre => {
            movie.genre_ids.forEach(genre_id => {
                if (genre_id === genre.id) {
                    document.querySelector(`#genres${movie.id}`).innerHTML += `
                        <button type="button" class="btn btn-light mr-2 mb-2">${genre.name}</button>
                    `; 
                }
            });
        });
    });


}


console.log(location.search);
const parsed = queryString.parse(location.search);
console.log(parsed);

document.querySelector("#index .pageButtonsDiv").innerHTML += `
        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group mr-2" role="group" aria-label="First group">
                <button type="button" class="btn btn-light" id="previousButton">Previous</button>
                <div class="btn-group pageButtons">
                    <button type="button" class="btn btn-light">2</button>
                    <button type="button" class="btn btn-light">2</button>
                    <button type="button" class="btn btn-light">3</button>
                </div>
                <button type="button" class="btn btn-light" id="nextButton">Next</button>
            </div>
        </div>
    `;



document.querySelector("#previousButton").addEventListener("click", getPreviousPage());


function getPreviousPage(){
    
    if (parsed.page) {
        if(parsed.page == 1) {
            console.log("Heeft pagina 1");
        } else {
            console.log("Heeft ander paginanummer dan 1");
        }; 
    };
};