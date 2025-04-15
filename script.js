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
  
  if (myLibrary.length === 0) {
    libraryContainer.innerHTML = `
      <div class="empty-state">
        <img src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" alt="Empty library">
        <h3>Your library is empty</h3>
        <p>Add some books to get started!</p>
      </div>
    `;
    return;
  }
  
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.style.animationDelay = `${index * 0.1}s`;
    
    bookCard.innerHTML = `
      <div class="book-content">
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: <span class="book-status ${book.read ? 'read' : 'unread'}">
          ${book.read ? 'Read' : 'Not Read'}
        </span></p>
      </div>
      <div class="book-actions">
        <button class="toggle-read-btn" onclick="toggleReadStatus(${index})">
          <i class="fas fa-book${book.read ? '' : '-open'}"></i> ${book.read ? 'Mark Unread' : 'Mark Read'}
        </button>
        <button class="remove-btn" onclick="removeBook(${index})">
          <i class="fas fa-trash"></i> Remove
        </button>
      </div>
    `;
    
    libraryContainer.appendChild(bookCard);
  });
}

// Function to toggle read status
function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
  showNotification(`Book marked as ${myLibrary[index].read ? 'read' : 'unread'}`, 'success');
}

// Function to remove book
function removeBook(index) {
  const removedBook = myLibrary.splice(index, 1)[0];
  displayBooks();
  showNotification(`"${removedBook.title}" removed from library`, 'success');
}

// Notification function
function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    ${message}
  `;
  notification.className = `notification ${type}`;
  
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 3000);
}

// Form handling
document.getElementById('add-book-btn').addEventListener('click', () => {
  document.getElementById('book-form').classList.add('active');
});

document.getElementById('cancel-btn').addEventListener('click', () => {
  document.getElementById('book-form').classList.remove('active');
  document.getElementById('form').reset();
});

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  
  addBookToLibrary(title, author, pages, read);
  showNotification(`"${title}" added to your library!`, 'success');
  
  document.getElementById('book-form').classList.remove('active');
  document.getElementById('form').reset();
});

// Sample books for demonstration
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary('Pride and Prejudice', 'Jane Austen', 279, false);