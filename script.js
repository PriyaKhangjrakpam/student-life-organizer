
// ==========================================
// STUDYSPACE - STUDENT LIFE ORGANIZER
// ==========================================


// ==========================================
// NAVIGATION
// ==========================================

const links = document.querySelectorAll(".sidebar a");
const pages = document.querySelectorAll(".page");

links.forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const pageName = this.dataset.page;

        console.log("Selected page:", pageName);

        // Hide all pages
        pages.forEach(page => {
            page.classList.remove("active");
        });

        // Remove active style from all links
        links.forEach(item => {
            item.classList.remove("active");
        });

        // Show selected page
        const selectedPage = document.getElementById(pageName);

        if (selectedPage) {
            selectedPage.classList.add("active");
            this.classList.add("active");
        }

    });

});


// ==========================================
// TIMETABLE MANAGER
// ==========================================

const classForm = document.getElementById("classForm");
const classList = document.getElementById("classList");

let classes = JSON.parse(localStorage.getItem("classes")) || [];

function displayClasses() {

    classList.replaceChildren();

    if (classes.length === 0) {

        const message = document.createElement("p");
        message.textContent = "No classes added yet.";

        classList.appendChild(message);

        return;
    }

    classes.forEach((item, index) => {

        const div = document.createElement("div");
        div.className = "class-item";

        const details = document.createElement("div");

        const subject = document.createElement("h3");
        subject.textContent = item.subject;

        const info = document.createElement("p");

        info.textContent =
            item.day + " | " +
            item.start + " - " + item.end;

        details.append(subject, info);

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.dataset.index = index;

        div.append(details, deleteButton);

        classList.appendChild(div);

    });

}


// Add a new class

classForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const subject = document.getElementById("subject").value.trim();
    const day = document.getElementById("day").value;
    const start = document.getElementById("startTime").value;
    const end = document.getElementById("endTime").value;

    if (start >= end) {

        alert("End time must be after start time!");

        return;
    }

    classes.push({
        subject: subject,
        day: day,
        start: start,
        end: end
    });

    localStorage.setItem("classes", JSON.stringify(classes));

    displayClasses();

    classForm.reset();

});


// Delete a class

classList.addEventListener("click", function(event) {

    if (event.target.tagName === "BUTTON") {

        const index = Number(event.target.dataset.index);

        classes.splice(index, 1);

        localStorage.setItem("classes", JSON.stringify(classes));

        displayClasses();

    }

});

displayClasses();


// ==========================================
// ASSIGNMENT MANAGER
// ==========================================

const assignmentForm = document.getElementById("assignmentForm");
const assignmentList = document.getElementById("assignmentList");
const pendingCount = document.getElementById("pendingCount");

let assignments = JSON.parse(
    localStorage.getItem("assignments")
) || [];


// Display assignments

function displayAssignments() {

    // Count pending assignments

    const pending = assignments.filter(
        item => !item.completed
    ).length;

    pendingCount.textContent = pending + " Pending";


    // Count completed assignments

    const completed = assignments.filter(
        item => item.completed
    ).length;

    document.getElementById("completedCount").textContent =
        completed + " Completed";


    assignmentList.replaceChildren();


    if (assignments.length === 0) {

        const message = document.createElement("p");

        message.textContent = "No assignments added yet.";

        assignmentList.appendChild(message);

        return;
    }


    assignments.forEach((item, index) => {

        const div = document.createElement("div");

        div.className = "class-item";

        const details = document.createElement("div");


        const name = document.createElement("h3");

        name.textContent = item.name;

        if (item.completed) {
            name.textContent += " ✓";
        }


        const info = document.createElement("p");

        info.textContent = item.subject + " | Due: " + item.date;


        const status = document.createElement("p");

        status.textContent = item.completed
            ? "Completed"
            : "Pending";


        details.append(name, info, status);


        // Complete button

        const completeButton = document.createElement("button");

        completeButton.textContent = item.completed
            ? "Undo"
            : "Mark Completed";

        completeButton.dataset.index = index;
        completeButton.dataset.action = "complete";


        // Delete button

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.dataset.index = index;
        deleteButton.dataset.action = "delete";


        div.append(details, completeButton, deleteButton);

        assignmentList.appendChild(div);

    });

}


