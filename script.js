'use strict';


const petitionsURL = 'https://api.whitehouse.gov/v1/petitions.json';

const newsURL = 'https://gnews.io/api/v4/search'

const newsApiKey = '392d5903e1ded5d1abf47f45de8887c7'


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function getPetitions(search) {
    const params = {
        isPublic: 1,
        isSignable: 1,
        title: search,
        body: search,
        limit: 5
    }
    const queryString = formatQueryParams(params)
    const fullPetitionsURL = petitionsURL + '?' + queryString;
    console.log(fullPetitionsURL)

    fetch(fullPetitionsURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayPetitions(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}


function getNews(search) {
    const params = {
        q: search,
        max: 5,
        lang: 'en',
        nullable: 'None',
        token: newsApiKey
    }
    const queryString = formatQueryParams(params)
    const fullNewsURL = newsURL + '?' + queryString;
    console.log(fullNewsURL)

    fetch(fullNewsURL)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayNews(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}


function displayNews(responseJson) {
    console.log(responseJson);
    $('#js-news-list').empty();
    for (let i = 0; i < responseJson.articles.length; i++) {
        $('#js-news-list').append(
            `<li><h3>${responseJson.articles[i].title}<h3>
            <div class='news-wrapper'>
            <h4>${responseJson.articles[i].publishedAt}</h4>
            <img src='${responseJson.articles[i].image}'>
            <p>${responseJson.articles[i].description}</p>
            <a href='${responseJson.articles[i].url}' target="_blank">View Full Article</a>
            </div>`
        )
    };
    $('.display-news').removeClass('hidden');
}



function displayPetitions(responseJson) {
    console.log(responseJson);
    $('#js-petitions-list').empty();
    for (let i = 0; i < responseJson.results.length; i++) {
        if (responseJson.results.length > 0) {
            $('#js-petitions-list').append(
                `<li><h3>${responseJson.results[i].title}</h3>
            <a href='${responseJson.results[i].url}' target="_blank">Sign Here</a>
            <p>${responseJson.results[i].body}</p>
            `
            )
        } else {
            $('#js-petitions-list').append(
                `<li><h3>I'm sorry, we couldn't find any petitions to match your search.</h3>
            <a href='https://petitions.whitehouse.gov/' target="_blank">See All White House Petitions</a>`
            )
        }
        $('.display-petitions').removeClass('hidden');
    }
}


function watchForm() {
    $('#js-search-button').on('click', function(event) {
        event.preventDefault();
        const searchVal = $('#js-search').val();
        if (searchVal.length < 1) {
            alert('Please fill out this field.');
        }
        getNews(searchVal);
        getPetitions(searchVal);
        $('#js-search').val('');
    })
}

$(watchForm);