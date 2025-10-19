const myLibrary = [];

// function Book(title, author, year, read) {
//     if (!new.target) {
//         throw Error("You must use the 'new' operator to call the constructor");
//     }
//     this.title = title;
//     this.author = author;
//     this.year = year;
//     this.read = read;
//     this.id = crypto.randomUUID();
//     this.changeStatus = function() {
//         if (this.read == "read") {
//             this.read = "unread"
//         }
//         else {
//             this.read = "read";
//         }
//     }
// }

// rewrite using Class

class Book {
    constructor(title, author, year, read) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.read = read;
        this.id = crypto.randomUUID();
        this.changeStatus = function() {
            if (this.read == "read") {
                this.read = "unread"
            }
            else {
                this.read = "read";
            }
        }
    }
}


function addBookToLibrary(title, author, year, read) {
    let newBook = new Book(title, author, year, read);
    myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "1937", "unread");
addBookToLibrary("The Book and the Sword", "Jin Yong", "1955", "read");

const container = document.querySelector("#container");

function displayBooks() {
    let counter = 0;
    for (let book of myLibrary) {
        let div = document.createElement("div");
        container.appendChild(div);
        div.innerHTML = `<h2>${book.title}</h2>
                        <p>Author: ${book.author}</p>
                        <p>Year Published: ${book.year}</p>`
        div.classList.add("card");
        div.id = `${book.id}`;
        let x = div.id;
        newButton = document.createElement('button');
        newButton.textContent = 'Remove Book';
        newButton.addEventListener('click', () => {
          let removeElement = document.getElementById(x);
          removeElement.remove();
          let indexRemove = myLibrary.findIndex(item => item.id == x);
          myLibrary.splice(indexRemove, 1);
        });
        div.append(newButton);
        readButton = document.createElement('button');
        readButton.textContent = `${book.read}`;
        readButton.id = "btn" + counter;
        readButton.addEventListener('click', () => {
            let indexLook = myLibrary.findIndex(item => item.id == x);
            myLibrary[indexLook].changeStatus();
            let readBtnId = "btn" + indexLook;
            let locateButton = document.getElementById(readBtnId);
            locateButton.textContent = `${book.read}`;
            console.log(myLibrary[indexLook].read);
        });
        div.append(readButton);
        counter++;
    };
};

displayBooks();

function clearDisplay() {
    container.innerHTML = "";
};

const btnForm = document.querySelector(".newbook");
const displayForm = document.querySelector("#myForm");

btnForm.addEventListener("click", () => {
    if (displayForm.style.display !== "block") {
        displayForm.style.display = "block";
    }
    else {
        displayForm.style.display = "none";
    }
});

const addBookForm = document.querySelector("#addBookForm");

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userTitle = document.querySelector("#userTitle").value;
    const userAuthor = document.querySelector("#userAuthor").value;
    const userYear = document.querySelector("#userYear").value;
    const userStatus = document.querySelector("#userStatus").value;
    addBookToLibrary(userTitle, userAuthor, userYear, userStatus);
    clearDisplay()
    displayBooks()
    addBookForm.reset();
});



