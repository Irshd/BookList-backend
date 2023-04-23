const Book = require("../models/BookModel");
const mongoose = require("mongoose");

/// get all book lists

const getAllBookList = async (req, res) => {
  // const user_id = req.user.id;
  const books = await Book.find({}).sort({ createdAt: -1 });
  res.status(200).json(books);
};
// get single book

const getBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such book" });
  }
  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).json({ error: "no such book" });
  }
  res.status(200).json(book);
};

const createBook = async (req, res) => {
  const { title, isbn, author, description, publisher } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!author) {
    emptyFields.push("author");
  }
  if (!isbn) {
    emptyFields.push("isbn");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!publisher) {
    emptyFields.push("publisher");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "please fill in all the fields", emptyFields });
  }
  try {
    const user_id = req.user_id;
    const book = await Book.create({
      title,
      isbn,
      author,
      description,
      publisher,
      user_id,
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such book" });
  }
  const book = await Book.findOneAndDelete({ _id: id });
  if (!book) {
    return res.status(400).json({ error: "no such book" });
  }
  res.status(200).json(book);
};
const updateBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such book" });
  }
  const book = await Book.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!book) {
    return res.status(400).json({ error: "no such book" });
  }
  res.status(200).json(book);
};
module.exports = {
  getAllBookList,
  getBook,
  createBook,
  deleteBook,
  updateBook,
};
