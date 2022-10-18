

/*
document.getElementById('newBook').addEventListener('click', ()=> {
    document.querySelector('.bg-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', ()=> {
    document.querySelector('.bg-modal').style.display = 'none';
});
*/

// Main Div section of books
const books = document.querySelector('.books'); 
const addBook = document.querySelector('.add-book');
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('.close');

window.addEventListener('click', (e) => {
    if (e.target == modal){
        modal.style.display = 'none';
    }
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

addBook.addEventListener('click', () => {
    modal.style.display = 'block';
    document.querySelector('.form-title').textContent = "Add Book";
    document.querySelector('.formButton').textContent = "Add";
});

function createEditIcon(book) {
    
    const editIcon = document.createElement('img');
    editIcon.src = '../img/pencil.svg';
    editIcon.setAttribute('class', 'edit-icon')
    editIcon.addEventListener('click', (e) => {
         console.log(book);
    });
    return editIcon
}

/*
function createIcons() {
    const div = createBookElement('div', '', 'icons');
    const icon1 = document.createElement('img');
    icon1.src = '../img/icon1.svg';

    const icon2 = document.createElement('img');
    icon1.src = '../img/icon2.svg';

    const icon3 = document.createElement('img');
    icon1.src = '../img/icon3.svg';

    div.appendChild(icon1);
    div.appendChild(icon2);
    div.appendChild(icon3);
    
    return div;
}

*/

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Math.floor(Math.random * 10000000000)
}

function addToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title,author,pages,read));
    saveAndRenderBooks();
}

const addBookForm = document.querySelector('.addBookForm');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    let newB = {};
    for(let [name,value] of data) {
        if(name === 'book-read'){
            newB['book-read'] = true;
        }else {
            newB[name] = value || "";
        }
    }

    if(!newB['book-read']){
        newB['book-read'] = false
    }
    addToLibrary(
        newB['title'],
        newB['author'],
        newB['pages'],
        newB['read']
        );
    addBookForm.reset();
    modal.style.display = 'none';
});

//array of books input
let myLibrary = [];

function addLocalStorage() {
    // localStorage => save things in key value pairs - key = library : myLibraary
    myLibrary = JSON.parse(localStorage.getItem('library')) || [];
    saveAndRenderBooks();
};

// function to create html elements with content and classes
function createBookElement(el, content, className) {
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute('class', className);
    return element;
}

// function to create an input with event listener
function createReadElement(bookItem,book) {
    const read = document.createElement('div');
    read.setAttribute('class', 'book-read');
    read.appendChild(createBookElement("h1", "Read?", "book-read-title"));
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.addEventListener('click', (e) => {
        if(e.target.checked){
            bookItem.setAttribute('class', 'card book read-checked');
            book.read = true;
            saveAndRenderBooks();

        }else {
            bookItem.setAttribute('class', 'card book read-unchecked');
            book.read = false;
            saveAndRenderBooks();
            

        }
        
    });
    if(book.read = true) {
        input.checked = true;
        bookItem.setAttribute('class', 'read-checked');

    }
    read.appendChild(input);
    return read;
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    saveAndRenderBooks();
};

// function to create book content  on the card
function createBookItem(book, index) {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('id', index);
    bookItem.setAttribute('key', index);
    bookItem.setAttribute('class', 'card book');
    
    bookItem.appendChild(createBookElement('h1', `Title:` + `${book.title}`, "book-title"));
    
    bookItem.appendChild(createBookElement('h1', `Author:` + `${book.author}`, "book-author"));

    bookItem.appendChild(createBookElement('h1', `Pages:` + `${book.pages}`, "book-pages"));

    bookItem.appendChild(createReadElement(bookItem,book)); 
    bookItem.appendChild(createBookElement('button', 'X', 'delete'));

    
    bookItem.appendChild(createEditIcon(book));
    // bookItem.appendChild(createIcons());

    bookItem.querySelector('.delete').addEventListener('click', () => {
        deleteBook(index);
    });

    books.insertAdjacentElement('afterbegin', bookItem);

}


// function add books to library array
function addBookToLibrary() {
    books.textContent = "";
  myLibrary.map((book,index) => {
    createBookItem(book,index);
  });
}

function saveAndRenderBooks () {
    localStorage.setItem('library', JSON.stringify(myLibrary));
    addBookToLibrary();
}

addLocalStorage();



