import {   homeButton, form, table } from "../main.js";
import { DateUtils } from "../utils/utils.js";


// get all
export function getAllOwners() {
    fetch('https://localhost:7276/Owners/getAll')
        .then(data => data.json())
        .then(response => {
            clearTable();
            displayOwners(response);
        });
}

export function clearTable() {
    table.innerHTML = '';
    form.innerHTML = '';
};

function displayOwners(owners) {
    let countId = 1;
    let allOwners =
        `
    <table>
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
            <td>${DateUtils.formatDate(owner.registrationDate)}</td>
        </tr>
        `
        allOwners += ownerElementRow;
    });
    table.innerHTML = allOwners;
    table.id = 'Owners';
};


//get byName

export function searchByName(string) {
    fetch(`https://localhost:7276/Owners/searchByName?letters=${string}`)
        .then(data => data.json())
        .then(response => {
            clearTable();
            displayOwners(response);
        });
};


// post Owner
export function createFormOwner() {
    form.innerHTML =
    `
    <label class="label">Owner</label>
    <input class="form_container_input" placeholder="Name" id="inputOwnerName">
    <input class="form_container_input" placeholder="Date: dd/mm/yyyy" id="inputOwnerDate">
    <button class="button" style="margin-left: 120px; width: 100px;" id="btnSave">Save</button>
    `;

    const nameInput = document.querySelector('#inputOwnerName');
    const dateInput = document.querySelector('#inputOwnerDate');
    const saveButton = document.querySelector('#btnSave');

    saveButton.addEventListener('click', function () {
        if(nameInput !== ""){
            addOwner(nameInput.value, dateInput.value)
        }
    });
}

function addOwner(nameOwner, date) {
    const body = {
        nameOwner: nameOwner,
        date: date
    };

    fetch(`https://localhost:7276/Owners`, {
        method: `POST`,
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(data => data.json())
        .then(response => {
            console.log(response);
            homeButton.click();
        });
};

// delete Owner

