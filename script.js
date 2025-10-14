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
    // let toggleFilter = document.getElementById('filter-bar');

    // Table Elements
    // let table = document.getElementById("table-container");
    let tableBody = document.getElementById("tableBody");
 
    // sort menu
    let sortMenu = document.getElementById("sort-menu");

    let overlayBackdrop = document.getElementById("overlay-backdrop");


    function toggleFilterContainerVisibility() {
    if (filterContainers) {
        if (window.innerWidth < 1020) {
            filterContainers.classList.add('deactive-style');
        } else {
            filterContainers.classList.remove('deactive-style');
        }
        }
    }

    toggleFilterContainerVisibility();

    window.addEventListener('resize', toggleFilterContainerVisibility);
        if (window.innerWidth < 1020){
            filterContainers.classList.add('deactive-style');
        }

    function rerenderTable(){
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

    // UPLOAD THE DATA TO form and update registrations.
    form.addEventListener("submit", function (event){
        event.preventDefault();

        /*
        test used in this case to find the matches and non matches it is part of RegEx
        */

        // validation ==================================================================================================================
        function validateName(name) {
            const namePattern = /^[a-zA-Z\s]/;

            if (name.trim() === "") {
                return "Name is required.";
            } else if (name.length < 2) {
                return "Name must be at least 3 characters.";
            } else if (!namePattern.test(name)) {
                return "Name can only contain letters and spaces.";
            }

            return "";
        }

        function validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email.trim() === "") {
                return "Email is required.";
            } else if (!emailPattern.test(email)) {
                return "Please enter a valid email address.";
            }

            return "";
        }

        function validatePhone(phone) {
            const phonePattern = /^[0-9]{10}$/;

            if (phone.trim() === "") {
                return "Phone number is required.";
            } else if (!phonePattern.test(phone)) {
                return "Phone number must be 10 digits.";
            }

            return "";
        }

        // subject validation 
        // some function used to check is atleast one of the box is selected

        let subjectCheckboxes = [];

        let mathsCheckbox = document.querySelector('input[type="checkbox"][name="maths"]');
        console.log("mathCheckbox:", mathsCheckbox);
        let englishCheckbox = document.querySelector('input[type="checkbox"][name="english"]');
        let frenchCheckbox = document.querySelector('input[type="checkbox"][name="french"]');
        let historyCheckbox = document.querySelector('input[type="checkbox"][name="history"]');

        if (mathsCheckbox) {
        subjectCheckboxes.push(mathsCheckbox);
        console.log("subjectCheckboxes",subjectCheckboxes);
        console.log("subjectCheckboxes maths:", mathsCheckbox);
        }
        if (englishCheckbox) {
        subjectCheckboxes.push(englishCheckbox);
        }
        if (frenchCheckbox) {
        subjectCheckboxes.push(frenchCheckbox);
        }
        if (historyCheckbox) {
        subjectCheckboxes.push(historyCheckbox);
        }
        console.log("subjectCheckboxes array:", subjectCheckboxes);

        // checking the array doesnt work if we compare if no of enteries are there or not we also need to verify the fact that it also matches
        let isSubjectSelected = subjectCheckboxes.some(check => {
            return check.checked;
            console.log("check.checked:", check.checked);
        });
        console.log("isSubjectSelected:", isSubjectSelected);

        if (!isSubjectSelected) {
            event.preventDefault(); 
            alert("Please select at least one subject.");
            return
        }

        let firstnameValue = firstname.value.trim();
        console.log("firstname", firstname);
        console.log("FirstnameValue", firstnameValue);
        console.log("FirstnameInnerhtml:", firstname.innerHTML);
        console.log("FirstnameInnertext:", firstname.innerText);
        let lastnameValue = lastname.value.trim();
        let emailValue = email.value.trim();
        let phoneValue = tele.value.trim();

        let nameError = validateName(firstnameValue);
        let lastNameError = validateName(lastnameValue);
        let emailError = validateEmail(emailValue);
        let phoneError = validatePhone(phoneValue);

        // error array 
        let errors = [];

        if (nameError) errors.push(nameError);
        if (lastNameError) errors.push(lastNameError);
        if (emailError) errors.push(emailError);
        if (phoneError) errors.push(phoneError);

        // only unempty errors returned as a complete concated string
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }


        // ==================================================================================================================
                    
        if(tableBody.rows.length < 1){
            eleDeactive.classList.remove('deactive-style');
            // filterContainers.classList.remove('deactive-style');
        }

        if(tableBody.rows.length > 0){
            filterActive.classList.remove('deactive-style');
            sortActive.classList.remove('deactive-style')
        }

        let gender = document.querySelector('input[name="gender"]:checked');

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

        let subMarked = document.querySelectorAll('input[type="checkbox"]:checked');
        user.subjects = [];
        console.log(`subjectsbyuser${user.subjects}`)
        // to resolve the duplication issue
        let selectedSubjects = new Set();
        subMarked.forEach(checks => {
            let subjectLabel = checks.closest('label');
            if (subjectLabel) {
                let subject = subjectLabel.textContent.trim();
                if (subject) selectedSubjects.add(subject);
            }
        });
        
        console.log("selectedSubjects data is:", selectedSubjects);

        user.subjects = Array.from(selectedSubjects);

        console.log("Array of electedSubjects data is:", user.subjects);

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

    // toggling filter function
    filterActive.addEventListener("click", function(event){
        event.preventDefault();
        console.log("clicked");
        
    
        let button = event.currentTarget;
        console.log(event.currentTarget);

        let isEnabled = button.dataset.enabled === "true";
        console.log(isEnabled)

        if (isEnabled) {
            button.dataset.enabled = "false";
            // filterContainers.classList.add('deactive-style');
            //backdrop overlay
            if (window.innerWidth < 780){
                overlayBackdrop.classList.add("inactive");
            }
        } else {
            button.dataset.enabled = "true";
            // filterContainers.classList.remove('deactive-style');

            if (window.innerWidth < 780){
                overlayBackdrop.classList.remove("inactive");
            }
            //backdrop overlay
        }

    })


    // adding functionality to the deleteButton
    // let deleteButton = document.getElementById("delete-button");
    // let deleteButtonSelector = document.querySelector(".deleteButton")


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

                console.log("userEditvalues")
                console.log(userEdit.subjects);
                

                let subjectCheckboxes = document.querySelectorAll('input[type="checkbox"]');

                subjectCheckboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
                
                let lowercaseSubjects = [];
                console.log(lowercaseSubjects);

                lowercaseSubjects = userEdit.subjects.map(sub => sub.toLowerCase());
                console.log(lowercaseSubjects);
                console.log()
                subjectCheckboxes.forEach(checkbox => {
                if (lowercaseSubjects.includes(checkbox.id)) {
                        console.log("id printer", checkbox.id);
                        checkbox.checked = true;
                    }
                });
                
                console.log(subjectCheckboxes);

                registrations = registrations.filter(user => user.id !== userId);

                row.remove();

                if (tableBody.rows.length === 0) {
                    eleDeactive.classList.add('deactive-style');
                    filterActive.classList.add('deactive-style');
                    sortActive.classList.add('deactive-style');
                    filterContainers.classList.add('deactive-style');
                }
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

                if(tableBody.rows.length === 1){
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

    // sort Dropdown. 
    sortMenu.addEventListener("click", function(event){
        event.preventDefault();

        let sortLink = event.target.closest('a[data-sort]');

        // use of inbuild .sort to sort the function and ifelse looping as sort can be one at a time.
        if(sortLink){
            let sortType = sortLink.dataset.sort;

            if (sortType === "A-Z") {
                registrations.sort((a, b) => a.firstname.localeCompare(b.firstname));
            } else if (sortType === "Z-A") {
                registrations.sort((a, b) => b.firstname.localeCompare(a.firstname));
            } else if (sortType === "O-Y") {
                registrations.sort((a, b) => new Date(a.dob) - new Date(b.dob));
            } else if (sortType === "Y-O") {
                registrations.sort((a, b) => new Date(b.dob) - new Date(a.dob));
            }
        }

        rerenderTable();

        if(tableBody.rows.length < 1){
            filterActive.classList.add('deactive-style');
            sortActive.classList.add('deactive-style')
        }

        let dropdownstate = document.getElementById("my-dropdown")
        dropdownstate.checked = false;

        
    })

    let applyFilterButton = document.getElementById("apply-filter-button");
    let clearFilterButton = document.getElementById("clear-filter-button");

    // Add event listener for the "Apply Filter" button
    applyFilterButton.addEventListener("click", function () {
        // Get all currently checked values from the filter menu

        filterContainers.classList.toggle('deactive-style');

        let selectedGenderCheckBoxes = document.querySelectorAll('#filter-containers input[name="gender"]:checked');
        let selectedSubjectCheckboxes = document.querySelectorAll('#filter-containers input[name="subject"]:checked');
        let selectedCenterCheckBoxes = document.querySelectorAll('#filter-containers input[name="center"]:checked');

        let selectedGenArr = Array.from(selectedGenderCheckBoxes);
        let selectedSubArr = Array.from(selectedSubjectCheckboxes);
        let selectedCenArr = Array.from(selectedCenterCheckBoxes);

        let selectedGenders = selectedGenArr.map(checkbox => checkbox.value);
        let selectedSubjects = selectedSubArr.map(checkbox => checkbox.value);
        let selectedCenters = selectedCenArr.map(checkbox => checkbox.value);
        

        // temp arr using filters
        let filteredRegistrations = registrations.filter(user => {

            let genderMatch;
            if (selectedGenders.length === 0) {
                genderMatch = true; 
            } else {
                genderMatch = selectedGenders.includes(user.gender);
            }

            let centerMatch;
            if (selectedCenters.length === 0) {
                centerMatch = true;
            } else {
                centerMatch = selectedCenters.includes(user.exam);
            }

            let subjectMatch = false;
            if (selectedSubjects.length === 0) {
                subjectMatch = true;
            } else {
                for (let userSubject of user.subjects) {
                    if (selectedSubjects.includes(userSubject)) {
                        subjectMatch = true;
                        break;
                    }
                }
            }

            return genderMatch && centerMatch && subjectMatch;

            
        });

        // rerender function but with a temp variable 
        tableBody.innerHTML = ''; 

        filteredRegistrations.forEach(user => {
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
                    <img src="img/edit_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg" alt="Edit">
                </button></td>
                <td><button class="button-register button-register-menu delete-button" type="button">
                    <img src="img/delete_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg" alt="Delete">
                </button></td>
            `;
            console.log(registrations);
            tableBody.appendChild(row);
        });

        if (window.innerWidth < 780){
            overlayBackdrop.classList.toggle("inactive");
        }

    });

    clearFilterButton.addEventListener("click", function() {
        let allCheckBoxes = document.querySelectorAll('#filter-containers input[type="checkbox"]');

        allCheckBoxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        rerenderTable();
    
    });

    const mobileSortBtn = document.getElementById('mobile-sort-btn');
    const sortOverlay = document.getElementById('sort-overlay');

    if (mobileSortBtn && sortOverlay) {
        const closeBtn = sortOverlay.querySelector('.close-btn');
        const backdrop = sortOverlay.querySelector('.overlay-backdrop');
        // const sortOptions = sortOverlay.querySelectorAll('.overlay-options li');

        const openSortOverlay = () => {
            sortOverlay.classList.add('is-active');
            document.body.classList.add('no-scroll');
        };

        const closeSortOverlay = () => {
            sortOverlay.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        };

        mobileSortBtn.addEventListener('click', openSortOverlay);
        closeBtn.addEventListener('click', closeSortOverlay);
        backdrop.addEventListener('click', closeSortOverlay);

    }

    const mobileFilterBtn = document.getElementById('mobile-filter-btn');
    const filterOverlay = document.getElementById('filters-overlay')
    
    if(mobileFilterBtn && filterOverlay){
        const closeBtn = filterOverlay.querySelector('.close-btn');
        const backdrop = filterOverlay.querySelector('.overlay-backdrop');

        const openFilterOverlay = () => {
            filterOverlay.classList.add('is-active');
            document.body.classList.add('no-scroll');
        }

        const closeFilterOverlay = () => {
            filterOverlay.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        }

        mobileFilterBtn.addEventListener('click', openFilterOverlay);
        closeBtn.addEventListener('click', closeFilterOverlay);
        backdrop.addEventListener('click', closeFilterOverlay);

    }
    
});