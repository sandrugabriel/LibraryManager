//functie ce primeste ca parametru o carte si returneaza card
const cardbycarte = (carte) => {
  // console.log("Asd");
  const card = document.createElement("tr");
  card.innerHTML = `
				<td>
					<a id="carteupdate">${carte.title}</a>
				</td>
				<td>${carte.author}</td>
				<td>${carte.genre}</td>
				<td>${carte.year}</td>

	`;

    
  return card;
};

function createHomePage() {
    let container = document.querySelector(".container");
  
    container.innerHTML = `
      <h1>Books</h1>
      <p><button class="buttonAdd">Create New Book</button></p>
      <table>
          <thead>
              <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Year</th>
              </tr>
          </thead>
          <tbody>
          </tbody>
      </table>
      `;
  
    let cards = document.querySelector("tbody");
    for (i = 0; i < books.length; i++) {
      cards.appendChild(cardbycarte(books[i]));
    }
  
    
let btnAdd = document.querySelector(".buttonAdd");
btnAdd.addEventListener("click", (e) => {
  createAddPage();
});
    
cards.addEventListener("click", (e) => {

    let elem = e.target;
console.log("ASdasd");
    if(elem.id=="carteupdate"){
        createUpdatePage(elem.textContent);
    }

  
});


};

function createAddPage() {
  let container = document.querySelector(".container");

  container.innerHTML = `
      <h1>New Book</h1>
    <form>
        <p>
            <label for="title">Title</label>
            <input name="title" type="text" id="title">
        </p>
        <p>
            <label for="author">Author</label>
            <input name="author" type="text" id="author">
        </p>
        <p>
            <label for="genre">Genre</label>
            <input name="genre" type="text" id="genre">
        </p>
        <p>
            <label for="year">Year</label>
            <input name="year" type="text" id="year">
        </p>
        <p>
            <input type="submit" class="createnewbbok" value="Create New Book">
        </p>
        <p>
            <button class="buttonAddCancel">Cancel</button>
        </p>
    </form>
    `;

  let btnAddCancel = document.querySelector(".buttonAddCancel");
  btnAddCancel.addEventListener("click", (e) => {
    createHomePage();
  });

  let btnNewBook = document.querySelector(".createnewbbok");

  btnNewBook.addEventListener("click", (e) => {
    newbook();
  });
};

function newbook() {
  let titleb = document.querySelector("#title");
  let authorb = document.querySelector("#author");
  let genreb = document.querySelector("#genre");
  let yearb = document.querySelector("#year");
  console.log("ASd2");
  if (
    titleb.value == "" ||
    authorb.value == "" ||
    genreb.value == "" ||
    yearb.value == ""
  ) {
     console.log("Asdasadeww");
    errorAdd(titleb, authorb, genreb, yearb);
    return;
  } else {
    console.log("ASd");
    books.unshift({
      id: books[books.length-1].id++,
      title: titleb.value,
      author: authorb.value,
      genre: genreb.value,
      year: yearb.value,
    });
        createHomePage();
    
  }
};

const carderror = (text) => {
  const card = document.createElement("li");
  card.textContent = text;

  return card;
};

function errorAdd(title, author, genre, year) {
  let h2error = document.createElement("h2");
  h2error.textContent = "Ooooops!";
  h2error.classList = "error";

  let ulerror = document.createElement("ul");

  if (title.value == "") ulerror.appendChild(carderror("Title is required"));
  if (author.value == "") ulerror.appendChild(carderror("Author is required"));
  if (genre.value == "") ulerror.appendChild(carderror("Genre is required"));
  if (year.value == "") ulerror.appendChild(carderror("Year is required"));
};

const bookbyname=(name)=>{

for(i=0;i<books.length;i++){
    if(books[i].title == name) return books[i];
}

}

function createUpdatePage(nameBook){
    let container = document.querySelector(".container");
  
    let book = bookbyname(nameBook);

    container.innerHTML = `
       <h1>Update Book</h1>
    <form>
        <p>
            <label for="title">Title</label>
            <input name="title" type="text" id="title" value="${book.title}">
        </p>
        <p>
            <label for="author">Author</label>
            <input name="author" type="text" id="author" value="${book.author}">
        </p>
        <p>
            <label for="genre">Genre</label>
            <input name="genre" type="text" id="genre" value="${book.genre}">
        </p>
        <p>
            <label for="year">Year</label>
            <input name="year" type="text" id="year" value="${book.year}">
        </p>
        <p>
            <input type="submit" value="Update Book">
        </p>
    </form>
    <form method="post" onsubmit="return confirm('Do you really want to delete this book?');">
        <p>
            <a class="buttonUpdateCancel">Cancel</a>
        </p>
        <p><input type="submit" value="Delete Book"></p>
    </form>
      `;

      let btnCancel = document.querySelector(".buttonUpdateCancel");
      btnCancel.addEventListener("click",(e)=>{
        createHomePage();
      });

    let btndelete= document.querySelector("input[value='Delete Book']");
    btndelete.addEventListener("click",(e)=>{
        deletebook(book);
        createHomePage();
    });

    let btnupdate= document.querySelector("input[value='Update Book']");
    btnupdate.addEventListener("click",(e)=>{
        updatebook(book);
        createHomePage();
    });


}

function deletebook(mybook){

    let indexToDelete = books.findIndex(book => book.id == mybook.id);
    
    books.splice(indexToDelete, 1);

    
}

function updatebook(mybook){

    let indexToUpdate = books.findIndex(book => book.id == mybook.id);

    books[indexToUpdate] = { 
        title: mybook.title,
        author: mybook.author,
        genre: mybook.genre,
        year: mybook.year };



}
