import { elements} from "../domElements";
import * as validators from "./formValidation";
    
export function errorHandler(event){
    let isFormValid = true;
    
    let firstnameVaule = elements.firstNameInput.value.trim();
    let lastnameValue = elements.lastNameInput.value.trim();
    let emailValue = elements.emailInput.value.trim();
    let phoneValue = elements.phoneInput.value.trim();
    let dateValue = elements.dobInput.value.trim();

    let nameError = validators.validateName(firstnameVaule);
    let lastNameError = validators.validateName(lastnameValue);
    let emailError = validators.validateEmail(emailValue);
    let phoneError = validators.validatePhone(phoneValue);
    let dateError = validators.validateDate(dateValue);
    let subjectError = validators.validateSubjects();

    if(nameError){
        elements.firstNameError.innerText = nameError;
        isFormValid = false;
    }else {
        elements.firstNameError.innerText = '';
    }
    if(lastNameError) {
        elements.lastNameeError.innerText = lastNameError;
        isFormValid = false;
    }else {
        elements.lastNameeError.innerText = '';
    }
    if(emailError){
        elements.emailAddressError.innerText = emailError; 
        isFormValid = false;
    }else {
        elements.emailAddressError.innerText = '';
    }
    if(phoneError){
        elements.phoneNumberError.innerHTML = phoneError;
        isFormValid = false;
    }else {
        elements.phoneNumberError.innerHTML = '';
    }
    if(dateError){
        elements.dateOfBirthError.innerHTML = dateError; 
        isFormValid = false;
    } else {
        elements.dateOfBirthError.innerHTML = ''; 
    }
    if (subjectError) {
        elements.subjectError.innerText = subjectError;
        isFormValid = false;
    } else {
        elements.subjectError.innerText = '';
    }

    return isFormValid;
}
    