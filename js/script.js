const searchForm = document.querySelector("#search-form");
const movie = document.querySelector("#movies");
const getImg = "https://image.tmdb.org/t/p/w500";

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector(".form-control").value;
    const server = "https://api.themoviedb.org/3/search/multi?api_key=a6d1d983093553c5ff65869ed9bf8cc4&language=ru&query=" + searchText;
    movie.innerHTML = "Завантаження...";
    requestApi("GET", server)
        .then(function (result) {
            const  output = JSON.parse(result);
            console.log(output);
            let inner = "";

            output.results.forEach(function (item){
                let nameItem = item.name || item.title;
                let dateItem = item.first_air_date || item.release_date;
                let posterItem = item.poster_path || item.backdrop_path;
                let descriptionItem = item.overview;
                let ratingItem = item.vote_average;

                inner += `<div class="card bg-light mb-3 w-100" >
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${getImg}${posterItem}" class="card-img" alt="poster">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${nameItem}</h5>
                                        <p class="card-text">Рейтинг <span class="badge badge-pill badge-info">${ratingItem}</span></p>
                                         <p class="card-text"><small>Дата виходу: ${dateItem}</small></p>
                                        <p class="card-text">${descriptionItem}</p>
                                     </div>
                                 </div>
                            </div>
                       </div>`
            });
            movie.innerHTML = inner;
        })
        .catch(function (reason) {
            movie.innerHTML = "Упс, щось пішло не так!!";
            console.log("error: " + reason.status);
        });
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open(method, url);
        request.addEventListener("load", function () {
            if (request.status !== 200){
                reject({status: request.status});
                return;
            }
            resolve(request.response)
        });
        request.addEventListener("error", function () {
            reject({status: request.status});
        });
        request.send();
    });

}
