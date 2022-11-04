// Creates Book class
class Book {
    constructor(author, title, language, subject) {
      this.author = author;
      this.title = title;
      this.language = language;
      this.subject = subject;
      this.isFavorite = false;
      this.comments = []
    }
 
    // render: creates the style and dimenstions of each book to later be added to the bookshelf
    render() {
      // randomColor: creates a random color so that each book is a unique color everytime the page is loaded
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      const book = document.createElement("div");
      book.className = "book";
      book.style.backgroundColor = `#${randomColor}`;
  
      const bookExit = document.createElement("button")
      bookExit.className = "bookExit"
      bookExit.textContent = "X"
      bookExit.style.alignSelf = "flex-end"
      bookExit.style.display = "none"
      bookExit.style.position = "relative"
    



      const bookInfo = document.createElement("div");
      bookInfo.className = "bookInfo";
  
      const bookTitle = document.createElement("h1");
      bookTitle.className = "bookTitle";
  // shortTitle uses slice to keep the titles short so that they don;t take up too much room on the bookshelf when small 
 // can possible use splice to keep it to full words...
  let shortTitle = `${this.title.slice(0,40)}...`
      // console.log("Short Title:  ", shortTitle)
      // bookTitle.textContent = `${this.title}`;
      bookTitle.textContent = shortTitle
  
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

     
     
     
// COMMENTS

      const seeComments = document.createElement("button")
      seeComments.textContent = "Comments"
      seeComments.style.display = "none"

      const bookComments = document.createElement("div")
      bookComments.className = "bookComments"
      bookComments.style.display = "none"
      bookComments.style.border = "2px solid blue"
      bookComments.style.backgroundColor = "white"
      bookComments.style.height = "200px"
    //   bookComments.style.width = "500px"
      bookComments.style.overflow = "auto"
      bookComments.style.zIndex = "99"
      bookComments.style.color = "red"

      const commentHead = document.createElement("div")
      commentHead.className = "commentHead"
      commentHead.style.display = "flex"
      commentHead.style.flexDirection = "column"
      commentHead.style.color = "green"
      commentHead.style.border = "2px solid green"
      commentHead.style.overflow = "auto"
      commentHead.style.width = "100%"

      
    
      

      
// COMMENT OF COMMENTS
      for(const comment of this.comments){
        const newComment = document.createElement("p")
        newComment.textContent = comment
        newComment.style.borderBottom = "2px dashed black"
        // newComment.style.width = "90%"
        newComment.style.padding = "10%"
        commentHead.append(newComment)
      }
  
      const addComments = document.createElement("div")
      addComments.style.display = "flex"

    //   creates textarea input for comment as sex character limit at 280
      const commentInput = document.createElement("textarea")
      commentInput.placeholder = "write your comments here..."
      commentInput.maxLength = "280"
      commentInput.className = "commentInput"

      const commentButton = document.createElement("button")
      commentButton.className = "commentButton"
      commentButton.textContent = "Add Comment"
      commentButton.style.display = "none"
      
      const commentExit = document.createElement("button")
      commentExit.textContent = "Exit"
      commentExit.style.display = "none"

      addComments.append(commentInput,commentButton)
      bookComments.replaceChildren(commentExit, commentHead, addComments)

// When Comments button(appearing on enlarged book) is clicked
      seeComments.addEventListener("click",()=>{
        bookComments.style.display = "flex"
        bookComments.style.flexDirection = "column"
        bookComments.style.justifyContent = "flex-end"
        commentButton.style.display = "inline"
        commentExit.style.display = "inline"
        commentExit.style.alignSelf = "flex-end"
      

        commentExit.addEventListener('click',()=>{
        bookComments.style.display = "none"
        commentButton.style.display = "none"
        commentExit.style.display = "none"
        
        })
      })

// COMMENT BUTTON
      commentButton.addEventListener("click",()=> {
        let commentValue = commentInput.value
        // tempCommetn is created as temporoary comment to display on page for user to see bfore they exit
        // it used same styling as the comment that are rendered through when boookshelf is reloaded/resorted
        const tempComment = document.createElement("p")
        tempComment.textContent = commentValue
        tempComment.style.borderBottom = "2px dashed black"
        tempComment.style.padding = "10%"
        this.addComment(commentValue)
        commentHead.append(tempComment)

        commentInput.value = ""
        this.render()
        // location.reload()
      })


// COMMENTS ^^^^


      // faveSwitch: creates a button and an event listener so that when the button is clicked
      // it turns red and the isFavorite constructor of the Book class changes to true
      const faveSwitch = document.createElement("button");
      faveSwitch.className = "faveSwitch";
      faveSwitch.type = "checkbox";
  
      // this if statement keeps the books favorite button red after the booksheld is re-rendered
      if (this.isFavorite === true) {
        faveSwitch.className = "toggledFaveSwitch"
      } else{
        faveSwitch.className = "faveSwitch"
      }
  
      faveSwitch.addEventListener("click", () => {
       if(this.isFavorite === false){
        this.isFavorite = true;
    // changing classname here lets users see color change before the favorite book are updated/rendered
        faveSwitch.className = "toggledFaveSwitch"
       } else {
        this.isFavorite = false;
        faveSwitch.className = "faveSwitch"
       }
      });
  
  // book.addEventListener: when the book element is clicked, the book and bookTitle elements 
  // are enlarged, and bookSubjects and bookDisplay becoem visible w/display = "inline"
      book.addEventListener("click", ()=> {
        // e.stopPropagation()
        book.classList.add = "bookInspect";
      // classNames used to handle changes via CSSW
        book.className = "bookBig";
        bookInfo.className = "bigBookInfo"
        bookExit.style.display = "inline"
     
      // one liner changes are kept in this file instead of javascript
      bookTitle.textContent = this.title;
        bookTitle.style.fontSize = "30px";
        bookAuthor.style.display = "inline";
        bookSubjects.style.display = "inline";
        faveSwitch.style.width = "50%"
        seeComments.style.display = "inline"

      // second/inner evenlistener: when the enlarged book is then double clicked, the styling from the last
      // eventlistener is returned to normal
        bookExit.addEventListener("click",(e)=>{
          // allows exit button to be clicked and work even though its a child of the book element which is has the above event listener
          e.stopPropagation()
          book.className = "book";
          bookInfo.className = "bookInfo"
          bookExit.style.display = "none"
          bookTitle.style.fontSize = "1px";
          bookTitle.textContent = shortTitle;
          bookAuthor.style.display = "none";
          bookSubjects.style.display = "none";
          seeComments.style.display = "none"
        });
      });


  // all the elements of book(and their children) are appended to the book element
  // which is returned so that it can be used when the render method is called
      book.append(bookExit, bookInfo,seeComments, bookComments, faveSwitch);
      return book;
    }

// COMMENT
    addComment(comment){
      this.comments.push(comment)
  }


  }