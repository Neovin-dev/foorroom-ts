import { elements, dynamicSelectors } from "../domElements";

function validateName(name) {
  const namePattern = /^[a-zA-Z\s]+$/;
  if (name.trim() === "") return "Name is required.";
  if (name.length < 2) return "must be at least 2 characters.";
  if (!namePattern.test(name))
    return "Name can only contain letters and spaces.";
  return "";
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.trim() === "") return "Email is required.";
  if (!emailPattern.test(email)) return "Not a valid email address.";
  return "";
}

function validatePhone(phone) {
  const phonePattern = /^[0-9]{10}$/;
  if (phone.trim() === "") return "Ph no. is required.";
  if (!phonePattern.test(phone)) return "Ph no. must be 10 digits.";
  return "";
}

function validateDate(dob) {
  if (!dob) return "Date of Birth is required.";
  const today = new Date();
  const date = new Date(dob);
  const minimumAge = new Date();
  minimumAge.setFullYear(today.getFullYear() - 18);
  const maximumAge = new Date();
  maximumAge.setFullYear(today.getFullYear() - 120);

  if (date > minimumAge) return "must be atleast 18 years old.";
  if (date < maximumAge) return "must be less than 120 years old";
  return "";
}

function validateSubjects(event) {
  const subjectCheckboxes = dynamicSelectors.getFormSubjectCheckboxes();

  let isSubjectSelected = Array.from(subjectCheckboxes).some(
    (tick) => tick.checked,
  );

  if (!isSubjectSelected) {
    return "Select atleast one subject";
  } else {
    return "";
  }
}

export {
  validateName,
  validateEmail,
  validatePhone,
  validateDate,
  validateSubjects,
};
