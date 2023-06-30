import { selectedCar, clearTable, form, table, selectedOwner } from "../main.js";
import { formatDate, generateBackButton } from "../utils/utils.js";
import { getCar } from "./car-requests.js";


// GET
export function getCarWork(idAuto) {
    fetch(`https://localhost:7276/CarWork?idAuto=${idAuto}`)
        .then(data => data.json())
        .then(response => {
            clearTable();
            displayCarWorks(response)
        });
};


function displayCarWorks(carWorks) {
    let countId = 1;
    let allCarWorks =
        `
    <table>
    <tr>
        <th>№</th>
        <th>Mileage</th>
        <th>Description</th>
        <th>Date</th>
        <th>Note</th>
    </tr>
    `;

    carWorks.forEach(carWork => {
        const carWorksElementRow =
            `
        <tr id="${carWork.idWork}">
            <td>${countId++}</td>
            <td>${carWork.mileage}</td>
            <td>${carWork.descriptionWork}</td>
            <td>${formatDate(carWork.date)}</td>
            <td>${carWork.note}</td>
        </tr>
        `;
        allCarWorks += carWorksElementRow;
    });

    table.innerHTML = generateBackButton();
    table.innerHTML = table.innerHTML + allCarWorks;
    table.id = 'CarWorks';

    const backButton = document.querySelector(`#btn_back`);
    backButton.addEventListener('click', function () {
        getCar(selectedOwner.idOwner);
    });
};


// POST

export function createPostFormCarWork() {
    form.innerHTML =
        `
    <label class="label">Work</label>
    <input class="form_container_input" placeholder="Mileage" id="inputWorkMileage">
    <input class="form_container_input" placeholder="Description" id="inputWorkDescription">
    <input class="form_container_input" placeholder="Note" id="inputWorkNote">
    <input class="form_container_input" placeholder="Date: dd/mm/yyyy" id="inputWorkDate">
    <button class="button" style="margin-left: 120px; width: 100px;" id="btnSave">Save</button>
    `;

    const noteInput = document.querySelector('#inputWorkNote');
    const mileageInput = document.querySelector('#inputWorkMileage');
    const descriptionInput = document.querySelector('#inputWorkDescription');
    const dateInput = document.querySelector('#inputWorkDate');
    const saveButton = document.querySelector('#btnSave');

    saveButton.addEventListener('click', function () {
        if (descriptionInput !== "") {
            addWork(noteInput.value, mileageInput.value, descriptionInput.value, dateInput.value)
        }
    });
}

function addWork(note, mileage, description, date) {
    const body = {
        mileage: mileage,
        description: description,
        date: date,
        note: note,
    };

    fetch(`https://localhost:7276/CarWork?idAuto=${selectedCar.idAuto}`, {
        method: `POST`,
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(data => data.json())
        .then(response => {
            console.log(response);
            getCarWork(selectedCar.idAuto);
        });
};

// DELETE

export function deleteCarWork(idWork) {
    fetch(`https://localhost:7276/CarWork?idWork=${idWork}`, {
        method: `DELETE`,
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => {
            console.log(response);
            if (response.ok) {
                getCarWork(selectedCar.idAuto);
            }
        });
}


// PUT

export function createPutFormCarWork(selectedWork) {
    form.innerHTML =
        `
        <label class="label">Work</label>
        <input class="form_container_input" placeholder="Mileage" value="${selectedWork.mileage}" id="inputWorkMileage">
        <input class="form_container_input" placeholder="Description" value="${selectedWork.description}" id="inputWorkDescription">
        <input class="form_container_input" placeholder="Date: dd/mm/yyyy" value="${selectedWork.date}" id="inputWorkDate">
        <input class="form_container_input" placeholder="Note" value="${selectedWork.note}" id="inputWorkNote">
        <button class="button" style="margin-left: 120px; width: 100px;" id="btnSave">Save</button>
    `;

    const mileageInput = document.querySelector('#inputWorkMileage');
    const descriptionInput = document.querySelector('#inputWorkDescription');
    const dateInput = document.querySelector('#inputWorkDate');
    const noteInput = document.querySelector('#inputWorkNote');
    const saveButton = document.querySelector('#btnSave');

    saveButton.addEventListener('click', function () {
        if (descriptionInput.value !== "") {
            updateWork(selectedWork.idWork, mileageInput.value, descriptionInput.value, dateInput.value, noteInput.value );
        }
    });
}

function updateWork(idWork, mileage, description, date, note) {
    let body = {
        mileage: mileage,
        description: description,
        date: date,
        note: note
    }

    fetch(`https://localhost:7276/CarWork?idWork=${idWork}`, {
        method: `PUT`,
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => {
            clearTable();
            console.log(response);
            getCarWork(selectedCar.idAuto);
        });
}