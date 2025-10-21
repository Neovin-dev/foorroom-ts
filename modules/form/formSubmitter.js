import { dynamicSelectors, elements} from "../domElements";
import { state } from "../stateManager/state";
import { renderTable } from "../utils/renderTable";
import { errorHandler } from "./errorHandler";
import { createUser } from "./user";

elements.registrationForm.addEventListener("submit", function(event){
    event.preventDefault();

    // Error Handler handle all the error messages
    const isFormValid = errorHandler(event);
    if(!isFormValid) return;

    // editMode state management line276
    
    // view management

    // clear all filterMenu on all submit or this can be handled in a seperate file is.
    dynamicSelectors.getAllDesktopFilterCheckboxes().forEach(checkbox => {
        checkbox.checked = false;
    });

    const subjectNodes = dynamicSelectors.getSelectedFormSubjects();
    const selectedSubjects = new Set();
    subjectNodes.forEach(check => {
        const subjectLabel = check.closest('label').textContent.trim();
        if (subjectLabel) {
            selectedSubjects.add(subjectLabel);
        }
    });
    const subjectsArray = Array.from(selectedSubjects);

    const newUser = createUser(subjectsArray);

    state.registrations.push(newUser);

    renderTable();
    
    elements.registrationForm.reset();

})