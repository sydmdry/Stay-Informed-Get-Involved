'use strict';

const nonProfitURL='https://projects.propublica.org/nonprofits/api/v2/search.json?';

const petitionsURL='https://api.whitehouse.gov/v1/petitions.json?';



function wantPetitons(){
    $('#js-findPetitions').show();
    $('#js-findPetitions').removeClass('hidden');
}


function wantNonProfits(){
    $('#js-findNonProfits').show();
    $('#js-findNonProfits').removeClass('hidden');
}

function watchForms(){
    $('#js-home-nonprofit-form').on('click', '.js-home-nonprofit-button', function(event){
        event.preventDefault();
        $('.home-select').hide();
        wantNonProfits();
        console.log('nonprofit is working');
    })
    $('#js-home-petition-form').on('click', '.js-home-petition-button', function(event){
        event.preventDefault();
        $('.home-select').hide();
        wantPetitons();
        console.log('petiton is working');
    })
}

function watchHomeButton(){
    $('#js-findNonProfits').on('click', '#js-home-button', function(event){
        $('#js-findNonProfits').hide();
        $('.home-select').show();
    })
    $('#js-findPetitions').on('click', '#js-home-button', function(event){
        $('#js-findPetitions').hide();
        $('.home-select').show();
    })
}

function watchNonProfitButton(){
    $('#js-findPetitions').on('click', '#js-see-nonprofits', function(event){
        $('#js-findPetitions').hide();
        $('#js-findNonProfits').show();
    })
}

function watchPetitionsButton(){
    $('#js-findNonProfits').on('click', '#js-see-petitions', function(event){
        $('#js-findNonProfits').hide();
        $('#js-findPetitions').show();
    })
}

function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function searchNonProfits(){
    $('#js-nonprofit-form').on('click', '.search-nonprofits-button', function(event){
        event.preventDefault();
        const searchQuery=$('#js-search-nonprofits').val();
        const state=$('#js-state').val();
        const category=$('#js-category').val();
        console.log(searchQuery);
        console.log(state);
        console.log(category);
        getNonProfits(searchQuery,state,category);
    })
}

function searchAllPetitions(){
    $('#js-petitions-form').on('click', '.search-petitions-button', function(event){
        event.preventDefault();
        getAllPetitions();
    })
}

function getAllPetitions(){
    const params={
        isPublic: 1,
        isSignable: 1,
        sortBy: 'date_reached_public'
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
    .then(responseJson => console.log(responseJson));
}


function getNonProfits(query,state,category){
    const params = {
        q: query,
        'state[id]': state,
        'ntee[id]': category
    };
    const nonProfitQueryString= formatQueryParams(params);
    const fullNonProfitURL= nonProfitURL + nonProfitQueryString;
    console.log(fullNonProfitURL);

    fetch(fullNonProfitURL, {
        mode: 'cors',
         //   'Access-Control-Allow-Origin': '*'
         method: 'GET',
         redirect: 'follow'
        //}
    })
    .then(response => {
        console.log(response.statusText)
        //if(response.ok){
        response.json()
        //}
        //throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson));
    //.catch(err => console.log(err))
}



function watchApp(){
    watchForms();
    watchHomeButton();
    watchNonProfitButton();
    watchPetitionsButton();
    searchNonProfits();
    searchAllPetitions();
}
$(watchApp);