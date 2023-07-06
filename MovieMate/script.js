const movieList = document.querySelector(".movieList");
const loaderEl = document.getElementById("js-preloader")

// Fetch movie data from TMDb API
const apiKey = APIKEY

// Function to open a popup with movie details
function openPopup(movie) {
    const el = document.getElementById('movieDetails');
    const myModal = new bootstrap.Modal(el.querySelector(".modal"))
    myModal.show()
    document.querySelector(".modal-title").textContent = movie.title;

    const bodyEl = document.querySelector(".modal-body");
    bodyEl.innerHTML = ''
    bodyEl.insertAdjacentHTML('beforeend', `<img width="100%" src="https://image.tmdb.org/t/p/w300/${movie.backdrop_path}">`)
    bodyEl.insertAdjacentHTML('beforeend', `<p class="mt-3">${movie.overview}</p>`);
    bodyEl.insertAdjacentHTML('beforeend', `Rating: <i class="fa fa-star"></i> ${movie.vote_average} (${movie.vote_count})`);
}

// Fetch movie data from TMDb API
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
loaderEl.classList.remove("loaded");

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        loaderEl.classList.add("loaded");

        const movies = data.results;

        movies.forEach(movie => {
            let movieEl = document.createElement("div");
            movieEl.classList.add("col-lg-3", "col-md-4", "col-md-6");

            movieEl.innerHTML = `
                <a>
                    <div class="card bg-secondary bg-gradient text-light">
                        <div class="card-body text-center">
                            <div class="feature">
                                <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="">
                            </div>
                            <h2 class="fs-4 fw-bold movie-name">${movie.title}</h2>
                            <div class="container d-inline-flex justify-content-around">
                                <p class="mb-0 release-date float-start">Release: ${movie.release_date}</p>
                                <p class="mb-0 rating float-end"><i class="fa fa-star"></i> ${movie.vote_average}</p>
                            </div>
                        </div>
                    </div>
                </a>
            `

            // Add click event listener to each movie element
            movieEl.addEventListener("click", function () {
                openPopup(movie);
            });

            movieList.appendChild(movieEl);
        });
    })
    .catch(error => {
        console.log("An error occurred:", error);
    });
