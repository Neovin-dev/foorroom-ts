import { elements, dynamicSelectors } from "../domElements";
import { state } from "../stateManager/state";

export function createUser(subjects) {
  const selectedGender = dynamicSelectors.getSelectedGender();
  const currentId =
    state.registrations.length > 0
      ? Math.max(...state.registrations.map((user) => user.id)) + 1
      : 0;

  const user = {
    id: currentId,
    firstname: elements.firstNameInput.value.trim(),
    lastname: elements.lastNameInput.value.trim(),
    dob: elements.dobInput.value.trim(),
    email: elements.emailInput.value.trim(),
    tele: elements.phoneInput.value.trim(),
    exam: elements.examCenterInput.value.trim(),
    gender: selectedGender
      ? selectedGender.parentElement.innerText.trim()
      : "N/A",
    subjects: subjects,
  };

  return user;
}
