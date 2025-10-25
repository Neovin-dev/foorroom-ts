// MAIN ENTRY POINT TO THE JS

/**
 * All the functions and constants are imported from relevent js files.
 */
import { elements, dynamicSelectors } from "./domElements";
import formSubmitter from "./form/formSubmitter";
import { state } from "./stateManager/state";
import visibilityHandler from "./uiHandler/visibilityHandler";
import { renderTable } from "./utils/renderTable";

document.addEventListener("DOMContentLoaded", function initialize() {
  // initial reset of the visibiltyHandler function
  visibilityHandler;

  window.addEventListener("reload", visibilityHandler);
  window.addEventListener("resize", visibilityHandler);

  elements.registrationForm.addEventListener("submit", formSubmitter);
});
