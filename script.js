


document.getElementById('newBook').addEventListener('click', ()=> {
    document.querySelector('.bg-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', ()=> {
    document.querySelector('.bg-modal').style.display = 'none';
});

let myLibrary = [];

function Book(author, title, pages, read) {
    author = document.getElementById('author').value
    title = document.getElementById('title').value
    pages = document.getElementById('pages').value
    read = document.getElementById('read').value

}

function addBookToLibrary() {
   
}