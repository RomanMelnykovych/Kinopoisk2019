const searchForm = document.querySelector("#search-form");
const movie = document.querySelector("#movies");
const getImg = "https://image.tmdb.org/t/p/w500";

function apiSearch(event) {
    event.preventDefault(); // відмінна дії браузера за замовчуванням
    const searchText = document.querySelector(".form-control").value; // витяг значення із поля input
    const server = "https://api.themoviedb.org/3/search/multi?api_key=a6d1d983093553c5ff65869ed9bf8cc4&language=ru&query=" + searchText; // url сервера із запитом
    movie.innerHTML = "Завантаження...";
    
    fetch(server) // аналог XMLHttpRequest для відправки запитів на сервер
        .then(function (value) { // обробку статусу запиту
            console.log(value);
            if(value.status !== 200){
                return Promise.reject(value); // повертаєм промісу значення reject( виконано з помилкою)
            }

            return value.json();  // повертаємо розпарсений json текст
        })
        .then(function (output) { // обробку отриманих з API даних
            console.log(output);
            let inner = "";
            output.results.forEach(function (item){ // перебираєм масив
                let nameItem = item.name || item.title;
                let dateItem = item.first_air_date || item.release_date;
                let posterItem = item.poster_path;
                let descriptionItem = item.overview;
                let ratingItem = item.vote_average;

                inner += `<div class="card bg-light mb-3 w-100" > 
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${getImg}${posterItem}" class="card-img" alt="${nameItem}">
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
        .catch(function (reason) { // обробка ерорів якщо Promise прийняв параметр reject
            movie.innerHTML = "Упс, щось пішло не так!!";
            console.error("error: " + reason.status);
        });
}
searchForm.addEventListener('submit', apiSearch); // виклик функції через обробку події submit