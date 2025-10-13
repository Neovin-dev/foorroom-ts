export function rerenderTable(){
        //clear the table
        tableBody.innerHTML = ``;

        // re-estabish the table
        // loop through the registrations 
        // generally this will be used to reistablish the table after sort or filters
        registrations.forEach(user => {
            let row = document.createElement("tr");
            row.setAttribute('data-id', user.id);

            row.innerHTML = `
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.dob}</td>
                <td>${user.email}</td>
                <td>${user.tele}</td>
                <td>${user.exam}</td>
                <td>${user.gender}</td>
                <td>${user.subjects}</td>
                <td><button class="button-register button-register-menu edit-button" type="button">
                    <img src="img/edit_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg" alt="">
                </button></td>
                <td><button class="button-register button-register-menu delete-button" type="button">
                    <img src="img/delete_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg" alt="">
                </button></td>
                `;

                tableBody.appendChild(row);
        })

    }