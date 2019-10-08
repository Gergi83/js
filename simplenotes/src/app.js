import { http } from "./http.js";
import { ui } from "./ui.js";

// Get notes on DOM load
document.addEventListener("DOMContentLoaded", getNotes);

// Listen for add note
document.querySelector(".note-submit").addEventListener("click", submitNote);

// Listen for delete
document.querySelector("#notes").addEventListener("click", deleteNote);

// Listen for update state
document.querySelector("#notes").addEventListener("click", enableUpdate);

// Listen for cancel
document.querySelector(".card-form").addEventListener("click", cancelUpdate);

// Listen for filter
document.querySelector("#filter").addEventListener("keyup", filterNotes);

// Listen for sort by title
document
  .querySelector("#sort-by-title")
  .addEventListener("click", sortNotesByTitle);

// Listen for sort by body
document
  .querySelector("#sort-by-body")
  .addEventListener("click", sortNotesByBody);

// Listen for turn off sort
document.querySelector("#sort-off").addEventListener("click", getNotes);

// Get notes
function getNotes() {
  document.querySelector("#sort-by-body").innerHTML = "Sort A-Z by body: Off";
  document.querySelector("#sort-by-title").innerHTML = "Sort A-Z by title: Off";
  document.querySelector("#sort-by-body").classList =
    "btn btn-secondary";
  document.querySelector("#sort-by-title").classList =
    "btn btn-secondary";
  http
    .get("http://localhost:3000/notes")
    .then(data => ui.showNotes(data))
    .catch(err => console.log(err));
}

// sort by property
function sortByProperty(property) {
  return function(x, y) {
    return x[property] === y[property] ? 0 : x[property] > y[property] ? 1 : -1;
  };
}

// Sort notes A-Z by title
function sortNotesByTitle() {
  document.querySelector("#sort-by-body").innerHTML = "Sort A-Z by body: Off";
  document.querySelector("#sort-by-title").innerHTML = "Sort A-Z by title: On";
  document.querySelector("#sort-by-body").classList =
    "btn btn-secondary";
  document.querySelector("#sort-by-title").classList =
    "btn btn-primary";
  http
    .get("http://localhost:3000/notes")
    .then(notes => notes.sort(sortByProperty("title")))
    .then(data => ui.showNotes(data))
    .catch(err => console.log(err));
}

// Sort notes A-Z by body
function sortNotesByBody() {
  document.querySelector("#sort-by-body").innerHTML = "Sort A-Z by body: On";
  document.querySelector("#sort-by-title").innerHTML = "Sort A-Z by title: Off";
  document.querySelector("#sort-by-body").classList =
    "btn btn-primary";
  document.querySelector("#sort-by-title").classList =
    "btn btn-secondary";
  http
    .get("http://localhost:3000/notes")
    .then(notes => notes.sort(sortByProperty("body")))
    .then(data => ui.showNotes(data))
    .catch(err => console.log(err));
}

// Submit note
function submitNote() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;
  const data = {
    title,
    body
  };

  // Validate input
  if (title === "" || body === "") {
    ui.showAlert("Please fill all fields", "alert alert-danger");
  } else {
    // Check for id
    if (id === "") {
      // Create note
      http
        .post("http://localhost:3000/notes", data)
        .then(() => {
          ui.showAlert("note added", "alert alert-success");
          ui.clearFields();
          getNotes();
        })
        .catch(err => console.log(err));
    } else {
      // Update note
      http
        .put(`http://localhost:3000/notes/${id}`, data)
        .then(() => {
          ui.showAlert("note updated", "alert alert-success");
          ui.changeFormState("add");
          getNotes();
        })
        .catch(err => console.log(err));
    }
  }
}

// Delete note
function deleteNote(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("Are you sure?")) {
      http
        .delete(`http://localhost:3000/notes/${id}`)
        .then(() => {
          ui.showAlert("note removed", "alert alert-success");
          getNotes();
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}

// Enable update state
function enableUpdate(e) {
  document.querySelector("#title").focus();
  if (e.target.parentElement.classList.contains("update")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body
    };

    // Fill form with current note
    ui.fillForm(data);
  }
  e.preventDefault();
}

// Cancel update state
function cancelUpdate(e) {
  if (e.target.classList.contains("note-cancel")) {
    ui.changeFormState("add");
  }
  e.preventDefault();
}

// Filter notes
function filterNotes(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".card-title").forEach(function(note) {
    const item = note.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      note.parentElement.parentElement.style.display = "block";
    } else {
      note.parentElement.parentElement.style.display = "none";
    }
  });
}