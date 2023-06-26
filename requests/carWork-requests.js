import { homeButton, selectedCar, form, generateBackButton, table } from "../main.js";
import { DateUtils } from "../utils/utils.js";
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

function clearTable() {
    table.innerHTML = '';
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
            <td>${DateUtils.formatDate(carWork.date)}</td>
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
        getCar(_idUser);
    });
};


// post 

export function createFormCarWork() {
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
        descriptionWork: description,
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
            if (response.ok) {
                homeButton.click();
            }
        });
};