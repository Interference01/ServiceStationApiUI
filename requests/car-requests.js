import { selectedOwner, clearTable, table, form } from "../main.js";
import { generateBackButton, formatDate } from "../utils/utils.js";
import { getAllOwners } from "./owner-requests.js";


// GET

export function getCar(idUser) {
    fetch(`https://localhost:7276/Cars?idOwner=${idUser}`)
        .then(data => data.json())
        .then(response => {
            clearTable();
            displayCars(response);
        });
}

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
            <td>${formatDate(car.yearsOfManufacture)}</td>
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

// POST
export function createPostFormCar() {
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
        if (nameInput !== "") {
            addCar(nameInput.value, dateInput.value, vinInput.value)
        }
    })
}

function addCar(nameAuto, date, vinCode) {
    const body = {
        nameAuto: nameAuto,
        vinCode: vinCode,
        yearsOfManufacture: date
    };

    fetch(`https://localhost:7276/Cars?idOwner=${selectedOwner.idOwner}`, {
        method: `POST`,
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(data => data.json())
        .then(response => {
            clearTable();
            console.log(response);
            getCar(selectedOwner.idOwner);
        })
};

// DELETE 

export function deleteCar(idAuto) {
    fetch(`https://localhost:7276/Cars?idAuto=${idAuto}`, {
        method: `DELETE`,
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => {
            console.log(response);
            if (response.ok) {
                getCar(selectedOwner.idOwner);
            }
        });
}

// PUT
export function createPutFormCar(selectedCar) {
    form.innerHTML =
        `
        <label class="label">Car</label>
        <input class="form_container_input" placeholder="Name" value="${selectedCar.name}" id="inputCarName">
        <input class="form_container_input" placeholder="Date: dd/mm/yyyy" value="${selectedCar.date}"" id="inputCarDate">
        <input class="form_container_input" placeholder="Vin Code" value="${selectedCar.vinCode}"" id="inputCarVin">
        <button class="button" style="margin-left: 120px; width: 100px;" id="btnSave">Save</button>
    `;

    const nameInput = document.querySelector('#inputCarName');
    const dateInput = document.querySelector('#inputCarDate');
    const vinInput = document.querySelector('#inputCarVin');
    const saveButton = document.querySelector('#btnSave');

    saveButton.addEventListener('click', function () {
        if (nameInput.value !== "") {
            updateCar(selectedCar.idAuto, nameInput.value, dateInput.value, vinInput.value);
        }
    });
}

function updateCar(idAuto, name, date, vinCode) {
    let body = {
        nameAuto: name,
        vinCode: vinCode,
        yearsOfManufacture: date
    }

    fetch(`https://localhost:7276/Cars?idAuto=${idAuto}`, {
        method: `PUT`,
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => {
            clearTable();
            console.log(response);
            getCar(selectedOwner.idOwner);
        });
}