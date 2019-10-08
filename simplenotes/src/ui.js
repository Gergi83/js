class UI {
  constructor() {
    this.note = document.querySelector("#notes");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.noteSubmit = document.querySelector(".note-submit");
    this.formState = "add";
  }

  // Show all notes
  showNotes(notes) {
    let output = "";
    notes.forEach(note => {
      output += `
        <div class="card mb-1">
          <div class="card-body">
            <h5 class="card-title">${note.title}</h4>
            <p class="card-text">${note.body}</p>
            <a href="#" class="update card-link" data-id="${note.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${note.id}">
            <i class="fa fa-remove"></i>
          </a>
          </div>
        </div>
      `;
    });
    this.note.innerHTML = output;
  }

  // Show alert message
  showAlert(message, className) {
    this.clearAlert();
    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".notes-container");
    // Get notes
    const notes = document.querySelector("#notes");
    // Insert alert div
    container.insertBefore(div, notes);
    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 2500);
  }

  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  // Clear all fields
  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  // Fill form to update
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;
    this.changeFormState("update");
  }

  // Clear id input
  clearIdInput() {
    this.idInput.value = "";
  }

  // Change form state
  changeFormState(type) {
    if (type === "update") {
      this.noteSubmit.textContent = "Update Note";
      this.noteSubmit.className = "note-submit btn btn-warning btn-block";

      // Create cancel update btn
      const button = document.createElement("button");
      button.className = "note-cancel btn btn-light btn-block";
      button.appendChild(document.createTextNode("Cancel Update"));
      const cardForm = document.querySelector(".card-form");
      const formEnd = document.querySelector(".form-end");
      cardForm.insertBefore(button, formEnd);
    } else {
      this.noteSubmit.textContent = "Save Note";
      this.noteSubmit.className = "note-submit btn btn-primary btn-block";
      // Remove cancel btn if it's there
      if (document.querySelector(".note-cancel")) {
        document.querySelector(".note-cancel").remove();
      }
      // Clear id from hidden field
      this.clearIdInput();
      // Clear text fields
      this.clearFields();
    }
  }
}

export const ui = new UI();