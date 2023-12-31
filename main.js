export const homeButton = document.querySelector(`#btn_home`);
const createButton = document.querySelector('#btn_create')
const updateButton = document.querySelector(`#btn_update`)
const deleteButton = document.querySelector(`#btn_delete`)

const searchButton = document.querySelector('#btn_search');
const inputSearch = document.querySelector('#input_search');


export const form = document.querySelector('#form_container')
export const table = document.querySelector('#table_container')

import { getAllOwners, createPostFormOwner, deleteOwner, createPutFormOwner,   searchByName } from "./requests/owner-requests.js";
import { getCar, createPostFormCar, deleteCar, createPutFormCar } from "./requests/car-requests.js";
import { getCarWork, createPostFormCarWork, deleteCarWork, createPutFormCarWork } from "./requests/carWork-requests.js";

export let selectedOwner = {
    idOwner: null,
    nameOwner: null,
    registrationDate: null
};

export let selectedCar = {
    idOwner: null,
    idAuto: null,
    name: null,
    vinCode: null,
    date: null
}

export let selectedWork = {
    idAuto: null,
    idWork: null,
    mileage: null,
    description: null,
    date: null,
    note: null
};

let selectedRow = null;

export function clearTable() {
    form.innerHTML = '';
    table.innerHTML = '';
};


//table event

table.addEventListener('dblclick', function (event) {
    const target = event.target;
    if (table.id === 'Owners') {
        if (target.tagName === 'TD') {
            const row = target.parentNode;
            const idOwner = row.id;
            getCar(idOwner);
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

        selectedOwner = {
            idOwner: idUser,
            nameOwner: name,
            registrationDate: registrationDate
        };
        if (selectedRow != null) {
            selectedRow.classList.remove(`selected`);
        }

        row.classList.add(`selected`);
        selectedRow = row;

    } if (table.id === 'Cars') {
        const row = target.parentNode;
        const idUser = selectedOwner.idOwner;
        const idAuto = row.id;
        const name = row.querySelector('td:nth-child(2)').textContent;
        const vinCode = row.querySelector('td:nth-child(3)').textContent;
        const date = row.querySelector('td:nth-child(4)').textContent;

        selectedCar = {
            idOwner: idUser,
            idAuto: idAuto,
            name: name,
            vinCode: vinCode,
            date: date
        };

        selectedRow.classList.remove(`selected`);
        row.classList.add(`selected`);
        selectedRow = row;

    } if (table.id === 'CarWorks') {

        const row = target.parentNode;
        const idAuto = selectedCar.idAuto;
        const idWork = row.id;
        const mileage = row.querySelector('td:nth-child(2)').textContent;
        const description = row.querySelector('td:nth-child(3)').textContent;
        const date = row.querySelector('td:nth-child(4)').textContent;
        const note = row.querySelector('td:nth-child(5)').textContent;

        selectedWork = {
            idAuto: idAuto,
            idWork: idWork,
            mileage: mileage,
            description: description,
            date: date,
            note: note
        };

        selectedRow.classList.remove(`selected`);
        row.classList.add(`selected`);
        selectedRow = row;
    }
});

// button menu event

homeButton.addEventListener(`click`, function () {
    getAllOwners();
});

createButton.addEventListener('click', function () {
    if (table.id === 'Owners') {
        clearTable();
        createPostFormOwner();
    } if (table.id === 'Cars') {
        clearTable();
        createPostFormCar();
    } if (table.id === 'CarWorks') {
        clearTable();
        createPostFormCarWork();
    }
});

updateButton.addEventListener('click', function() {
    if (table.id === 'Owners' & selectedOwner.idOwner != null) {
        clearTable();
        createPutFormOwner(selectedOwner);
    } if (table.id === 'Cars' & selectedCar.idAuto != null) {
        clearTable();
        createPutFormCar(selectedCar);
    } if (table.id === 'CarWorks' & selectedWork.idWork != null) {
        clearTable();
        createPutFormCarWork(selectedWork);
    }
});

deleteButton.addEventListener('click', function () {
    if (table.id === 'Owners') {
        if (selectedOwner != null) {
            const confirmed = confirm(`Вы уверены, что хотите удалить ${selectedOwner.nameOwner}? `);

            if (confirmed) {
                deleteOwner(selectedOwner.idOwner);
            }
        }
    } if (table.id === 'Cars') {
        if (selectedCar != null) {
            const confirmed = confirm(`Вы уверены, что хотите удалить ${selectedCar.name}? `);

            if (confirmed) {
                deleteCar(selectedCar.idAuto);
            }
        }
    } if (table.id === 'CarWorks') {
        if (selectedWork != null) {
            const confirmed = confirm(`Вы уверены, что хотите удалить автомобильные роботы ? `);

            if (confirmed) {
                deleteCarWork(selectedWork.idWork);
            }
        }
    }
});
window.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        deleteButton.click();
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
