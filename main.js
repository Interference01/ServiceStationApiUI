export const table = document.querySelector('table') 

import { getCar } from "./requests/car-requests.js";
import { getAllOwners } from "./requests/owner-requests.js";

table.addEventListener('click', function (event) {
    debugger;
    const target = event.target;
    if (target.tagName === 'TD') {
        const row = target.parentNode;
        const idUser = row.id;
        getCar(idUser);
    }
});

// Start
getAllOwners();