// Add a new assignment

assignmentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("assignmentName").value.trim();

    const subject = document.getElementById("assignmentSubject").value.trim();

    const date = document.getElementById("assignmentDate").value;


    assignments.push({

        name: name,
        subject: subject,
        date: date

    });


    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );


    displayAssignments();

    assignmentForm.reset();

});


// Complete or delete an assignment

assignmentList.addEventListener("click", function(event) {

    const button = event.target;

    if (button.tagName !== "BUTTON") return;

    const index = Number(button.dataset.index);


    if (button.dataset.action === "complete") {

        assignments[index].completed =
            !assignments[index].completed;

    }


    if (button.dataset.action === "delete") {

        assignments.splice(index, 1);

    }


    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );


    displayAssignments();

});


displayAssignments();


// ==========================================
// EXAM MANAGER
// ==========================================

const examForm = document.getElementById("examForm");
const examList = document.getElementById("examList");
const examCount = document.getElementById("examCount");

let exams = JSON.parse(
    localStorage.getItem("exams")
) || [];


// Display exams

function displayExams() {

    const today = new Date().toISOString().split("T")[0];

    const upcoming = exams.filter(
        exam => exam.date >= today
    ).length;

    examCount.textContent = upcoming + " Upcoming";


    examList.replaceChildren();


    if (exams.length === 0) {

        const message = document.createElement("p");

        message.textContent = "No exams added yet.";

        examList.appendChild(message);

        return;
    }


    exams.forEach((exam, index) => {

        const div = document.createElement("div");

        div.className = "class-item";


        const details = document.createElement("div");


        const subject = document.createElement("h3");

        subject.textContent = exam.subject;


        const date = document.createElement("p");

        date.textContent = "Exam Date: " + exam.date;


        details.append(subject, date);


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.dataset.index = index;


        div.append(details, deleteButton);

        examList.appendChild(div);

    });

}


// Add a new exam

examForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const subject = document.getElementById("examSubject").value.trim();

    const date = document.getElementById("examDate").value;


    exams.push({

        subject: subject,
        date: date

    });


    localStorage.setItem(
        "exams",
        JSON.stringify(exams)
    );


    displayExams();

    examForm.reset();

});


// Delete an exam

examList.addEventListener("click", function(event) {

    if (event.target.tagName !== "BUTTON") return;

    const index = Number(event.target.dataset.index);

    exams.splice(index, 1);


    localStorage.setItem(
        "exams",
        JSON.stringify(exams)
    );


    displayExams();

});


displayExams();


// ==========================================
// DASHBOARD DATE
// ==========================================

const todayDate = document.getElementById("todayDate");

const today = new Date();

todayDate.textContent = today.toLocaleDateString("en-US", {

    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"

});


// ==========================================
// NOTES MANAGER
// ==========================================

const noteForm = document.getElementById("noteForm");

const noteList = document.getElementById("noteList");

const editor = document.getElementById("noteContent");

const toolbar = document.querySelector(".editor-toolbar");


let notes = JSON.parse(
    localStorage.getItem("notes")
) || [];

let savedRange = null;

let editorBackground = "#ffffff";


// Remember selected text inside the editor

function saveSelection() {

    const selection = window.getSelection();

    if (
        selection &&
        selection.rangeCount > 0 &&
        editor.contains(selection.anchorNode)
    ) {

        savedRange = selection.getRangeAt(0).cloneRange();

    }

}


// Restore selected text after using a toolbar control

