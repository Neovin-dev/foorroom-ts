import { dynamicSelectors } from "../domElements";
import { state } from "../stateManager/state";

export function createUser(subjects) {
    const selectedGender = dynamicSelectors.getSelectedGender();
    const currentId = state.registrations.length > 0 ? Math.max(...state.registrations.map(user => user.id)) + 1 : 0;

    const user = {
                   id: currentId,
                   firstname: firstNameInput.value,
                   lastname: lastNameInput.value,
                   dob: dobInput.value,
                   email: emailInput.value,
                   tele: phoneInput.value,
                   exam: examCenterInput.value,
                   gender: selectedGender ? selectedGender.parentElement.innerText.trim() : "N/A",
                   subjects: subjects
    };

    return user;

}