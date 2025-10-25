import { elements, dynamicSelectors } from "../domElements";
import { state } from "../stateManager/state";
import visibilityHandler from "../uiHandler/visibilityHandler";

export function renderTable() {
  // tableBody is null -> return
  if (!elements.tableBody) return;

  // 1 Clear TableBody
  elements.tableBody.innerHTML = ``;

  // 2. repopulate the table
  state.registrations.forEach((user) => {
    // created and element to push the row data
    let row = document.createElement("tr");
    row.setAttribute("data-id", user.id);

    row.innerHTML = `
                <td>${user.firstname} ${user.lastname}</td>
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

    elements.tableBody.appendChild(row);
  });

  visibilityHandler();
}
