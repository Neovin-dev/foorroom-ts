let registrations = [];

document.addEventListener("DOMContentLoaded", function () {

    let eleDeactive = document.getElementById("tableItself");
    let filterActive = document.getElementById("filter-bar");
    let sortActive = document.getElementById("sort-bar");
    let filterContainers = document.getElementById("filter-containers")

    let form = document.getElementById("Mform");
    let firstname = document.getElementById("fname");
    let lastname = document.getElementById("lname");
    let dob = document.getElementById("dob");
    let email = document.getElementById("email");
    let tele = document.getElementById("telenum");
    let exam = document.getElementById("exam");
    // let button = document.querySelector('.button-reset');
    let refreshButton = document.getElementById('refreshButton');
    let toggleFilter = document.getElementById('filter-button');

    // Table Elements
    let table = document.getElementById("table-container");
    let tableBody = document.getElementById("tableBody");
 

    // UPLOAD THE DATA TO form and update registrations.
    form.addEventListener("submit", function (event){
        event.preventDefault();
        
        if(tableBody.rows.length < 1){
            eleDeactive.classList.remove('deactive-style');
            // filterContainers.classList.remove('deactive-style');
        }

        if(tableBody.rows.length > 0){
            filterActive.classList.remove('deactive-style');
            sortActive.classList.remove('deactive-style')
        }

        let gender = document.querySelector('input[name="gender"]:checked');

        // doesnt work because I have wrapped the iptions in label
        // let subMarked = document.querySelectorAll('input[type="checkbox"]:checked');

        // let selectedSubjects = [];
        // subMarked.forEach(checks => {
        //     let subjectsSelected = checks.id;
        //     let labels = document.querySelector(`label[for="${subs}"]`);
        //     if (labels) {
        //         selectedSubjects.push(labels.textContent);
        //     }
        // });

        let subMarked = document.querySelectorAll('input[type="checkbox"]:checked');

        let selectedSubjects = [];
        subMarked.forEach(checks => {
            let subjectLabel = checks.closest('label');
            if (subjectLabel) {
                selectedSubjects.push(subjectLabel.childNodes[0].textContent.trim());
            }
        });

        let user = {
            id: tableBody.rows.length,
            firstname: firstname.value,
            lastname: lastname.value,
            dob: dob.value,
            email: email.value,
            tele: tele.value,
            exam: exam.value,
            gender: gender ? gender.parentElement.innerText.trim(): "N/A",
            subjects: []
        }
        user.subjects = selectedSubjects;

        console.log(user.subjects);

        registrations.push(user);

        let row = document.createElement("tr");
        row.setAttribute('data-id', user.id);

        console.log(row);

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
        form.reset();

    });

    toggleFilter.addEventListener("click", function(event){
        event.preventDefault();
        
        if(event.target.dataset.enabled === "false"){
            event.target.dataset.enabled = "true";
            filterContainers.classList.remove('deactive-style');

        }else {
            event.target.dataset.enabled = "false";
            filterContainers.classList.add('deactive-style');
        }
    })


    // adding functionality to the deleteButton
    // let deleteButton = document.getElementById("delete-button");
    let deleteButton = document.querySelector(".deleteButton")
    tableBody.addEventListener("click", function (event) {
            // console.log(event);
            // console.log(event.target);
            // console.log(event.target.classList);
            // console.log(event.target.dataset.id);

            let editButton = event.target.closest(".edit-button");
            let deleteButton = event.target.closest(".delete-button");

            if (editButton) {
                let row = editButton.closest("tr");
                // parseInt can be used when specific need is a number that needs to be called
                let userId = parseInt(row.dataset.id);

                let userEdit = registrations.find(user => user.id === userId);

                //  check the user is there for corresponding edit button
                if (!userEdit) {
                    console.log("didnt find the user");
                    return;
                }

                // refilling the form
                firstname.value = userEdit.firstname;
                lastname.value = userEdit.lastname;
                dob.value = userEdit.dob;
                email.value = userEdit.email;
                tele.value = userEdit.tele;
                exam.value = userEdit.exam;
                

                // gender case handled seperately
                let genderRadios = document.querySelectorAll('input[name="gender"]');
                genderRadios.forEach(radio => {
                    if (radio.parentElement.innerText.trim() === userEdit.gender) {
                        radio.checked = true;
                    }
                });

                // let subjectCheckboxes = document.querySelectorAll('input[type="checkbox"]');

                // subjectCheckboxes.forEach(checkbox => {
                //     if (user.subjects.includes(checkbox.id)) {
                //         checkbox.checked = true;
                //         const label = document.querySelector(`label[for="${checkbox.id}"]`);
                //     }
                // });
                console.log("userEditvalues")
                console.log(userEdit.subjects);

                // let subjectCheckboxes = document.querySelectorAll('input[type="checkbox"]');

                // subjectCheckboxes.forEach(checkbox => {
                //     if (userEdit.subjects.includes(checkbox.id)) {
                //         let subjectLabel = checkbox.closest('label');
                //         checkbox.checked = true;
                //     }
                // })

                let subjectCheckboxes = document.querySelectorAll('input[type="checkbox"]');
                userEdit.subjects = userEdit.subjects.map(sub => sub.toLowerCase());
                console.log()
                subjectCheckboxes.forEach(checkbox => {
                if (userEdit.subjects.includes(checkbox.id)) {
                        checkbox.checked = true;
                        console.log(subjectCheckboxes.checkbox);
                    }
                });

                // let subjectCheckbox = document.querySelectorAll('input[type="checkbox"]');
                // let selectedSubjects = userEdit.subjects.split(',').map(sub => sub.trim().toLowerCase());

                console.log(subjectCheckboxes);
                
                // subjectCheckbox.forEach(checkbox => {
                //     if (selectedSubjects.includes(checkbox.id.toLowerCase())) {
                //        checkbox.checked = true;
                //     }
                // })

                registrations = registrations.filter(user => user.id !== userId);

                if (tableBody.rows.length === 0) {
                    eleDeactive.classList.add('deactive-style');
                    filterActive.classList.add('deactive-style');
                    sortActive.classList.add('deactive-style');
                    filterContainers.classList.add('deactive-style');
                }
                row.remove();

            }

            if (deleteButton) {

                let row = deleteButton.closest("tr");

                // replaced with parseInt
                let userId = parseInt(row.dataset.id);

                registrations = registrations.filter(user => user.id !== userId);
                row.remove();

                // reset if row are 0 
                if (tableBody.rows.length === 0) {
                    eleDeactive.classList.add('deactive-style');
                    filterActive.classList.add('deactive-style');
                    sortActive.classList.add('deactive-style');
                    filterContainers.classList.add('deactive-style');
                }
            }
    });


    // refresh Button
    refreshButton.addEventListener("click", function(event){
        // clear all
        console.log("refreshButton")
        console.log(registrations);
        registrations = [];
        tableBody.innerHTML = "";
        console.log(registrations);

        if (tableBody.rows.length === 0) {
            eleDeactive.classList.add('deactive-style');
            filterActive.classList.add('deactive-style');
            sortActive.classList.add('deactive-style');
            filterContainers.classList.add('deactive-style');
        }
    })

    // sortButton.addEventListner("change", )




    // EDIT functionality
    // tableBody.addEventListener("click", function (event) {
       

    // });
    // function deleteElement(event){
    //     // event.preventDefault;

    //     // console.log(parent.id)
    //     // if(parent.id == )
    //     // tableBody.deleteRow(parent.id); 
    //     // let indexx = registrations.findIndex(obj => obj.id == parent.id)
        
    //         // registrations[`id`].splice(registrations[0], 1);
    //     // }
    //     event.preventDefault();

    //     let val = registrations.findIndex(obj => obj.id == registrations.id)

    // }

    // deleteButton.addEventListener("click", deleteElement);

});