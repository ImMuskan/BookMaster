let d = [];
fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(data => {
        d = data;
        createTable();
    })
    .catch(error => {
        console.error(error);
    });
function createTable() {
    const mainele = document.getElementById("tab");
    mainele.classList.add("mainele")
    const books = document.createElement("div")
    books.classList.add("books")
    const table = document.createElement("table");
    table.classList.add("books-table");
    const tr = document.createElement("tr");
    const td1 = document.createElement("th");
    td1.textContent = "Id";
    const td2 = document.createElement("th");
    td2.textContent = "Title";
    const td3 = document.createElement("th");
    td3.textContent = "Author";
    const td4 = document.createElement("th");
    td4.textContent = "Genre";
    const td5 = document.createElement("th");
    td5.textContent = "Publication year";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    table.appendChild(tr);
    d.map(b => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = `${b.id}`;
        const td2 = document.createElement("td");
        td2.textContent = `${b.title}`;
        const td3 = document.createElement("td");
        td3.textContent = `${b.author}`;
        const td4 = document.createElement("td");
        td4.textContent = `${b.genre}`;
        const td5 = document.createElement("td");
        td5.textContent = `${b.publication_year}`;
        const td6 = document.createElement("td");
        const td7 = document.createElement("td");
        td6.textContent = "Edit";
        td6.id = "td6"
        td7.textContent = "Delete";
        td7.id = "td7"
        const i1 = document.createElement("i");
        i1.classList.add("fas");
        i1.classList.add("fa-edit");
        td6.appendChild(i1);
        const i2 = document.createElement("i");
        i2.classList.add("fas");
        i2.classList.add("fa-trash");
        td7.appendChild(i2);

        td7.addEventListener("click", function () {
            deleteBook(b.id);
        });
        td6.addEventListener("click", function () {
            showupdateBookForm(b);
        });
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        table.appendChild(tr);
    })
    books.appendChild(table);
    mainele.appendChild(books);
}
function showAddBookForm() {
    document.getElementById("addBookForm").style.display = "block";
}

function hideAddBookForm() {
    document.getElementById("addBookForm").style.display = "none";
    document.getElementById("updateBookForm").style.display = "none";
}

function showupdateBookForm(book) {
    document.getElementById("updateBookForm").style.display = "block";
    const h2 = document.getElementById("h2");
    const title = document.getElementById("booktitle");
    const author = document.getElementById("bookauthor");
    const genre = document.getElementById("bookgenre");
    const publication_year = document.getElementById("bookyear");
    title.value = book.title;
    author.value = book.author;
    genre.value = book.genre;
    publication_year.value = book.publication_year;
    h2.innerHTML = `Update Book ${book.id}`;
    const btn2 = document.getElementById("btn2");
    btn2.addEventListener("click", function () {
        updateBook(book.id);
    })
}

function addBook() {
    let f=0;
    let dt=[];
    const data = {
        id: document.getElementById("bookId").value,
        title: document.getElementById("bookTitle").value,
        author: document.getElementById("bookAuthor").value,
        genre: document.getElementById("bookGenre").value,
        publication_year: document.getElementById("bookYear").value
    }
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(data => {
           dt=data;
        })
        .catch(error => {
            console.error(error);
        });
    console.log(JSON.stringify(data));
    d.map((dta)=>{
        console.log(dta);
        if (data.id==dta.id) {
            alert("Book with id already exists");
            f=1;
        }
    })
    if(!f){
    fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                hideAddBookForm();
            } else {
                console.error('Failed to add the book:');
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
}

function deleteBook(id) {
    fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            location.reload();
        })
        .catch(error => {
            console.error(error);
        });
}

function updateBook(id) {
    const data = {
        title: document.getElementById("booktitle").value,
        author: document.getElementById("bookauthor").value,
        genre: document.getElementById("bookgenre").value,
        publication_year: document.getElementById("bookyear").value
    }
    fetch(`http://localhost:3000/books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                hideAddBookForm();
                location.reload();
            } else {
                console.error('Failed to update the book:', response.statusText);
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function searchBook() {
    const id = document.getElementById("searchId").value;
    fetch(`http://localhost:3000/books/${id}`)
        .then(response => {
            if (response.status === 404) {
                return response.text();
            }
            return response.json();
        })
        .then(data => {
            if (typeof data === 'string') {
                alert(data);
            } else {
                console.log(typeof (data));
                const sb = document.getElementById("sbook");
                const s = document.getElementById("sear");
                s.innerHTML = "";
                const sth1 = document.createElement("p");
                sth1.innerHTML = `Book ID: ${data.id}`;
                const sth2 = document.createElement("p");
                sth2.innerHTML = `Title: ${data.title}`;
                const sth3 = document.createElement("p");
                sth3.innerHTML = `Author: ${data.author}`;
                const sth4 = document.createElement("p");
                sth4.innerHTML = `Genre: ${data.genre}`;
                const sth5 = document.createElement("p");
                sth5.innerHTML = `Publication Year: ${data.publication_year}`;
                s.appendChild(sth1);
                s.appendChild(sth2);
                s.appendChild(sth3);
                s.appendChild(sth4);
                s.appendChild(sth5);
                sb.style.display = "block";
                console.log(data);
            }
        })
        .catch(error => {
            console.log(error);
        });
}
function display() {
    const id = document.getElementById("searchId");
    id.textContent = "";
    const sbook = document.getElementById("sbook");
    sbook.style.display = "none";
}



