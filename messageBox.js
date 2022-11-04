// MesssageBox: the main html element that holds everything in the upper
// section of of page(the message box)
const messageBox = document.querySelector("#message-Box");
messageBox.className = "messageBox";

const messageTitle = document.createElement("h1");
messageTitle.textContent = "Welcome to your library...";

const messageContent = document.createElement("h2");
messageContent.textContent = "Click on a book to reader more, read/add comments, and add a book to your favorites.";
const messageContent2 = document.createElement("h3");
messageContent2.textContent =
  "Click the white button a book to add it to your favorites!";

// actionSection: the bottom area of the message box that holds elements
// and information users need to manipulate the bookshelf
const actionsSection = document.createElement("section");
actionsSection.className = "actionSection";
actionsSection.style.display = "flex";

// sortSection: left side of actionSection that lets users sort the bookshelf in various ways
const sortSection = document.createElement("section");
sortSection.className = "sortSection";
sortSection.textContent = "Sort your bookshelf in different ways...";

// sorter: sortSection drop down list
const sorter = document.querySelector("#sorter");

//dorectionSection: holds the direction toggle elements for the order
// in which the bookshelf will sort given the element chosen from sorter
const directionSection = document.createElement("section");
directionSection.className = "directionSection";
const leftDireciton = document.createElement("p");
leftDireciton.textContent = "A-Z, Low-High";
// sortDirection: the toggle sort switch
const sortDirection = document.querySelector(".sortSwitchBox");
const sortSwitch = document.querySelector("input[type='checkbox']");
// const sortSwitch = document.querySelector("checkBox");
sortSwitch.className = "sortSwitch";

const rightDireciton = document.createElement("p");
rightDireciton.textContent = "Z-A, High-Low";

// sortButton: the button that implented the sort given the selected inputs
const sortButton = document.querySelector("#sortButton");

// Logic for when the sort button is click and new bookself is rendered to page
sortButton.addEventListener("click", () => {
  // sorter: gets the value the user selects from dropdown menu
  let sorter = document.getElementById("sorter").value;
  // below if fucntion checks is the sortDirection button is toggled right
  if (sortSwitch.checked) {
    if (sorter === "title") {
      bookshelf1.bookArray.sort((a, b) => b.title.localeCompare(a.title));
    }
    if (sorter === "author") {
      bookshelf1.bookArray.sort((a, b) => b.author[0].localeCompare(a.author));
    }
    if (sorter === "subjects") {
      bookshelf1.bookArray.sort((a, b) => b.subject.length - a.subject.length);
    }
  } else {
    // below if fucntion checks is the sortDirection button is toggled left
    if (sorter === "title") {
      bookshelf1.bookArray.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sorter === "author") {
      bookshelf1.bookArray.sort((a, b) => a.author[0].localeCompare(b.author));
    }
    if (sorter === "subjects") {
      bookshelf1.bookArray.sort((a, b) => a.subject.length - b.subject.length);
    }
  }
  // renders the bookshelf to the page after logic is run that determines how it wil be rendered
  bookshelf1.render();
});

// faveSection: hold informatio nthat keeps track of and displays
// the books the user selects as favorites
const favesSection = document.createElement("section");
favesSection.className = "favesSection";

const likedLabel = document.querySelector("#likedLabel");
const likedCount = document.querySelector("#likedCount");
likedCount.textContent = 0;

// favesButton/favesButton eventlistener: when button is pressed, logic runs
// to render only selected favorites to booskshelf
const favesButton = document.querySelector("#favesButton");
favesButton.addEventListener("click", function () {
  bookshelf1.faveArray = bookshelf1.bookArray.filter((book) => book.isFavorite);
  bookshelf1.renderFaves();
  // when button is clicked, reduce is used to count number of favorited books
  likedCount.textContent = bookshelf1.faveArray.reduce((acc, book) => {
    if (book) {
      acc++;
    } else {
      acc = 0;
    }
    return acc;
  }, 0);
});

// ADD Book
const addBook = document.querySelector("#addBook");
addBook.style.display = "flex";
addBook.style.flexDirection = "column";

const authorInput = document.querySelector("#authorInput");
const titleInput = document.querySelector("#titleInput");
const languageInput = document.querySelector("#languageInput");
const subjectsInput = document.querySelector("#subjectsInput");
const addButton = document.querySelector("#addButton");

// addBook.append(authorInput,tit, titleInput,languageInput, subjectsInput, addButton)

