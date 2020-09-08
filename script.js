'use strict';


const petitionsURL='https://api.whitehouse.gov/v1/petitions.json?';

const newsURL='https://newsapi.org/v2/top-headlines?'

const newsApiKey='37d1fa5af2a84f389a019d1f80faf045'



function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function getPetitions(search){
    const params={
        isPublic: 1,
        isSignable: 1,
        title: search,
        body: search,
        limit: 5
    }
    const queryString = formatQueryParams(params)
    const fullPetitionsURL = petitionsURL + queryString;
    console.log(fullPetitionsURL)

    fetch(fullPetitionsURL)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayPetitions(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function getNews(search){
    const params={
        apiKey: newsApiKey,
        q: search,
        pageSize: 2
    }
    const queryString = formatQueryParams(params)
    const fullNewsURL = newsURL + queryString;
    console.log(fullNewsURL)

    fetch(fullNewsURL)
    .then(response=>{
        if(response.ok){
            return response.json()
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson))
}



    function displayPetitions(responseJson){
        console.log(responseJson);
        $('#js-petitons-list').empty();
        for(let i=0; i<responseJson.results.length; i++){
        $('#js-petitons-list').append(
            `<li><h3>${responseJson.results[i].title}</h3>
            <a href='${responseJson.results[i].url}' target="_blank">Sign Here</a>
            <p>${responseJson.results[i].body}</p>
            `
        )};
        $('.display-petitions').removeClass('hidden');
    }

    function watchForm(){
        $('#js-petitions-form').on('click', '#js-search-button', function(event){
            event.preventDefault();
            const searchVal=$('#js-search-petitions').val();
            getNews(searchVal);
            getPetitions(searchVal);
        })
    }

$(watchForm);