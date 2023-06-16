const inputSearch = document.querySelector('#inputSearch');
const searchButton = document.querySelector('#btnSearch');
const homeButton = document.querySelector(`#btn_home`);

import { table } from "../main.js";

// get all
export function getAllOwners() {
    fetch('https://localhost:7276/Owners/getAll')
        .then(data => data.json())
        .then(response => displayOwners(response));
}

function clearTable() {
    table.innerHTML = '';
};

function displayOwners(owners) {
    let countId = 1;
    let allOwners =
        `
    <tr>
        <th>№</th>
        <th>Name</th>
        <th>Registration Date</th>
    </tr>
    `;

    owners.forEach(owner => {
        const ownerElementRow =
            `
        <tr id="${owner.idUser}">
            <td>${countId++}</td>
            <td>${owner.nameOwner}</td>
            <td>${owner.registrationDate}</td>
        </tr>
        `
        allOwners += ownerElementRow;
    });

    table.innerHTML = allOwners;
    table.id = 'Owner';
};


//get byName

function searchByName(string) {
    fetch(`https://localhost:7276/Owners/searchByName?letters=${string}`)
        .then(data => data.json())
        .then(response => {
            clearTable();
            displayOwners(response);
        });
};

// event

searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    searchByName(inputSearch.value);
});

inputSearch.addEventListener(`keydown`, function(event) {
    if (event.key === `Enter`) {
        event.preventDefault();
        searchByName(inputSearch.value);
    }
});

homeButton.addEventListener(`click`, function() {
    getAllOwners();
});