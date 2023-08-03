
class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }

    toggleRead() {
      this.read = !this.read;
      render();
    }
  }

  const myLibrary = [];

  function render() {
    let libraryEl = document.querySelector("#library");
    libraryEl.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
      let bookr = myLibrary[i];
      let bookEl = document.createElement("div");
      bookEl.classList.add("book-item");
      bookEl.innerHTML = `
        <div class="card">
          <div class="card-header">
            <h3 class="title">${bookr.title}</h3>
            <h5 class="author">${bookr.author}</h5>
          </div>
          <div class="card-body">
            <p>${bookr.pages} pages</p>
            <p class="read-status">${bookr.read ? "Read" : "Not read yet"}</p>
            <button class="remove-btn" onclick="removeBook(${i})">Remove Book</button>
            <button class="read-btn" onclick="toggleRead(${i})">Read</button>
          </div>
        </div>`;
      libraryEl.appendChild(bookEl);
    }
  }

  let NewBookBtn = document.querySelector("#newbook");
  NewBookBtn.addEventListener("click", () => {
    let newBookForm = document.querySelector("#new-book-form");
    newBookForm.style.display = "block";
    NewBookBtn.style.display = "none";
  });

  function removeBook(index) {
    myLibrary.splice(index, 1);
    render();
    let removeHidden = document.querySelector("#new-book-form");
    if (myLibrary.length < 2) {
      removeHidden.style.display = "none";
      NewBookBtn.style.display = "block";
    }
  }

  function toggleRead(index) {
    myLibrary[index].toggleRead();
  }

  function AddBookLibrary() {
    const titleInput = document.querySelector("#title").value;
    const authorInput = document.querySelector("#author").value;
    const pagesInput = document.querySelector("#pages").value;
    const readInput = document.getElementById("read").checked;
    const book = new Book(titleInput, authorInput, pagesInput, readInput);
    myLibrary.push(book);
    render();
  }

  document.querySelector("#submit-button").addEventListener("click", (event) => {
    event.preventDefault();
    AddBookLibrary();
  });