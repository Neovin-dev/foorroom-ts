// here all the necessary HTML elements are complied at one place and retured as as object.

/**
 * An object containing references to static DOM elements that do not change.
 * These are queried once and cached for performance.
 * and we will handle the dynamic and state changing variables in a seperate file.
 */

export const elements = {
    // Form Elements Selectors.
    registrationForm: document.getElementById("registrationForm"),
    firstNameInput: document.getElementById("firstName"),
    lastNameInput: document.getElementById("lastName"),
    dobInput: document.getElementById("dateOfBirth"),
    emailInput: document.getElementById("emailAddress"),
    phoneInput: document.getElementById("phoneNumber"),
    examCenterInput: document.getElementById("examCenter"),
    submitButton: document.querySelector('.submit-button'),

    // Error Message Spans 
    firstNameError: document.getElementById("firstNameError"),
    lastNameeError: document.getElementById("lastNameError"),
    dateOfBirthError: document.getElementById("dateOfBirthError"),
    emailAddressError: document.getElementById("emailAddressError"),
    phoneNumberError: document.getElementById("phoneNumberError"),
    subjectError: document.getElementById("subjectError"),

    // Table and Display Data Selectors.
    tableBody: document.getElementById("tableBody"),
    tableData: document.querySelector(".table-container-div"),
    dataTablePanel: document.getElementById("filter-data"),
    tableContainer: document.getElementById("table-container"),
    dataSection: document.getElementById("data-section-container"),

    // Controls and Menus
    filterBar: document.getElementById("filter-bar"),
    sortControls: document.getElementById("sortControls"),
    sortOptionsMenu: document.getElementById("sortOptionsMenu"),
    applyFilterButton: document.getElementById("applyFilterButton"),
    clearFilterButton: document.getElementById("clearFilterButton"),

    // Desktop Controls
    filterMenu: document.getElementById("filterMenu"),

    // Mobile Controls
    mobileControls: document.getElementById("mobileControls"),
    mobileSortOptions: document.querySelector('#sortOverlay .overlay-options'),
    mobileApplyFilterButton: document.getElementById('mobileApplyFilterButton'),
    mobileClearFilterButton: document.getElementById('mobileClearFilterButton'),
    mobileSortButton: document.getElementById('mobileSortButton'),
    mobileFilterButton: document.getElementById('mobileFilterButton'),
    
    
    // Empty States
    emptyStateDefault: document.getElementById("empty-state-default"),
    emptyStateFilter: document.getElementById("empty-state-filters"),

    
    // Mobile Overlay & Backdrop
    sortOverlay: document.getElementById('sortOverlay'),
    filtersOverlay: document.getElementById('filtersOverlay'),
    overlayBackdrop: document.getElementById("overlay-backdrop"),
    
    // Dropdown Toggle
    sortDropdownToggle: document.getElementById("sortDropdownToggle"),


}

/**
 * An Object containing functions that return dynamic or frequently updated DOM element list.
 * These are functions therefore they query the DOM every time they are called to get the updated/ latest state.
 */

export const dynamicSelectors = {
    // Form State
    getSelectedGender: () => document.querySelectorAll('input[name="gender"]:checked'),
    getAllGenderRadios: () => document.querySelectorAll('input[name="gender"]'),
    // Get all checkboxes inside the registration form for a specific subject group
    getFormSubjectCheckboxes: () => document.querySelectorAll('.subject-selection-group input[type="checkbox"]'),

    // Get only the selected subject checkboxes
    getSelectedFormSubjects: () => document.querySelectorAll('.subject-selection-group input[type="checkbox"]:checked'),

    // Get all checkboxes from the desktop filter menu
    getAllDesktopFilterCheckboxes: () => document.querySelectorAll('#filterMenu input[type="checkbox"]'),

    // Get all checkboxes from the mobile filter menu
    getAllMobileFilterCheckboxes: () => document.querySelectorAll('#filtersOverlay input[type="checkbox"]'),

    // Desktop Filter State
    getSelectedDesktopFilters: () => ({
        gender: document.querySelectorAll('#filterMenu input[name="gender-filter"]:checked'),
        subjects: document.querySelectorAll('#filterMenu input[name="subjects"]:checked'),
        centers: document.querySelectorAll('#filterMenu input[name="center"]:checked'),
    }),

    // Mobile Filter State
    getSelectedMobileFilters: () => ({
        gender: document.querySelectorAll('#filtersOverlay input[name="gender-mobile"]:checked'),
        subjects: document.querySelectorAll('#filtersOverlay input[name="subject-mobile"]:checked'),
        centers: document.querySelectorAll('#filtersOverlay input[name="center-mobile"]:checked'),
    }),


}