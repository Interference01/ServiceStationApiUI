import { table } from "../main.js";
import { DateUtils } from "../utils/utils.js";


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

    table.innerHTML = allCarWorks;
    table.id = 'CarWorks';
};