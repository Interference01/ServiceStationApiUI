import { generateBackButton, table, form, homeButton } from "../main.js";
import { DateUtils } from "../utils/utils.js";
import { getAllOwners } from "./owner-requests.js";


export let _idUser;

//get car

export function getCar(idUser) {
    fetch(`https://localhost:7276/Cars?idOwner=${idUser}`)
        .then(data => data.json())
        .then(response => {
            clearTable();
            displayCars(response);
        });
    _idUser = idUser;
}

function clearTable() {
    table.innerHTML = '';
};

function displayCars(cars) {
    let countId = 1;
    let allCars =
        `
    <table>
    <tr>
        <th>№</th>
        <th>Name</th>
        <th>VIN</th>
        <th>Years Of Manufacture</th>
    </tr>
    `;

    cars.forEach(car => {
        const carElementRow =
            `
        <tr id="${car.idAuto}">
            <td>${countId++}</td>
            <td>${car.nameAuto}</td>
            <td>${car.vinCode}</td>
            <td>${DateUtils.formatDate(car.yearsOfManufacture)}</td>
        </tr>
        `;
        allCars += carElementRow;
    });

    table.innerHTML = generateBackButton();
    table.innerHTML = table.innerHTML + allCars;
    table.id = 'Cars';

    const backButton = document.querySelector(`#btn_back`);
    backButton.addEventListener('click', function () {
            getAllOwners();
    });
};

//post Car
export function createFormCar() {
    form.innerHTML =
    `
    <label class="label">Car</label>
    <input class="form_container_input" placeholder="Name" id="inputCarName">
    <input class="form_container_input" placeholder="Date: dd/mm/yyyy" id="inputCarDate">
    <input class="form_container_input" placeholder="Vin Code" id="inputCarVin">
    <button class="button" style="margin-left: 120px; width: 100px;" id="btnSave">Save</button>
    `;

    const nameInput = document.querySelector('#inputCarName');
    const dateInput = document.querySelector('#inputCarDate');
    const vinInput = document.querySelector('#inputCarVin');
    const saveButton = document.querySelector('#btnSave');

    saveButton.addEventListener('click', function () {
        if(nameInput !== ""){
            addCar(nameInput.value, dateInput.value, vinInput.value)
        }
    })
}

function addCar (nameAuto, date, vinCode) {
    const body = {
        nameAuto: nameAuto,
        date: date,
        vinCode: vinCode
    };

    fetch(`https://localhost:7276/Cars?idOwner=${_idUser}`, {
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
        })
};
