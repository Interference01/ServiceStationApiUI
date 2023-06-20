const backButton = document.querySelector(`#btn_back`);

export const table = document.querySelector('table') 

import { getCar, idForBackButton } from "./requests/car-requests.js";
import { getAllOwners } from "./requests/owner-requests.js";
import { getCarWork } from "./requests/carWork-requests.js";



table.addEventListener('click', function (event) {
    const target = event.target;
    if ( table.id === 'Owner' ) {
        if (target.tagName === 'TD') {
            const row = target.parentNode;
            const idUser = row.id;
            getCar(idUser);
        }
    } if (table.id === 'Cars') {
        if (target.tagName === 'TD') {
            const row = target.parentNode;
            const idAuto = row.id;
            getCarWork(idAuto);
        }
    }

});

backButton.addEventListener('click', function(event) {
    if(table.id === `Cars`) {
        getAllOwners();
    }if (table.id === 'CarWorks') {
        getCar(idForBackButton);
    };
})

// Start
getAllOwners();