const router = require("express").Router();
const booksDB = require("../models/books");

// Route for seeding books
router.get("/seed", (req, res) => {
  booksDB
    .insertMany([
      {
        title: "The Shinobi Initiative",
        description:
          "The reality-bending adventures of a clandestine service agency in the year 2166",
        year: 2014,
        quantity: 10,
        imageURL: "https://imgur.com/LEqsHy5.jpeg",
      },
      {
        title: "Tess the Wonder Dog",
        description: "The tale of a dog who gets super powers",
        year: 2007,
        quantity: 3,
        imageURL: "https://imgur.com/cEJmGKV.jpg",
      },
      {
        title: "The Annals of Arathrae",
        description:
          "This anthology tells the intertwined narratives of six fairy tales.",
        year: 2016,
        quantity: 8,
        imageURL: "https://imgur.com/VGyUtrr.jpeg",
      },
      {
        title: "Wâˆ€RP",
        description:
          "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        year: 2010,
        quantity: 4,
        imageURL: "https://imgur.com/qYLKtPH.jpeg",
      },
    ])
    .then(
      res.status(200).json({
        message: "Seed successful",
      })
    )
    .catch(
      res.status(400).json({
        message: "Seed unsuccessful",
      })
    );
});

// Route for getting all books
router.get("/", async (req, res) => {
  try {
    // Get all the books
    let books = await booksDB.find();
    // Log the books
    console.log(books);
    // Return the books
    res.status(200).json(books);
  } catch (error) {
    // Log the error
    console.log(error);
    // Return the error message
    res.status(400).json({
      message: "Failed to get all books",
    });
  }
});

// Route for getting a single book
router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    // Get the book with the given id
    let book = await booksDB.findById(req.params.id);
    // Log the book
    console.log(book);
    // Return the books
    res.status(200).json(book);
  } catch (error) {
    // Log the error
    console.log(error);
    // Return the error message
    res.status(400).json({
      message: `Failed to get book with id: ${req.params.id}`,
    });
  }
});

// Route for updating a single book
router.put("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    // Get the book with the given id
    let book = await booksDB.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (book) {
      // Log the book
      console.log(book);
      // Return the book
      res.status(200).json(book);
    } else {
      // Return the error message
      res.status(400).json({
        message: `Failed to update book with id: ${req.params.id}`,
      });
    }
  } catch (error) {
    // Log the error
    console.log(error);
    // Return the error message
    res.status(400).json({
      message: `Failed to update book with id: ${req.params.id}`,
    });
  }
});

// Route for creating a new book
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    let newBook = await booksDB.create(req.body);
    // Return the book
    res.status(200).json(newBook);
  } catch (error) {
    // Log the error
    console.log(error);
    // Return the error message
    res.status(400).json({
      message: "Failed to create new book",
    });
  }
});

// Route for deleting a book
router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    // Get the book with the given id
    let book = await booksDB.findByIdAndDelete(req.params.id);
    if (book) {
      // Log the book
      console.log(book);
      // Return the book
      res.status(200).json({
        message: `Successfully deleted book with id: ${req.params.id}`,
        book: `${book}`,
      });
    } else {
      // Return the error message
      res.status(400).json({
        message: `Failed to delete book with id: ${req.params.id}`,
      });
    }
  } catch (error) {
    // Log the error
    console.log(error);
    // Return the error message
    res.status(400).json({
      message: `Failed to delete with id: ${req.params.id}`,
    });
  }
});

module.exports = router;
