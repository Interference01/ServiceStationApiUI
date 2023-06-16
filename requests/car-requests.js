import { table } from "../main.js";


//get car

export function getCar(idUser) {
    fetch(`https://localhost:7276/Cars?idOwner=${idUser}`)
        .then(data => data.json())
        .then(response => {
            clearTable();
            displayCars(response);
        });
}

function clearTable() {
    table.innerHTML = '';
};

function displayCars(cars) {
    let countId = 1;
    let allCars =
        `
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
            <td>${car.yearsOfManufacture}</td>
        </tr>
        `;
        allCars += carElementRow;
    });

    table.innerHTML = allCars;
    table.id = 'Cars';
};

// event 

// table.addEventListener('click', function (event) {
//     debugger;
//     const target = event.target;
//     if (target.tagName === 'TD') {
//         const row = target.parentNode;
//         const idUser = row.id;
//         getCar(idUser);
//     }
// });