// Creates a new instance of a Bookshelf called bookshelf1. Created with 6 shelves, which currently works best
const bookshelf1 = new Bookshelf(6);
// Adds the bookData array from book-data.js and
// applies it the the bookArray constructor
bookshelf1.stockShelves(bookData);

// Creates a book instance from the Book class, then uses
// the addBook method from the Bookshelf class to add the book to
// its bookArray
const AmericanPsycho = new Book(
  ["Ellis, Bret Easton"],
  "American Psycho",
  "e~",
  ["psychological"]
);
bookshelf1.addBook(AmericanPsycho);

// Creates other books with arguments that help test sort and comments functions
const zBook = new Book(["ZZ, Z"], "Z", "e~", ["1 subject"]);
bookshelf1.addBook(zBook);

const aBook = new Book(["a"], "a", "e~", ["1 subject"]);
bookshelf1.addBook(aBook);
aBook.addComment("1comment");
aBook.addComment("2comment");
aBook.addComment("3comment");

// calls new sinstance of Bokshelf, bookshelf1's render method to create the instance of the Bookshelf on the page
// bookshelf1.arrangeByAuthor()
bookshelf1.render();
