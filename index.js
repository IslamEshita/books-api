// Require dotenv
require("dotenv").config();
// Require express
const express = require("express");
// Require cors
const cors = require("cors");
// Require mongoose
const mongoose = require("mongoose");

// Create an express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect the database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected to mongo: ", process.env.MONGO_URI);
  })
  .catch((err) => {
    console.log(mongoose.version);
    console.log(err);
  });

// books route
app.use("/books", require("./controllers/books"));

// Home route
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Wildcard route
app.get("*", (req, res) => {
  res.send("Error Page");
});

// Start listening on the server port
app.listen(process.env.PORT, (req, res) => {
  console.log("Server listening on port: " + process.env.PORT);
});
