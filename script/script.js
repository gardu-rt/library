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
