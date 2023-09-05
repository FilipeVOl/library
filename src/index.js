import './style.css';

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
  const libraryEl = document.querySelector("#library");
  libraryEl.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const bookEl = document.createElement("div");
    bookEl.classList.add("book-item");
    bookEl.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h3 class="title">${book.title}</h3>
          <h5 class="author">${book.author}</h5>
        </div>
        <div class="card-body">
          <p>${book.pages} pages</p>
          <p class="read-status">${book.read ? "Read" : "Not read yet"}</p>
          <button class="remove-btn" data-index="${i}">Remove Book</button>
          <button class="read-btn" data-index="${i}">Read</button>
        </div>
      </div>`;
    libraryEl.appendChild(bookEl);
  }
}

const titleInput = document.querySelector('#title');
const titleError = document.querySelector('#title + span.error');
const authorError = document.querySelector('#author + span.error');
const pagesError = document.querySelector('#pages + span.error');
const forms = document.getElementById('new-book-form');
const submitButton = document.querySelector("#submit-button");
const authorInput = document.querySelector("#author")
const pagesInput = document.querySelector("#pages")

function addBookToLibrary() {
  const readInput = document.getElementById("read").checked;
  const book = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput);
  myLibrary.push(book);
  render();
}

function showErrorTitle() {
  if (titleInput.validity.valueMissing) {
    titleError.textContent = 'You need to enter a title';
    titleError.classList.add('active');
  } else {
    titleError.textContent = '';
    titleError.classList.remove('active');
  }
}

function showErrorAuthor() {
  if (authorInput.validity.valueMissing) {
    authorError.textContent = 'You need to enter an author';
    authorError.classList.add('active');
} else {
  authorError.textContent = '';
  authorError.classList.remove('active');
  }
}

function showErrorPages() {
  if (pagesInput.validity.valueMissing) {
    pagesError.textContent = 'You need to enter an amount of pages';
    pagesError.classList.add('active');
} else {
  pagesError.textContent = '';
  pagesError.classList.remove('active');
  }
}

titleInput.addEventListener('input', () => {
  showErrorTitle();
});
authorInput.addEventListener('input', () => {
  showErrorAuthor()
})
pagesInput.addEventListener('input', () => {
  showErrorPages()
})


const NewBookBtn = document.querySelector("#newbook");
NewBookBtn.addEventListener("click", () => {
  forms.style.display = "block";
  NewBookBtn.style.display = "none";
  showErrorTitle()
  showErrorAuthor()
  showErrorPages(); // Exibe imediatamente os erros de validação
});

submitButton.addEventListener("click", (event) => {
  if ((titleInput.value !== '') || (authorInput.value !== '') || (pagesInput.value !== '')) {
    addBookToLibrary()
  } event.preventDefault()
});

const libraryEl = document.querySelector("#library");
libraryEl.addEventListener("click", (event) => {
  const target = event.target;

  function removeBook(index) {
    myLibrary.splice(index, 1);
    render();
    const removeHidden = document.querySelector("#new-book-form");
    if (myLibrary.length < 2) {
      removeHidden.style.display = "none";
      NewBookBtn.style.display = "block";
    }
  }
  
  function toggleRead(index) {
    myLibrary[index].toggleRead();
  }

  // Verifique se o botão Remove Book foi clicado
  if (target.classList.contains("remove-btn")) {
    const index = target.dataset.index;
    removeBook(index);
  }

  // Verifique se o botão Read foi clicado
  if (target.classList.contains("read-btn")) {
    const index = target.dataset.index;
    toggleRead(index);
  }
});


