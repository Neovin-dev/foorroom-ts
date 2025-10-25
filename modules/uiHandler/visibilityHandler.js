import { elements } from "../domElements";
import { state } from "../stateManager/state";

export default function visibilityHandler() {
  if (window.innerWidth < 1025) {
    if (elements.filterMenu)
      elements.filterMenu.classList.add("deactive-style");
    if (elements.sortControls)
      elements.sortControls.classList.add("deactive-style");
  } else {
    if (
      elements.sortControls &&
      elements.sortControls.classList.contains("deactive-style")
    )
      elements.sortControls.classList.remove("deactive-style");
  }

  if (elements.filterMenu) {
    if (window.innerWidth < 1025) {
      elements.filterMenu.classList.add("deactive-style");
    } else {
      elements.filterMenu.classList.remove("deactive-style");
    }
  }

  if (sortControls) {
    if (window.innerWidth < 1025) {
      elements.sortControls.classList.add("deactive-style");
    } else {
      elements.sortControls.classList.remove("deactive-style");
    }
  }

  if (state.registrations.length === 0) {
    // if (dataTablePanel) dataTablePanel.classList.add('deactive-style');
    if (elements.tableData) elements.tableData.classList.add("deactive-style");
    if (elements.filterBar) elements.filterBar.classList.add("deactive-style");
    // if (sortControls) sortControls.classList.add('deactive-style');
    if (elements.tableContainer)
      elements.tableContainer.classList.add("deactive-style");
    if (
      elements.dataSection &&
      !elements.dataSection.classList.contains("deative-style")
    )
      dataSection.classList.add("deactive-style");
  } else {
    // if (dataTablePanel) dataTablePanel.classList.remove('deactive-style');
    if (elements.tableData)
      elements.tableData.classList.remove("deactive-style");
    if (elements.filterBar)
      elements.filterBar.classList.remove("deactive-style");
    // if (sortControls) sortControls.classList.remove('deactive-style');
    if (elements.tableContainer)
      elements.tableContainer.classList.remove("deactive-style");
    if (elements.dataSection)
      elements.dataSection.classList.remove("deactive-style");
  }

  if (elements.emptyStateDefault) {
    if (state.registrations.length > 0) {
      elements.emptyStateDefault.classList.add("deactive-style");
    } else {
      elements.emptyStateDefault.classList.remove("deactive-style");
    }
  }
}
