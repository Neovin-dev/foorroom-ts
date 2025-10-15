let registrations = [];
 let editMode = false;
document.addEventListener("DOMContentLoaded", function () {

    let dataTablePanel = document.getElementById("dataTable");
    let filterBar = document.getElementById("filter-bar");
    let tableContainer = document.getElementById("table-container");
    let tableData = document.querySelector(".table-container-div");
    let sortControls = document.getElementById("sortControls");
    let filterMenu = document.getElementById("filterMenu");

    let registrationForm = document.getElementById("registrationForm");
    let firstNameInput = document.getElementById("firstName");
    let lastNameInput = document.getElementById("lastName");
    let dobInput = document.getElementById("dateOfBirth");
    let emailInput = document.getElementById("emailAddress");
    let phoneInput = document.getElementById("phoneNumber");
    let examCenterInput = document.getElementById("examCenter");
    // let pageRefreshButton = document.getElementById('pageRefreshButton');

    let tableBody = document.getElementById("tableBody");

    // sort menu
    let sortOptionsMenu = document.getElementById("sortOptionsMenu");

    let overlayBackdrop = document.getElementById("overlay-backdrop");

    let mobileControls = document.getElementById("mobileControls");

    let emptyStateDefault = document.getElementById("empty-state-default");
    let emptyStateFilter = document.getElementById("empty-state-filters");

    if (window.innerWidth < 1020) {
        if (filterMenu) filterMenu.classList.add('deactive-style');
        if (mobileControls) mobileControls.classList.remove('deactive-style');
    }

    function toggleFilterContainerVisibility() {
        if (filterMenu) {
            if (window.innerWidth < 1020) {
                filterMenu.classList.add('deactive-style');
            } else {
                filterMenu.classList.remove('deactive-style');
            }
        }

        if (mobileControls) {
            if (window.innerWidth < 1020) {
                mobileControls.classList.remove('deactive-style');
            } else {
                mobileControls.classList.add('deactive-style');
            }
        }
    }

    toggleFilterContainerVisibility(); 
    // check on intial load

    window.addEventListener('reload', toggleFilterContainerVisibility);
    window.addEventListener('resize', toggleFilterContainerVisibility);
    // reload and resize. load when refreshed


    function rerenderTable() {
        if (!tableBody) return; // Prevent error if tableBody is null
        //clear the table
        tableBody.innerHTML = ``;

        // re-estabish the table
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
                <td><button class="action-button button-register-menu edit-button" type="button">
                    <img src="img/edit_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg" alt="">
                </button></td>
                <td><button class="action-button button-register-menu delete-button" type="button">
                    <img src="img/delete_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg" alt="">
                </button></td>
                `;

            tableBody.appendChild(row);
        })

        if (registrations.length === 0) {
            // if (dataTablePanel) dataTablePanel.classList.add('deactive-style');
            if(tableData) tableData.classList.add("deactive-style");
            if (filterBar) filterBar.classList.add('deactive-style');
            if (sortControls) sortControls.classList.add('deactive-style');
            if (tableContainer) tableContainer.classList.add('deactive-style');
        } else {
            // if (dataTablePanel) dataTablePanel.classList.remove('deactive-style');
            if(tableData) tableData.classList.remove("deactive-style");
            if (filterBar) filterBar.classList.remove('deactive-style');
            if (sortControls) sortControls.classList.remove('deactive-style');
            if (tableContainer) tableContainer.classList.remove('deactive-style');
        }

        if (emptyStateDefault) {
            if (registrations.length > 0) {
                emptyStateDefault.classList.add('deactive-style');
            } else {
                emptyStateDefault.classList.remove('deactive-style');
            }
        }

    }

    const firstNameError = document.getElementById("firstNameError");
    const lastNameeError = document.getElementById("lastNameError");
    const dateOfBirthError = document.getElementById("dateOfBirthError");
    const emailAddressError = document.getElementById("emailAddressError");
    const genderError = document.getElementById("genderError");
    const phoneNumberError = document.getElementById("phoneNumberError");
    const examCenterError = document.getElementById("examCenterError");
    const subjectError= document.getElementById("subjectError");

    // UPLOAD THE DATA TO form and update registrations.
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        /*
        test used in this case to find the matches and non matches it is part of RegEx
        */

        // validation ==================================================================================================================
        function validateName(name) {
            const namePattern = /^[a-zA-Z\s]+$/; 
            if (name.trim() === "") return "Name is required.";
            if (name.length < 2) return "Name must be at least 3 characters.";
            if (!namePattern.test(name)) return "Name can only contain letters and spaces.";
            return "";
        }

        function validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.trim() === "") return "Email is required.";
            if (!emailPattern.test(email)) return "Please enter a valid email address.";
            return "";
        }

        function validatePhone(phone) {
            const phonePattern = /^[0-9]{10}$/;
            if (phone.trim() === "") return "Phone number is required.";
            if (!phonePattern.test(phone)) return "Phone number must be 10 digits.";
            return "";
        }

        function validateDate(dob) {
            const today = new Date();
            const date = new Date(dob);
            const minimumAge = new Date();
            minimumAge.setFullYear(today.getFullYear() - 18);
            const maximumAge = new Date();
            maximumAge.setFullYear(today.getFullYear() - 120);

            if (date > minimumAge) return "You must be atleast 18 years old.";
            if (date < maximumAge) return 'Age must be less than 120 years old';
            return "";
        }
        
        // subject validation 
        let subjectCheckboxes = Array.from(registrationForm.querySelectorAll('input[type="checkbox"][name="maths"], input[type="checkbox"][name="english"], input[type="checkbox"][name="french"], input[type="checkbox"][name="history"]'));
        
        let isSubjectSelected = subjectCheckboxes.some(check => check.checked);

        if (!isSubjectSelected) {
            event.preventDefault();
            alert("Please select at least one subject.");
            return;
        }

        let firstnameValue = firstNameInput.value.trim();
        let lastnameValue = lastNameInput.value.trim();
        let emailValue = emailInput.value.trim();
        let phoneValue = phoneInput.value.trim();
        let dateValue = dobInput.value.trim();

        let nameError = validateName(firstnameValue);
        let lastNameError = validateName(lastnameValue);
        let emailError = validateEmail(emailValue);
        let phoneError = validatePhone(phoneValue);
        let dateError = validateDate(dateValue);

        // let errors = [];
        // if (nameError) errors.push(nameError);
        // if (lastNameError) errors.push(lastNameError);
        // if (emailError) errors.push(emailError);
        // if (phoneError) errors.push(phoneError);
        // if (dateError) errors.push(dateError);

        // if (errors.length > 0) {
        //     alert(errors.join('\n'));
        //     return;
        // }

        if(nameError) firstNameError.innerText(nameError);
        if(lastNameError) lastNameeError.innerText(lastNameError);
        // write a dob one
        if(emailError) emailAddressError.innerText(emailError);
        

        // ==================================================================================================================
        // if (tableBody && tableBody.rows.length < 1) {
        //     tableContainer.classList.add('deactive-style');
        // }

        // if (tableBody && tableBody.rows.length > 0) {
        //     if (filterBar) filterBar.classList.remove('deactive-style');
        //     if (sortControls) sortControls.classList.remove('deactive-style');
        //     tableContainer.classList.remove('deactive-style');
        // }

        if(editMode){
            submitButton.textContent = `Submit`;
            submitButton.classList.remove("update-button");
        }

        (function(){
            let allCheckBoxes = document.querySelectorAll('#filterMenu input[type="checkbox"]');
            allCheckBoxes.forEach(checkbox => checkbox.checked = false);
        })();

        if (dataTablePanel) dataTablePanel.classList.remove('deactive-style');
        if (filterBar) filterBar.classList.remove('deactive-style');
        if (sortControls) sortControls.classList.remove('deactive-style');
        if (tableContainer) tableContainer.classList.remove('deactive-style');

        if(emptyStateDefault){
            if(registrations.length > 0){
                emptyStateDefault.classList.remove('deactive-style');
            }else {
                emptyStateDefault.classList.add('deactive-style');
            }
        }

        let gender = document.querySelector('input[name="gender"]:checked');
        let currentId = registrations.length > 0 ? Math.max(...registrations.map(u => u.id)) + 1 : 0;

        let user = {
            id: currentId,
            firstname: firstNameInput.value,
            lastname: lastNameInput.value,
            dob: dobInput.value,
            email: emailInput.value,
            tele: phoneInput.value,
            exam: examCenterInput.value,
            gender: gender ? gender.parentElement.innerText.trim() : "N/A",
            subjects: []
        }

        let subMarked = registrationForm.querySelectorAll('.subject-selection-group input[type="checkbox"]:checked');
        let selectedSubjects = new Set();
        subMarked.forEach(checks => {
            let subjectLabel = checks.closest('label');
            if (subjectLabel) {
                let subject = subjectLabel.textContent.trim();
                if (subject) selectedSubjects.add(subject);
            }
        });

        user.subjects = Array.from(selectedSubjects);
        registrations.push(user);
        
        // if (tableBody) {
        //     let row = document.createElement("tr");
        //     row.setAttribute('data-id', user.id);
        //     row.innerHTML = `
        //         <td>${user.firstname}</td>
        //         <td>${user.lastname}</td>
        //         <td>${user.dob}</td>
        //         <td>${user.email}</td>
        //         <td>${user.tele}</td>
        //         <td>${user.exam}</td>
        //         <td>${user.gender}</td>
        //         <td>${user.subjects.join(', ')}</td>
        //         <td><button class="action-button button-register-menu edit-button" type="button">
        //             <img src="img/edit_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg" alt="">
        //         </button></td>
        //         <td><button class="action-button button-register-menu delete-button" type="button">
        //             <img src="img/delete_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg" alt="">
        //         </button></td>
        //     `;
        //     tableBody.appendChild(row);


        // }
        rerenderTable();
        registrationForm.reset();
    });

    if (filterBar) {
        filterBar.addEventListener("click", function (event) {
            event.preventDefault();
            let button = event.currentTarget;
            let isEnabled = button.dataset.enabled === "true";
            if (isEnabled) {
                button.dataset.enabled = "false";
                if (overlayBackdrop && window.innerWidth < 780) {
                    overlayBackdrop.classList.add("inactive");
                }
            } else {
                button.dataset.enabled = "true";
                if (overlayBackdrop && window.innerWidth < 780) {
                    overlayBackdrop.classList.remove("inactive");
                }
            }
        });
    }

    const submitButton = document.querySelector('.submit-button');
   

    if (tableBody) {
        tableBody.addEventListener("click", function (event) {
            let editButton = event.target.closest(".edit-button");
            let deleteButton = event.target.closest(".delete-button");

            if (editButton) {

                // update mode
                editMode = true;
                submitButton.textContent = `Update`;
                submitButton.classList.add("update-button");
                
                let row = editButton.closest("tr");
                let userId = parseInt(row.dataset.id);
                let userEdit = registrations.find(user => user.id === userId);

                if (!userEdit) return;

                firstNameInput.value = userEdit.firstname;
                lastNameInput.value = userEdit.lastname;
                dobInput.value = userEdit.dob;
                emailInput.value = userEdit.email;
                phoneInput.value = userEdit.tele;
                examCenterInput.value = userEdit.exam;

                let genderRadios = document.querySelectorAll('input[name="gender"]');
                genderRadios.forEach(radio => {
                    radio.checked = radio.parentElement.innerText.trim() === userEdit.gender;
                });
                
                let subjectCheckboxes = registrationForm.querySelectorAll('.subject-selection-group input[type="checkbox"]');
                subjectCheckboxes.forEach(checkbox => {
                    checkbox.checked = false; // Reset all
                    const labelText = checkbox.closest('label').textContent.trim();
                    if (userEdit.subjects.includes(labelText)) {
                        checkbox.checked = true;
                    }
                });

                registrations = registrations.filter(user => user.id !== userId);
                row.remove();

                // rerenderTable();
                (function(){
                    let allCheckBoxes = document.querySelectorAll('#filterMenu input[type="checkbox"]');
                    allCheckBoxes.forEach(checkbox => checkbox.checked = false);
                    rerenderTable();
                    if(registrations.length > 0){
                        tableData.classList.remove("deactive-style");
                    }
                    
                    emptyStateFilter.classList.add("deactive-style");
                })();

                if (tableBody.rows.length === 0) {
                    // dataTablePanel.classList.add('deactive-style');
                    tableData.classList.add("deactive-style");
                    if(filterBar) filterBar.classList.add('deactive-style');
                    if(sortControls) sortControls.classList.add('deactive-style');
                    // if(filterMenu) filterMenu.classList.add('deactive-style');
                    //toggle the empty state illustration here
                    if(emptyStateDefault) emptyStateDefault.classList.remove('deactive-style');
                    
                }
                if (tableBody.rows.length <= 1) {
                     if(sortControls) sortControls.classList.add('deactive-style');
                     tableData.classList.remove("deactive-style");
                    //  if(filterMenu) filterMenu.classList.add('deactive-style');
                }

                if(registrations.length === 0){
                    tableData.classList.add("deactive-style")
                }
            }

            if (deleteButton) {
                let row = deleteButton.closest("tr");
                let userId = parseInt(row.dataset.id);
                registrations = registrations.filter(user => user.id !== userId);
                row.remove();
                applyFilterButton.click();
                // simulate a click as the applyFilterButton is a click event listner

                // if (tableBody.rows.length === 1) { 
                //     // dataTablePanel.classList.add('deactive-style');
                //     tableData.classList.add("deactive-style");
                //     if(filterBar) filterBar.classList.add('deactive-style');
                //     if(sortControls) sortControls.classList.add('deactive-style');
                //     if(emptyStateDefault) emptyStateDefault.classList.remove('deactive-style');
                // }
                // if (tableBody.rows.length <= 1) {
                //      if(sortControls) sortControls.classList.add('deactive-style');
                //     //  if(filterMenu) filterMenu.classList.add('deactive-style');
                // }
            }
        });
    }


    if (sortOptionsMenu) {
        sortOptionsMenu.addEventListener("click", function (event) {
            event.preventDefault();
            let sortLink = event.target.closest('li[data-sort]');

            if (sortLink) {
                let sortType = sortLink.dataset.sort;

                if (sortType === "A-Z") registrations.sort((a, b) => a.firstname.localeCompare(b.firstname));
                else if (sortType === "Z-A") registrations.sort((a, b) => b.firstname.localeCompare(a.firstname));
                else if (sortType === "O-Y") registrations.sort((a, b) => new Date(a.dob) - new Date(b.dob));
                else if (sortType === "Y-O") registrations.sort((a, b) => new Date(b.dob) - new Date(a.dob));
            }
            rerenderTable();

            if (tableBody && tableBody.rows.length < 1) {
                if(filterBar) filterBar.classList.add('deactive-style');
                if(sortControls) sortControls.classList.add('deactive-style');
            }

            let sortDropdownToggle = document.getElementById("sortDropdownToggle");
            if(sortDropdownToggle) sortDropdownToggle.checked = false;
        });
    }

    let applyFilterButton = document.getElementById("applyFilterButton");
    let clearFilterButton = document.getElementById("clearFilterButton");

    if (applyFilterButton) {
        applyFilterButton.addEventListener("click", function () {
            // if (filterMenu) filterMenu.classList.toggle('deactive-style');

            let selectedGenderCheckBoxes = document.querySelectorAll('#filterMenu input[name="gender-filter"]:checked');
            let selectedSubjectCheckboxes = document.querySelectorAll('#filterMenu input[name="subject"]:checked');
            let selectedCenterCheckBoxes = document.querySelectorAll('#filterMenu input[name="center"]:checked');

            let selectedGenders = Array.from(selectedGenderCheckBoxes).map(cb => cb.value.toLowerCase());
            let selectedSubjects = Array.from(selectedSubjectCheckboxes).map(cb => cb.value.toLowerCase());
            let selectedCenters = Array.from(selectedCenterCheckBoxes).map(cb => cb.value.toLowerCase());

            let filteredRegistrations = registrations.filter(user => {
                const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(user.gender.toLowerCase());
                const centerMatch = selectedCenters.length === 0 || selectedCenters.includes(user.exam.trim().toLowerCase());
                const subjectMatch = selectedSubjects.length === 0 || user.subjects.some(subject => selectedSubjects.includes(subject.toLowerCase()));
                return genderMatch && centerMatch && subjectMatch;
            });

            if (filteredRegistrations.length === 0) {
                if (registrations.length > 0) {
                    clearFilterButton.click(); 
                } else {
                    rerenderTable();
                }
                return; 
            }

            if(tableBody) {
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
                        <td>${user.subjects.join(', ')}</td>
                        <td><button class="action-button button-register-menu edit-button" type="button"><img src="img/edit_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg" alt="Edit"></button></td>
                        <td><button class="action-button button-register-menu delete-button" type="button"><img src="img/delete_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg" alt="Delete"></button></td>
                    `;
                    tableBody.appendChild(row);

                    // if (dataTablePanel) dataTablePanel.classList.remove('deactive-style');
                    // if (filterBar) filterBar.classList.remove('deactive-style');
                    // if (sortControls) sortControls.classList.remove('deactive-style');
                    // if (tableContainer) tableContainer.classList.remove('deactive-style');
                });
            }
            if (overlayBackdrop && window.innerWidth < 780) {
                overlayBackdrop.classList.toggle("deactive-style");
            }

            if(filteredRegistrations.length === 0){
                tableData.classList.add("deactive-style");
                emptyStateFilter.classList.remove("deactive-style");
            }else {
                tableData.classList.remove("deactive-style");
                emptyStateFilter.classList.add("deactive-style");
            }
        });
    }

    if (clearFilterButton) {
        clearFilterButton.addEventListener("click", function () {
            let allCheckBoxes = document.querySelectorAll('#filterMenu input[type="checkbox"]');
            allCheckBoxes.forEach(checkbox => checkbox.checked = false);
            rerenderTable();
            if(registrations.length > 0){
                tableData.classList.remove("deactive-style");
            }
            
            emptyStateFilter.classList.add("deactive-style");
            
        });
    }
    
    // --- Mobile Overlay Logic ---
    const mobileSortButton = document.getElementById('mobileSortButton');
    const sortOverlay = document.getElementById('sortOverlay');

    if (mobileSortButton && sortOverlay) {
        const closeBtn = sortOverlay.querySelector('.close-button');
        const backdrop = sortOverlay.querySelector('.overlay-backdrop');

        const openSortOverlay = () => {
            sortOverlay.classList.add('is-active');
            document.body.classList.add('no-scroll');
        };

        const closeSortOverlay = () => {
            sortOverlay.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        };

        mobileSortButton.addEventListener('click', openSortOverlay);
        closeBtn.addEventListener('click', closeSortOverlay);
        backdrop.addEventListener('click', closeSortOverlay);
    }

    const mobileFilterButton = document.getElementById('mobileFilterButton');
    const filtersOverlay = document.getElementById('filtersOverlay');

    if (mobileFilterButton && filtersOverlay) {
        const closeBtn = filtersOverlay.querySelector('.close-button');
        const backdrop = filtersOverlay.querySelector('.overlay-backdrop');

        const openFilterOverlay = () => {
            filtersOverlay.classList.add('is-active');
            document.body.classList.add('no-scroll');
        };

        const closeFilterOverlay = () => {
            filtersOverlay.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        };

        mobileFilterButton.addEventListener('click', openFilterOverlay);
        closeBtn.addEventListener('click', closeFilterOverlay);
        backdrop.addEventListener('click', closeFilterOverlay);
    }
});