import Axios from "axios";
import {
    KEY
} from "./config";

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
        });
}

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
                <p class="genres" id="genres${movie.id}">
                    
                </p>

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