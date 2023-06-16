export const table = document.querySelector('table') 

import { getCar } from "./requests/car-requests.js";
import { getAllOwners } from "./requests/owner-requests.js";




table.addEventListener('click', function (event) {
    const target = event.target;
    if ( table.id === 'Owner' ) {
        if (target.tagName === 'TD') {
            const row = target.parentNode;
            const idUser = row.id;
            getCar(idUser);
        }
    } if (table.id === 'Cars') {
        
    }

});

// Start
getAllOwners();