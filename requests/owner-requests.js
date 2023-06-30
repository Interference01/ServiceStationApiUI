import { homeButton, clearTable, form, table } from "../main.js";
import { formatDate } from "../utils/utils.js";


// GET
export function getAllOwners() {
    fetch('https://localhost:7276/Owners/getAll')
        .then(data => data.json())
        .then(response => {
            clearTable();
            displayOwners(response);
        });
}

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
            <td>${formatDate(owner.registrationDate)}</td>
        </tr>
        `
        allOwners += ownerElementRow;
    });
    table.innerHTML = allOwners;
    table.id = 'Owners';
};


// GET byName

export function searchByName(string) {
    fetch(`https://localhost:7276/Owners/searchByName?letters=${string}`)
        .then(data => data.json())
        .then(response => {
            clearTable();
            displayOwners(response);
        });
};


// POST
export function createPostFormOwner() {
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
        if (nameInput !== "") {
            addOwner(nameInput.value, dateInput.value)
        }
    });
}

function addOwner(nameOwner, date) {
    const body = {
        nameOwner: nameOwner,
        registrationDate: date
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

// DELETE

export function deleteOwner(idUser) {
    fetch(`https://localhost:7276/Owners?idOwner=${idUser}`, {
        method: `DELETE`,
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => {
            console.log(response);
            if (response.ok) {
                homeButton.click();
            }
        });
}


//  PUT
export function createPutFormOwner(selectedOwner) {
    form.innerHTML =
        `
        <label class="label">Owner</label>
        <input class="form_container_input" placeholder="Name" value="${selectedOwner.nameOwner}" id="inputOwnerName">
        <input class="form_container_input" placeholder="Date: dd/mm/yyyy" value="${selectedOwner.registrationDate}" id="inputOwnerDate">
        <button class="button" style="margin-left: 120px; width: 100px;" id="btnSave">Save</button>
    `;

    const nameInput = document.querySelector('#inputOwnerName');
    const dateInput = document.querySelector('#inputOwnerDate');
    const saveButton = document.querySelector('#btnSave');

    saveButton.addEventListener('click', function () {
        if (nameInput.value !== "") {
            updateOwner(selectedOwner.idOwner, nameInput.value, dateInput.value)
        }
    });
}

function updateOwner(idOwner, nameOwner, registrationDate) {
    let body = {
        nameOwner: nameOwner,
        registrationDate: registrationDate
    }
    fetch(`https://localhost:7276/Owners?idOwner=${idOwner}`, {
        method: `PUT`,
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => {
            console.log(response);
            if (response.ok) {
                homeButton.click();
            }
        });
}