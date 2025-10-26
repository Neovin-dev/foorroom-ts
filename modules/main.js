// MAIN ENTRY POINT TO THE JS

/**
 * All the functions and constants are imported from relevent js files.
 */
import { elements } from "./domElements";
import formSubmitter from "./form/formSubmitter";
import visibilityHandler from "./uiHandler/visibilityHandler";

document.addEventListener("DOMContentLoaded", function initialize() {
  // initial reset of the visibiltyHandler function
  visibilityHandler(); 

  // the handling of the resize and the reload on the visibility handler
  window.addEventListener("load", visibilityHandler);
  window.addEventListener("resize", visibilityHandler);

  
  elements.registrationForm.addEventListener("submit", formSubmitter);
});
