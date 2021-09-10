console.log("This is index.js");
showBooks();
// Constructor
function Book(Name,author,type){
    this.name = Name;
    this.author = author;
    this.type = type;
}

// Display Constructor
function Display(){

}

// Add methods to display prototype + save books in localstorage
Display.prototype.add = function(book){
    let tableBody = document.getElementById("tableBody")
    let uiString = `<tr>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
    </tr> `;
    tableBody.innerHTML = uiString;
    location.reload();
}

// Show books from localstorage
function showBooks(){
let books = localStorage.getItem("books");
if(books==null)
{
    booksObj = [];
}
else{
    booksObj = JSON.parse(books);
}
let html = "";
booksObj.forEach(function(element,index){
    html += `<tr>
    <td>${element.name}</td>
    <td>${element.author}</td>
    <td>${element.type}</td>
    <td><input type="button" id="${index}" value="Delete Book" onclick="deleteBook(this.id)"></td>
    </tr> `
});
let booksElm = document.getElementById("tableBody");
if(booksObj.length != 0){
    booksElm.innerHTML = html;
}
else{
    booksElm.innerHTML = `Nothing to show here.Add some books :)`;
}
}

// Delete Book from localstorage 
function deleteBook(index){
    let books = localStorage.getItem("books");
    if(books==null){
        booksObj = [];
    }
    else{
        booksObj = JSON.parse(books);
    }
    booksObj.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(booksObj));
    location.reload();
}

// Implement the clear function
Display.prototype.clear = function(){
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

// Implement the validation function
Display.prototype.validate = function(book){
    if (book.name.length < 4 || book.author.length < 4){
        return false;
    }
    else{
        return true;
    }
}

// Implenet show function
Display.prototype.show = function(type,displaymessage){
    let message = document.getElementById('message');
    message.innerHTML +=`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Message: </strong> ${displaymessage}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  setTimeout(function(){
      message.innerHTML =``;
  },2000)
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit',libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let hacking = document.getElementById('hacking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (hacking.checked) {
        type = hacking.value;
    }

    let book = new Book(name, author, type);

    // Add book to the localstorage
    books = localStorage.getItem("books");
    if(books == null){
     booksObj = [];
    }
    else{
        booksObj = JSON.parse(books);
    }
    booksObj.push(book);
    localStorage.setItem("books",JSON.stringify(booksObj));

    console.log(booksObj);
    

    let display = new Display();

    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('Success','Your book has been successfully added');
    }
    else{
        // Show error
        display.show('Danger','Sorry you cannot add this book.');
    }
    e.preventDefault();
}