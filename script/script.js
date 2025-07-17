// App
const myLibrary = [];

function Books(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Books.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Books(title, author, pages, read));
};

function removeBook(array, id) {
  let removeIndex = array.findIndex(book => book.id === id);
  if (removeIndex !== -1) {
    array.splice(removeIndex, 1);
  }
}

//DOM
const form = document.querySelector("form");
const buttons = document.querySelectorAll(".btn");
const modal = document.querySelector("dialog");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const radioBtn = document.querySelectorAll("[type=radio]");
const submitBtn = document.querySelector("#submitBtn");
const tbody = document.querySelector("tbody");

let read = false;

function displayList(array) {
  tbody.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const book = array[i];
    const row = tbody.insertRow();

    row.insertCell(0).textContent = book.title;
    row.insertCell(1).textContent = book.author;
    row.insertCell(2).textContent = book.pages;

    const cellRead = row.insertCell(3);

    const statusBtn = document.createElement("button");
    cellRead.appendChild(statusBtn);
    statusBtn.textContent = book.read ? "Read It" : "Not Read Yet";
    statusBtn.addEventListener("click", () => {
      book.toggleRead();
      statusBtn.textContent = book.read ? "Read It" : "Not Read Yet";
    });

    const cellBtn = row.insertCell(4);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    cellBtn.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", function () {
      removeBook(array, book.id);
      displayList(array);
    });

  }
}

radioBtn.forEach(el => {
  el.addEventListener("change", function () {
    read = el.value === "Read It";
  });
});

buttons.forEach(btn => {
  btn.addEventListener("click", event => {
    const target = event.target;
    if (target.classList.contains("showModal")) {
      modal.showModal();
      form.autofocus;
      form.reset();
    }
    else if (target.classList.contains("close")) {
      modal.close();
    }
    else if (target.type === "submit") {
      // event.preventDefault();
      addBookToLibrary(title.value, author.value, pages.value, read);
      displayList(myLibrary);
    }
  });
});