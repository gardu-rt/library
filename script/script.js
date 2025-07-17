// App
const myLibrary = [];

function Books(title, author, pages, readStatus) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Books.prototype.changeReadStatus = function () {
  this.readStatus =
    this.readStatus === "Not read yet" ? "Read it" : "Not read yet";
};

function addBookToLibrary(title, author, pages, readStatus) {
  myLibrary.push(new Books(title, author, pages, readStatus));
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
const bookList = document.querySelector("ul");

let readStatus = "";

function displayList(array) {
  bookList.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const book = array[i];
    const list = document.createElement("li");
    list.textContent = `${book.title}, ${book.author}, ${book.pages}, ${book.readStatus}`;
    bookList.appendChild(list);
  }
}

radioBtn.forEach(el => {
  el.addEventListener("change", function () {
    readStatus = el.value;
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
      addBookToLibrary(title.value, author.value, pages.value, readStatus);
      displayList(myLibrary);
    }
  });
});