// Creates Book class
class Book {
  constructor(author, title, language, subject) {
    this.author = author;
    this.title = title;
    this.language = language;
    this.subject = subject;
    this.isFavorite = false;
    this.comments = [];
  }

  // addComment methods adds comments to books comment array
  addComment(comment) {
    this.comments.push(comment);
  }

  // render: creates the style and dimenstions of each book to later be added to the bookshelf
  render() {
    // randomColor: creates a random color so that each book is a unique color everytime the page is loaded
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const book = document.createElement("div");
    book.className = "book";
    book.style.backgroundColor = `#${randomColor}`;

    const bookExit = document.createElement("button");
    bookExit.className = "bookExit";
    bookExit.textContent = "X";

    const bookInfo = document.createElement("div");
    bookInfo.className = "bookInfo";

    const bookTitle = document.createElement("h1");
    bookTitle.className = "bookTitle";
    // shortTitle uses slice to keep the titles short so that they don;t take up too much room on the bookshelf when small
    // can possible use splice to keep it to full words...
    let shortTitle = `${this.title.slice(0, 40)}...`;
    bookTitle.textContent = shortTitle;
    // bookAuthor and bookSubjects: have a display of none because they aren't
    // intended to be seen until a book is inspected
    const bookAuthor = document.createElement("h2");
    bookAuthor.textContent = `by ${this.author}`;
    bookAuthor.style.display = "none";

    const bookSubjects = document.createElement("p");
    bookSubjects.textContent = `Subjects: ${this.subject}`;
    bookSubjects.style.display = "none";
    // bookAuthor and bookSubjects go inside the bookTitle parent element
    bookInfo.append(bookTitle, bookAuthor, bookSubjects);

    // Comments section
    const seeComments = document.createElement("button");
    seeComments.textContent = "Comments";
    seeComments.style.display = "none";

    const bookComments = document.createElement("div");
    bookComments.className = "bookComments";

    const commentHead = document.createElement("div");
    commentHead.className = "commentHead";

    // Iterates through each comment in the boks comment array and appends it to the comment head.
    // one line of styling is used to seperate commentd
    for (const comment of this.comments) {
      const newComment = document.createElement("p");
      newComment.textContent = comment;
      newComment.style.borderBottom = "2px dashed black";
      commentHead.append(newComment);
    }

    // creates a container for comment field and button
    const addComments = document.createElement("div");
    addComments.style.display = "flex";

    //  creates textarea input for comment as sex character limit at 280
    const commentInput = document.createElement("textarea");
    commentInput.placeholder = "write your comments here...";
    commentInput.maxLength = "280";

    const commentButton = document.createElement("button");
    commentButton.className = "commentButton";
    commentButton.textContent = "Add Comment";
    commentButton.style.display = "none";

    // exit button created
    const commentExit = document.createElement("button");
    commentExit.textContent = "Exit";
    commentExit.style.display = "none";

    addComments.append(commentInput, commentButton);
    bookComments.replaceChildren(commentExit, commentHead, addComments);

    // When Comments button(appearing on enlarged book) is clicked, comment section elements no longer
    // have display of none, so they are visible
    seeComments.addEventListener("click", () => {
      bookComments.style.display = "flex";
      commentButton.style.display = "inline";
      commentExit.style.display = "inline";
      commentExit.style.alignSelf = "flex-end";

      // When exit button is clicked, comments elemnts have a display of none/are no longer visible again
      commentExit.addEventListener("click", () => {
        bookComments.style.display = "none";
        commentButton.style.display = "none";
        commentExit.style.display = "none";
      });
    });

    // Comment button takes what is entered into the the textarea and adds it to comments array of book
    commentButton.addEventListener("click", () => {
      let commentValue = commentInput.value;
      // tempCommetn is created as temporoary comment to display on page for user to see before they exit
      // it used same styling as the comments that are rendered when boookshelf is reloaded/resorted
      const tempComment = document.createElement("p");
      tempComment.textContent = commentValue;
      tempComment.style.borderBottom = "2px dashed black";
      // the value of commentInput is added to the book class's comments array
      this.addComment(commentValue);
      commentHead.append(tempComment);
      // comment field is set back to blank after comment is added
      commentInput.value = "";
      // this.render()
    });

    // faveSwitch: creates a button and an event listener so that when the button is clicked
    // it turns red and the isFavorite constructor of the Book class changes to true
    const faveSwitch = document.createElement("button");
    faveSwitch.className = "faveSwitch";
    faveSwitch.type = "checkbox";

    // this if statement keeps the books favorite button red after the booksheld is re-rendered
    if (this.isFavorite === true) {
      faveSwitch.className = "toggledFaveSwitch";
    } else {
      faveSwitch.className = "faveSwitch";
    }

    faveSwitch.addEventListener("click", () => {
      if (this.isFavorite === false) {
        this.isFavorite = true;
        // changing classname here lets users see color change before the favorite book are updated/rendered
        faveSwitch.className = "toggledFaveSwitch";
      } else {
        this.isFavorite = false;
        faveSwitch.className = "faveSwitch";
      }
    });

    // book.addEventListener: when the book element is clicked, the book and bookTitle elements
    // are enlarged, and bookSubjects and bookDisplay becoem visible w/display = "inline"
    book.addEventListener("click", () => {
      // e.stopPropagation()
      book.classList.add = "bookInspect";
      // classNames used to handle changes via CSSW
      book.className = "bookBig";
      bookInfo.className = "bigBookInfo";

      // one liner changes are kept in this file instead of css
      bookExit.style.display = "inline";
      bookTitle.textContent = this.title;
      bookTitle.style.fontSize = "30px";
      bookAuthor.style.display = "inline";
      bookSubjects.style.display = "inline";
      faveSwitch.style.width = "50%";
      seeComments.style.display = "inline";

      // second/inner evenlistener: when the enlarged book is then double clicked, the styling from the last
      // eventlistener is returned to normal
      bookExit.addEventListener("click", (e) => {
        // stopPropagation allows exit button to be clicked and work even though its a child of the book element which is has the above event listener
        e.stopPropagation();
        book.className = "book";
        bookInfo.className = "bookInfo";
        bookExit.style.display = "none";
        bookTitle.style.fontSize = "1px";
        bookTitle.textContent = shortTitle;
        bookAuthor.style.display = "none";
        bookSubjects.style.display = "none";
        seeComments.style.display = "none";
      });
    });

    // all the elements of book(and their children) are appended to the book element
    // which is returned so that it can be used when the render method is called
    book.append(bookExit, bookInfo, seeComments, bookComments, faveSwitch);
    return book;
  }
}
