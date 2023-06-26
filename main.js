export const homeButton = document.querySelector(`#btn_home`);
const createButton = document.querySelector('#btn_create')

const searchButton = document.querySelector('#btn_search');
const inputSearch = document.querySelector('#input_search');


export const form = document.querySelector('#form_container')
export const table = document.querySelector('#table_container')

import { getCar, createFormCar } from "./requests/car-requests.js";
import { createFormOwner, clearTable, getAllOwners, searchByName } from "./requests/owner-requests.js";
import { getCarWork } from "./requests/carWork-requests.js";

let owner = {
    idUser: undefined,
    nameOwner: undefined,
    registrationDate: undefined
};

let selectedRow = null;

//table event

table.addEventListener('dblclick', function (event) {
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

table.addEventListener('click', function (event) {
    const target = event.target;
    if (table.id === 'Owners') {
        const row = target.parentNode;
        const idUser = row.id;
        const name = row.querySelector('td:nth-child(2)').textContent;
        const registrationDate = row.querySelector('td:nth-child(3)').textContent;

        owner = {
            idUser: idUser,
            nameOwner: name,
            registrationDate: registrationDate
        };
        if(selectedRow != null) {
        selectedRow.classList.remove(`selected`);
        }

        row.classList.add(`selected`);
        selectedRow = row;
    } if (table.id === 'Cars') {


    } if (table.id === 'CarWorks') {

        
    }
});

// button menu event

homeButton.addEventListener(`click`, function () {
    getAllOwners();
});



createButton.addEventListener('click', function () {
    if (table.id === 'Owners') {
        clearTable();
        createFormOwner();
    } if (table.id === 'Cars') {
        clearTable();
        createFormCar();
    } if (table.id === 'CarWorks') {
        clearTable();
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



export function generateBackButton() {
    return `
    <button class="btn_home" style="margin-right: 20px; margin-top: 3px;" id="btn_back">
    <image src="/settings/3643764_back_backward_left_reply_turn_icon.svg" class="btn_icon"></image>
    </button>
    `;
}


// Start
getAllOwners();
