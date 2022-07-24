
function GetTrending() {
try {
    fetch("https://api.themoviedb.org/3/trending/all/week?api_key=d017269c4654e14e50d51f015e83ade7")
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error(error.message);
        }
    })
    .then(data => {
        console.log(data)
        const Results = data.results;
        console.log(Results)
        GenerateMovie(Results)
    })
    .catch(error => console.log(error))
} catch {}
}

GetTrending()

function GenerateMovie(Results) {
    const Container = document.querySelector(".slider")
    const ImageLInk = "https://image.tmdb.org/t/p/w220_and_h330_face";
    
    for(let i = 0; i<Results.length; i++) {
   
    const ShowMovie = document.createElement("div");
    ShowMovie.setAttribute("class", "movie")

    const Image = document.createElement("img")
    Image.src = ImageLInk + Results[i].poster_path;

    const Title = document.createElement("h3")
    Title.innerHTML = Results[i].title;
    if(Results[i].title == undefined) {
        Title.innerHTML = Results[i].name;
    }

    const Overview = document.createElement("p");
    Overview.innerHTML = Results[i].overview;

    const Release = document.createElement("h4");
    Release.innerHTML = `Release Date : ${Results[i].release_date}`
    if(Results[i].release_date == undefined) {
        Release.innerHTML = `First Air Date : ${Results[i].first_air_date}`
    }

    const Vote = document.createElement("h4");
    Vote.innerHTML = `Ratings : ${(Results[i].vote_average.toFixed(1))}/10 (${Results[i].vote_count})`

    ShowMovie.append(Image);
    ShowMovie.append(Title);
    ShowMovie.append(Overview)
    ShowMovie.append(Release);
    ShowMovie.append(Vote)

    Container.append(ShowMovie);
    }
}


function GetDiscover() {
    try {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=d017269c4654e14e50d51f015e83ade7&sort_by=popularity.desc")
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error(error.message);
            }
        })
        .then(data => {
            console.log(data)
            const Results = data.results;
            GenerateDiscover(Results)
        })
        .catch(error => console.log(error))
    } catch {}
    }

    GetDiscover();

    function GenerateDiscover(Results) {
        const Container = document.querySelector(".slider-2")
        const ImageLInk = "https://image.tmdb.org/t/p/w220_and_h330_face";
        
        for(let i = 0; i<Results.length; i++) {
    
        const ShowMovieDisc = document.createElement("div");
        ShowMovieDisc.setAttribute("class", "movie")
    
        const ImageDisc = document.createElement("img")
        ImageDisc.src = ImageLInk + Results[i].poster_path;
    
        const TitleDisc = document.createElement("h3")
        TitleDisc.innerHTML = Results[i].title;
        if(Results[i].title == undefined) {
            TitleDisc.innerHTML = Results[i].name;
        }
    
        const DiscOverview = document.createElement("p");
        DiscOverview.innerHTML = Results[i].overview;
    
        const DiscRelease = document.createElement("h4");
        DiscRelease.innerHTML = `Release Date : ${Results[i].release_date}`
        if(Results[i].release_date == undefined) {
            DiscRelease.innerHTML = `First Air Date : ${Results[i].first_air_date}`
        }
    
        const DiscVote = document.createElement("h4");
        DiscVote.innerHTML = `Ratings : ${(Results[i].vote_average.toFixed(1))}/10 (${Results[i].vote_count})`
    
        ShowMovieDisc.append(ImageDisc);
        ShowMovieDisc.append(TitleDisc);
        ShowMovieDisc.append(DiscOverview)
        ShowMovieDisc.append(DiscRelease);
        ShowMovieDisc.append(DiscVote)
    
        Container.append(ShowMovieDisc);
        }
    }

    document.querySelector("form").addEventListener("submit", SearchMovie)

    function SearchMovie() {
        const SearchValue = document.querySelector("#search").value;
        console.log(SearchValue)

        try {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=d017269c4654e14e50d51f015e83ade7&query=${SearchValue}`)
            .then(response => {
                if(response.ok) {
                    return response.json();
                } else {
                    throw new Error(error.message);
                }
            })
            .then(data => {
                console.log(data)
                const SearchResults = data.results;
                GenerateSearchResult(SearchResults, SearchValue)
            })
            .catch(error => console.log(error))
        } catch {}

        document.querySelector("#search").value = "";
        }

        function GenerateSearchResult(SearchResults, SearchValue) {
            // document.querySelector(".search-result").innerHTML = "";
            
            const Showing = document.querySelector(".h2");
            Showing.innerHTML = "";
           

            const MovieSearch = document.querySelector(".search-movie")
        
            const Container = document.querySelector(".search-result")
            // Container.setAttribute("class", "search-result")
            Container.innerHTML = "";
            
            const ImageLInk = "https://image.tmdb.org/t/p/w220_and_h330_face";
           
           
            for(let i = 0; i<SearchResults.length; i++) {
        
            const ShowResult = document.createElement("div");
            ShowResult.setAttribute("class", "movie")
        
            const Thumbnail = document.createElement("img")
            Thumbnail.src = ImageLInk + SearchResults[i].poster_path;
            if(SearchResults[i].poster_path == null) {
                ShowResult.style.display = "none";
            }
        
            const SearchTitle = document.createElement("h3")
            SearchTitle.innerHTML = SearchResults[i].title;
            if(SearchResults[i].title == undefined) {
                SearchTitle.innerHTML = SearchResults[i].name;
            }
        
            const SearchOverview = document.createElement("p");
            SearchOverview.innerHTML = SearchResults[i].overview;
        
            const SearchRelease = document.createElement("h4");
            SearchRelease.innerHTML = `Release Date : ${SearchResults[i].release_date}`
            if(SearchResults[i].release_date == undefined) {
                SearchRelease.innerHTML = `First Air Date : ${SearchResults[i].first_air_date}`
            }
        
            const SearchVote = document.createElement("h4");
            SearchVote.innerHTML = `Ratings : ${(SearchResults[i].vote_average.toFixed(1))}/10 (${SearchResults[i].vote_count})`
        
            ShowResult.append(Thumbnail);
            ShowResult.append(SearchTitle);
            // ShowResult.append(SearchOverview)
            // ShowResult.append(SearchRelease);
            ShowResult.append(SearchVote)
        
            
            Container.append(ShowResult);

            if(SearchResults == []) {
                Showing.innerHTML = `No search result for "${SearchValue}"`;
            } else {
            Showing.innerHTML = `Showing search result for "${SearchValue}"`;
            }
            MovieSearch.append(Showing);
            MovieSearch.append(Container)
            }

           
        }

        const openn = document.querySelector(".hamburger");
        const menu = document.querySelector(".mobile");
        openn.addEventListener("click", () => {
          menu.style.display === "none"
            ? (menu.style.display = "block")(
                openn.setAttribute("src", "./icon-close.svg")
              )
            : (menu.style.display = "none")(
                openn.setAttribute("src", "./icon-hamburger.svg")
              );
        });
    
    