function restoreSelection() {

    if (savedRange) {

        const selection = window.getSelection();

        selection.removeAllRanges();

        selection.addRange(savedRange);

    }

    editor.focus();

}


document.addEventListener("selectionchange", saveSelection);


// Keep text selection when clicking formatting buttons

toolbar.addEventListener("mousedown", function(event) {

    if (event.target.closest("button")) {

        event.preventDefault();

        saveSelection();

    }

});


// Bold, italic, underline, lists and alignment

toolbar.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-command]");

    if (!button) return;

    restoreSelection();

    document.execCommand(
        button.dataset.command,
        false,
        null
    );

});


// Font family

document.getElementById("fontFamily").addEventListener("change", function() {

    restoreSelection();

    document.execCommand("fontName", false, this.value);

});


// Font size

document.getElementById("fontSize").addEventListener("change", function() {

    restoreSelection();

    document.execCommand("fontSize", false, this.value);

});


// Font color

document.getElementById("fontColor").addEventListener("input", function() {

    restoreSelection();

    document.execCommand("foreColor", false, this.value);

});


// Highlight color

document.getElementById("highlightColor").addEventListener("input", function() {

    restoreSelection();

    document.execCommand("hiliteColor", false, this.value);

});


// Editor background color

document.getElementById("backgroundColor").addEventListener("input", function() {

    editorBackground = this.value;

    editor.style.backgroundColor = this.value;

});


// Heading format

document.getElementById("headingFormat").addEventListener("change", function() {

    restoreSelection();

    document.execCommand("formatBlock", false, this.value);

});


// ==========================================
// DISPLAY SAVED NOTES
// ==========================================

function displayNotes() {

    noteList.replaceChildren();


    if (notes.length === 0) {

        const message = document.createElement("p");

        message.textContent = "No notes saved yet.";

        noteList.appendChild(message);

        return;

    }


    notes.forEach((note, index) => {

        const div = document.createElement("div");

        div.className = "class-item";


        const title = document.createElement("h3");

        title.textContent = note.title || "Untitled note";


        const subject = document.createElement("p");

        subject.textContent = "Subject: " + (note.subject || "");


        const content = document.createElement("div");

        // Display the rich-text HTML exactly as it was saved

        content.innerHTML = note.content || "";

        content.style.whiteSpace = "pre-wrap";

        content.style.backgroundColor =
            note.background || "#ffffff";

        content.style.padding = "15px";

        content.style.borderRadius = "8px";


        // Delete button

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.dataset.index = index;

        deleteButton.dataset.action = "delete";


        div.append(title, subject, content, deleteButton);

        noteList.appendChild(div);

    });

}


// ==========================================
// SAVE A NEW NOTE
// ==========================================

noteForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const title = document.getElementById("noteTitle").value.trim();

    const subject = document.getElementById("noteSubject").value.trim();

    const contentText = editor.textContent.trim();


    if (!title || !subject) {

        alert("Please enter a note title and subject.");

        return;

    }


    if (!contentText) {

        alert("Please write something in your note.");

        editor.focus();

        return;

    }


    const newNote = {

        title: title,

        subject: subject,

        content: editor.innerHTML,

        background: editorBackground

    };


    notes.push(newNote);


    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );


    displayNotes();

    noteForm.reset();


    editor.innerHTML = "";

    editorBackground = "#ffffff";

    editor.style.backgroundColor = "#ffffff";

    savedRange = null;

});


// ==========================================
// DELETE A SAVED NOTE
// ==========================================

noteList.addEventListener("click", function(event) {

    const button = event.target.closest('button[data-action="delete"]');

    if (!button) return;


    const index = Number(button.dataset.index);


    if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= notes.length
    ) {

        return;

    }


    notes.splice(index, 1);


    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );


    displayNotes();

});


// Show saved notes when the page loads

displayNotes();


// ==========================================
// END OF STUDYSPACE SCRIPT
// ==========================================
