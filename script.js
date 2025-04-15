// Library array to store books
let myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Function to add book to library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Function to display books
function displayBooks() {
  const libraryContainer = document.getElementById('library-container');
  libraryContainer.innerHTML = '';
  
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
      <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
      <button onclick="removeBook(${index})">Remove</button>
    `;
    
    libraryContainer.appendChild(bookCard);
  });
}

// Function to toggle read status
function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}

// Function to remove book
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

// Form handling
document.getElementById('add-book-btn').addEventListener('click', () => {
  document.getElementById('book-form').classList.remove('hidden');
});

document.getElementById('cancel-btn').addEventListener('click', () => {
  document.getElementById('book-form').classList.add('hidden');
  document.getElementById('form').reset();
});

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  
  addBookToLibrary(title, author, pages, read);
  
  document.getElementById('book-form').classList.add('hidden');
  document.getElementById('form').reset();
});

// Sample books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);