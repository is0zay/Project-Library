

/*
document.getElementById('newBook').addEventListener('click', ()=> {
    document.querySelector('.bg-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', ()=> {
    document.querySelector('.bg-modal').style.display = 'none';
});
*/

const books = document.querySelector('.books'); 
const myLibrary = [
    {
        title: 'Book1',
        author: 'Me',
        pages: '824',
        read: true,

    },
    {
        title:"Book2",
        author:"me",
        pages:"500",
        read: false,
    }
];



function createBookElement(el, content, className) {
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute('class', className);
    return element;
}

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

        }else {
            bookItem.setAttribute('class', 'card book read-unchecked');
            book.read = false;
            

        }
        
    });
    if(book.read = true) {
        input.checked = true;
        bookItem.setAttribute('class', 'read-checked');

    }
    read.appendChild(input);
    return read;
}

function createBookItem(book, index) {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('id', index);
    bookItem.setAttribute('key', index);
    bookItem.setAttribute('class', 'card book');
    
    bookItem.appendChild(createBookElement('h1', `Title:` + `${book.title}`, "book-title"));
    
    bookItem.appendChild(createBookElement('h1', `Author:` + `${book.author}`, "book-author"));

    bookItem.appendChild(createBookElement('h1', `Pages:` + `${book.pages}`, "book-pages"));

    bookItem.appendChild(createReadElement(bookItem,book)); 

    books.insertAdjacentElement('afterbegin', bookItem);

}

function addBookToLibrary() {
  myLibrary.map((book,index) => {
    createBookItem(book,index);
  });
}

addBookToLibrary();



