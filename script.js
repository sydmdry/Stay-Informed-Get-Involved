'use strict';

function wantPetitons(){
    $('#js-findPetitions').removeClass('hidden');
}


function wantNonProfits(){
    $('#js-findNonProfits').removeClass('hidden');
}

function watchForms(){
    $('#js-nonprofit-form').on('click', '.js-nonprofit-button', function(event){
        event.preventDefault();
        $('.home-select').hide();
        wantNonProfits();
        console.log('nonprofit is working');
    })
    $('#js-petition-form').on('click', '.js-petition-button', function(event){
        event.preventDefault();
        $('.home-select').hide();
        wantPetitons();
        console.log('petiton is working');
    })
}



$(watchForms);