addButton.addEventListener("click", function () {
  // add .split(";") to spuject to allow multiple authors to be added
  let authorValue = authorInput.value.split(";");
  let titleValue = titleInput.value;
  let languageValue = languageInput.value;
  // add .split(",") to spuject to allow multiple subjects to be added
  let subjectsValue = subjectsInput.value.split(",");
  // if(subjectsInput.value = null){
  //   subjectsValue = 0
  // }

  const newBook = new Book(
    authorValue,
    titleValue,
    languageValue,
    subjectsValue
  );
  bookshelf1.addBook(newBook);

  bookshelf1.render();
  authorInput.value = " ";
  titleInput.value = " ";
  languageInput.value = " ";
  subjectsInput.value = " ";
});

const searchSection = document.createElement("section");
searchSection.className = "searchSection";
searchSection.style.display = "flex";
searchSection.style.flexDirection = "column";
searchSection.textContent = "Search Your Bookshelf";

const searchType = document.createElement("select");
const searchAll = document.createElement("option");
searchAll.value = "all";
searchAll.textContent = "Search All";
const searchAuthor = document.createElement("option");
searchAuthor.value = "author";
searchAuthor.textContent = "Search Author";
const searchTitle = document.createElement("option");
searchTitle.value = "title";
searchTitle.textContent = "Search Title";
const searchSubject = document.createElement("option");
searchSubject.value = "subject";
searchSubject.textContent = "Search Subject";

searchType.append(searchAll, searchAuthor, searchTitle, searchSubject);

const searchInput = document.createElement("input");
searchInput.className = "searchInput";
let searchValue = searchInput.value;

const searchButton = document.createElement("button");
searchButton.className = "searchButton";
searchButton.style.height = "20px";

searchButton.addEventListener("click", () => {
  let searchValue = searchInput.value;
  let typeValue = searchType.value;
  if (typeValue === "author") {
    bookshelf1.searchArray = bookshelf1.bookArray.filter((book) =>
      book.author.find((string) =>
        string.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }
  if (typeValue === "title") {
    bookshelf1.searchArray = bookshelf1.bookArray.filter((book) =>
      book.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  if (typeValue === "subject") {
    bookshelf1.searchArray = bookshelf1.bookArray.filter((book) =>
      book.subject.find((string) =>
        string.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }
  if (typeValue === "all") {
    bookshelf1.searchArray = bookshelf1.bookArray.filter(
      (book) =>
        book.author.find((string) =>
          string.toLowerCase().includes(searchValue.toLowerCase())
        ) ||
        book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.subject.find((string) =>
          string.toLowerCase().includes(searchValue.toLowerCase())
        )
    );
  }
  bookshelf1.renderSearch();
});

// SEARCH SUBJECT
// searchButton.addEventListener('click',()=>{
//   let searchValue = searchInput.value
//   // console.log("SEARCH VALUEE", searchValue)
// bookshelf1.searchArray = bookshelf1.bookArray.filter((book) =>
// book.subject.find((string) =>
//   string.toLowerCase().includes(searchValue.toLowerCase())
// )
// )
// bookshelf1.renderSearch()
// })

// SEARCH AUTHOR
// searchButton.addEventListener('click',()=>{
//   let searchValue = searchInput.value
//   console.log("YYYYOOOOOO", typeof bookshelf1.title)
//   // console.log("SEARCH VALUEE", searchValue)
// bookshelf1.searchArray = bookshelf1.bookArray.filter((book) =>
// book.author.find((string) =>
//   string.toLowerCase().includes(searchValue.toLowerCase())

// )
// )
// bookshelf1.renderSearch()

// })

// SEARCH TITLE
// searchButton.addEventListener('click',()=>{
//   let searchValue = searchInput.value
//   console.log("YYYYOOOOOO", typeof bookshelf1.title)
//   // console.log("SEARCH VALUEE", searchValue)
// bookshelf1.searchArray = bookshelf1.bookArray.filter((book) =>
// book.title.toLowerCase().includes(searchValue.toLowerCase())

// )

// bookshelf1.renderSearch()

// })

searchSection.append(searchType, searchInput, searchButton);

// each child sectiogn is appended to its parent element
directionSection.append(leftDireciton, sortDirection, rightDireciton);
sortSection.append(sorter, directionSection, sortButton);
likedLabel.append(likedCount);
favesSection.append(likedLabel, favesButton);
actionsSection.append(sortSection, favesSection, addBook, searchSection);
messageBox.append(
  messageTitle,
  messageContent,
  messageContent2,
  actionsSection
);


const book = document.querySelector(".book")