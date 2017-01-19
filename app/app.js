window.onload = function() {
    // console.log('window loaded');
    // alert('javascript running on this page');
}

function searchMovies() {
    // set up possible queries (we only use one here);
    var
        baseURL = 'https://www.omdbapi.com/?',
        searchQuery = '&s=',
        plotQueryParam = '&plot=',
        plotSearchValue = 'short',
        responseQueryParams = '&r=',
        responseType = 'json',
        apiQuery = '&apikey=',
        apiKey = '7ceb23b2',
        searchPhrase = document.getElementById("searchBox").value,
        url = baseURL + searchQuery + searchPhrase + plotQueryParam + plotSearchValue + responseQueryParams + responseType + apiQuery + apiKey,
        http = new XMLHttpRequest();

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            createMovieTables(JSON.parse(http.responseText));
        }
    }
    http.send(apiQuery + apiKey + searchQuery + searchPhrase + plotQueryParam + plotSearchValue + responseQueryParams + responseType);
}

function searchMovieDetails(imdbID) {
    var
        baseURL = 'https://www.omdbapi.com/?',
        imdbQuery = '&i=',
        plotQueryParam = '&plot=',
        plotSearchValue = 'short',
        responseQueryParams = '&r=',
        responseType = 'json',
        apiQuery = '&apikey=',
        apiKey = '7ceb23b2',
        url = baseURL + imdbQuery + imdbID + plotQueryParam + plotSearchValue + responseQueryParams + responseType + apiQuery + apiKey,
        http = new XMLHttpRequest();

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var movieObject = JSON.parse(http.responseText);
            createDetailsTable(movieObject);
        }
    }
    http.send(apiQuery + apiKey + imdbQuery + imdbID + plotQueryParam + plotSearchValue + responseQueryParams + responseType);
}

function createMovieTables(movieSearchResults) {
    // TODO implement multiple pages with endless scrolling do not clear results for second page
    clearSearchResults();  //if new search params

    if (movieSearchResults.Search.length > 0) {
        var movieTable = document.getElementById('movieTable');
        movieSearchResults.Search.forEach(function(result, i) {
            var
                row = movieTable.insertRow(i),
                image = row.insertCell(0),
                title = row.insertCell(1),
                year = row.insertCell(2),
                seeDetails = row.insertCell(3),
                favorite = row.insertCell(4);

            row.id = result.imdbID;
            row.addEventListener('click', function() {
                open
            }, false);
            seeDetails.innerHTML = "See details",
            seeDetails.addEventListener('click', function() {
                searchMovieDetails(result.imdbID);
            }, false);
            favorite.innerHTML =  "Add to favorites";
            favorite.addEventListener('click', function() {
                favoriteMovie(result.imdbID);
            }, false);
            image.innerHTML = "<img src=" + result.Poster + "alt='posterImage'/>";
            title.innerHTML = result.Title;
            year.innerHTML = result.Year;
        });
    }
}

function createDetailsTable(details) {
    var modal = document.getElementById('detailsModal');
    modal.style.display = 'initial';
    document.getElementById('actors').innerHTML = details.Actors;
    document.getElementById('country').innerHTML = details.Country;
    document.getElementById('director').innerHTML = details.Director;
    document.getElementById('genre').innerHTML = details.Genre;
    document.getElementById('writer').innerHTML = details.Writer;
    document.getElementById('title').innerHTML = details.Title;
    document.getElementById('rated').innerHTML = details.Rated;
    document.getElementById('poster').innerHTML = "<img src=" + details.Poster + "alt='hello'/>";
    document.getElementById('plot').innerHTML = details.Plot;
}

function closeDetails() {
    var modal = document.getElementById('detailsModal');
    modal.style.display = 'none';
    document.getElementById('actors').innerHTML = null;
    document.getElementById('country').innerHTML = null;
    document.getElementById('director').innerHTML = null;
    document.getElementById('genre').innerHTML = null;
    document.getElementById('writer').innerHTML = null;
    document.getElementById('title').innerHTML = null;
    document.getElementById('rated').innerHTML = null;
    document.getElementById('poster').innerHTML = null;
    document.getElementById('plot').innerHTML = null;
}

function clearSearchResults() {
    var movieTable = document.getElementById('movieTable');
    while (movieTable.firstChild) {
        movieTable.removeChild(movieTable.firstChild);
    }
}

function favoriteMovie(id) {
    var
        url = '/favorites',
        http = new XMLHttpRequest(),
        favoriteToAdd = {
            "Title": "shmitle"
        };
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application");
    // http.onreadystatechange = function() {
    //     if(http.readyState == 4 && http.status == 200) {
    //         var movieObject = JSON.parse(http.responseText);
    //         createDetailsTable(movieObject);
    //     }
    // }
    http.send(favoriteToAdd);
}
