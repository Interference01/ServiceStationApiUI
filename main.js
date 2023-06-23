const backButton = document.querySelector(`#btn_back`);
export const homeButton = document.querySelector(`#btn_home`);
const createButton = document.querySelector('#btn_create')

const searchButton = document.querySelector('#btn_search');
const inputSearch = document.querySelector('#input_search');


export const form = document.querySelector('#form_container')
export const table = document.querySelector('table')

import { getCar, idForBackButton } from "./requests/car-requests.js";
import { createFormOwner, clearTable, getAllOwners, searchByName } from "./requests/owner-requests.js";
import { getCarWork } from "./requests/carWork-requests.js";

//table event

table.addEventListener('click', function (event) {
    const target = event.target;
    if (table.id === 'Owners') {
        if (target.tagName === 'TD') {
            const row = target.parentNode;
            const idUser = row.id;
            getCar(idUser);
        }
    } if (table.id === 'Cars') {
        if (target.tagName === 'TD') {
            const row = target.parentNode;
            const idAuto = row.id;
            getCarWork(idAuto);
        }
    }
});

// button menu event

homeButton.addEventListener(`click`, function () {
    getAllOwners();
});

backButton.addEventListener('click', function () {
    if (table.id === `Cars`) {
        getAllOwners();
    } if (table.id === 'CarWorks') {
        getCar(idForBackButton);
    };
});

createButton.addEventListener('click', function () {
    if (table.id === 'Owners') {
        clearTable();
        createFormOwner();
    } if (table.id === 'Cars') {

    } if (table.id === 'CarWorks') {

    }
});



// search field event

searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    searchByName(inputSearch.value);
});

inputSearch.addEventListener(`keydown`, function (event) {
    if (event.key === `Enter`) {
        event.preventDefault();
        searchByName(inputSearch.value);
    }
});


// Start
getAllOwners();
