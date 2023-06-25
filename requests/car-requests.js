import { generateBackButton, table } from "../main.js";
import { DateUtils } from "../utils/utils.js";
import { getAllOwners } from "./owner-requests.js";


export let idForBackButton = 0;

//get car

export function getCar(idUser) {
    fetch(`https://localhost:7276/Cars?idOwner=${idUser}`)
        .then(data => data.json())
        .then(response => {
            clearTable();
            displayCars(response);
        });
    idForBackButton = idUser;
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

