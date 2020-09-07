'use strict';


const petitionsURL='https://api.whitehouse.gov/v1/petitions.json?';



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



    function displayPetitions(responseJson){
        console.log(responseJson);
        $('#js-petitons-list').empty();
        for(let i=0; i<responseJson.results.length; i++){
        $('#js-petitons-list').append(
            `<li><h3>${responseJson.results[i].title}</h3>
            <a href='${responseJson.results[i].url}'>Sign Here</a>
            <p>${responseJson.results[i].body}</p>
            `
        )};
        $('.display-petitions').removeClass('hidden');
    }

    function watchForm(){
        $('#js-petitions-form').on('click', '#js-search-button', function(event){
            event.preventDefault();
            const searchVal=$('#js-search-petitions').val();
            getPetitions(searchVal);
        })
    }

$(watchForm);